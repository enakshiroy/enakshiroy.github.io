const moreDirective = ($timeout) => {

    /**
     * Returns the height of the supplied html.
     * @param {string} innerHTML 
     */
    function getHeight(innerHTML, target = document.body) {
        let para = document.createElement('p');
        para.innerHTML = innerHTML;
        para.className += ' info';
        target.appendChild(para);
        const height = para.offsetHeight;
        para.parentNode.removeChild(para);
        return `${height}px`;
    }

    function link($scope, element, attr) {
        const para = element[0].getElementsByTagName('p')[0];
        let data = angular.copy($scope.data);

        // returns next information to be displayed.
        const next = () => data.shift() || '';

        const init = () => {
            angular.extend($scope, next());
            para.style.height = getHeight($scope.text, element[0]);
        };

        $scope.append = () => {
            if (data.length === 0) {
                data = angular.copy($scope.data);
                init();
                return;
            }
            let {
                text,
                more
            } = next();
            if (!text) {
                return;
            }
            $scope.text += `<br>${text}`;
            $scope.more = more;
            para.style.height = getHeight($scope.text, element[0]);
        };
        init();
    }

    return {
        link,
        restrict: 'E',
        scope: {
            data: '='
        },
        template: `
        <p ng-bind-html="text | unsafe" class="info"></p>
        <a ng-if="data.length > 1" class="text-link" href="javascript:void(0);" ng-click="append()">
        {{more || 'More'}}
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