const modalHeaderDirective = () => {
  return {
    template: `
    <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
        </button>
        <h4 class="modal-title" ng-if="title">{{title}}</h4>
    </div>
    `,
    replace: true,
    restrict: "E",
    scope: {
      title: "@"
    }
  };
};

module.exports = {
  name: "modalHeader",
  directive: [modalHeaderDirective]
};
