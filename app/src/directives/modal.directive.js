const modalDirective = $ => {
  const link = (scope, element, attrs) => {
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
          $(element).modal("show");
        } else {
          $(element).modal("hide");
        }
      }
    );

    $(element).on("shown.bs.modal", function() {
      scope.$apply(function() {
        scope.$parent[attrs.visible] = true;
        scope.onShown({});
      });
    });

    $(element).on("hidden.bs.modal", function() {
      scope.$apply(function() {
        scope.$parent[attrs.visible] = false;
        scope.onHide({});
      });
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
    restrict: "E",
    transclude: true,
    replace: true,
    scope: { visible: "=", onShown: "&", onHide: "&" }
  };
};

module.exports = {
  name: "modal",
  directive: ["jQuery", modalDirective]
};
