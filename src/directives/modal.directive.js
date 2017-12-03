const modalDirective = ($rootScope, $, ErEvents) => {
  const link = (scope, element, attrs) => {
    const scrollTop = () => $('.modal-body').scrollTop(0);

    $(element).modal({
      show: false,
      keyboard: attrs.keyboard,
      backdrop: attrs.backdrop
    });

    scope.$watch(
      function() {
        return scope.visible;
      },
      function(value) {
        if (value === true) {
          $(element).modal('show');
        } else {
          $(element).modal('hide');
        }
      }
    );

    $(element).on('hide.bs.modal', () => {
      scrollTop();
    });

    $(element).on('shown.bs.modal', function() {
      scope.$apply(function() {
        scope.$parent[attrs.visible] = true;
        scope.onShown({});
      });
    });

    $(element).on('hidden.bs.modal', () => {
      scope.$apply(() => {
        scope.$parent[attrs.visible] = false;
        scope.onHide({});
      });
    });

    scope.$on(ErEvents.SCROLL_TO_TOP, () => {
      scrollTop();
    });

    const routerChangeLisnter = $rootScope.$on('$routeChangeStart', () => {
      $(element).modal('hide');
    });
    scope.$on('$destroy', () => {
      routerChangeLisnter();
    });
  };
  return {
    link,
    template: `
            <div class="modal fade bs-example-modal-lg" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-sm">
                    <div class="modal-content" ng-transclude>
                    </div>
                </div>
            </div>`,
    restrict: 'E',
    transclude: true,
    replace: true,
    scope: { visible: '=', onShown: '&', onHide: '&' }
  };
};

module.exports = {
  name: 'modal',
  directive: ['$rootScope', 'jQuery', 'ErEvents', modalDirective]
};
