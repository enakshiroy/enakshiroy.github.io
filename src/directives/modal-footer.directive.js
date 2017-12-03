const modalFooterDirective = () => {
  return {
    template: `
          <div class="modal-footer" ng-transclude></div>
          `,
    replace: true,
    restrict: "E",
    transclude: true
  };
};

module.exports = {
  name: "modalFooter",
  directive: [modalFooterDirective]
};
