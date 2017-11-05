const modalBodyDirective = () => {
  return {
    template: `
      <div class="modal-body" ng-transclude></div>
      `,
    replace: true,
    restrict: "E",
    transclude: true
  };
};

module.exports = {
  name: "modalBody",
  directive: [modalBodyDirective]
};
