const moreDirective = ($timeout) => {

    /**
     * Returns the height of the supplied html.
     * @param {string} innerHTML 
     */
    function getHeight(innerHTML) {
        let para = document.createElement('p');
        para.innerHTML = innerHTML;
        para.className += 'info';
        document.body.appendChild(para);
        const height = para.offsetHeight;
        para.parentNode.removeChild(para);
        return `${height}px`;
    }

    function link($scope, element, attr) {

        const para = element[0].getElementsByTagName('p')[0];

        // returns next information to be displayed.
        const next = () => $scope.data.shift() || '';

        // If no title use 'more' as default.
        $scope.title = attr.title || 'More';

        $scope.append = () => {
            let text = next();
            if (!text) {
                return;
            }
            $scope.text += `<br>${text}`;
            para.style.height = getHeight($scope.text);
            $timeout(() => {
                if (!$scope.data.length) {
                    $scope.moreStyle = {
                        visibility: 'hidden'
                    };
                }
            }, 200);
        };
        $scope.text = next();
        para.style.height = getHeight($scope.text);
    }

    return {
        link,
        restrict: 'E',
        scope: {
            data: '='
        },
        template: `
        <p ng-bind-html="text | unsafe" class="info"></p>
        <a ng-style="moreStyle" class="text-link" href="javascript:void(0);" ng-click="append()">
        {{title}}
        </a>
        `
    };
};
module.exports = {
    name: 'more',
    directive: [
        '$timeout',
        moreDirective
    ]
};