const moreDirective = () => {
    const link = ($scope, element, attr) => {
        $scope.flag = false;
        $scope.show = () => {
            $scope.flag = true
        };
        $scope.title = attr.title || 'More';
    };
    return {
        link,
        scope: {},
        transclude: true,
        template: `
            <a ng-if="!flag" class="text-link" href="javascript:void(0);" ng-click="show()">{{title}}</a>
            <ng-transclude ng-if="flag"></ng-transclude>
        `
    };
};
module.exports = {
    name: 'more',
    directive: [
        moreDirective
    ]
};