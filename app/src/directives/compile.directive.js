const compileDirective = $compile => {
  const link = ($scope, element, attrs) => {
    const ensureCompileRunsOnce = $scope.$watch(
      scope => scope.$eval(attrs.compile),
      value => {
        // when the 'compile' expression changes
        // assign it into the current DOM
        element.html(value);

        // compile the new DOM and link it to the current
        // scope.
        // NOTE: we only compile .childNodes so that
        // we don't get into infinite loop compiling ourselves
        $compile(element.contents())($scope);

        // Use un-watch feature to ensure compilation happens only once.
        ensureCompileRunsOnce();
      }
    );
  };
  return {
    link
  };
};

module.exports = {
  name: "compile",
  directive: ["$compile", compileDirective]
};
