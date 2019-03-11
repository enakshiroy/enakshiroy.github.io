const memeLinkDirective = ($window) => {
  const SMART_PHONE_WIDTH = 640;
  const createImgElement = (src, styles = {}) => {
    const img = document.createElement('img');
    img.src = src;
    Object.assign(img.style, styles);
    return img;
  };

  const link = ($scope, element, attrs) => {
    const img = createImgElement($scope.src, { opacity: 0 });
    const target = document.getElementById($scope.target);
    target.appendChild(img);

    const [defaultImg] = Array.prototype.slice
      .call(target.children)
      .filter(({ className }) => className.includes('ng-scope'));

    $scope.isVisible = false;

    $scope.show = ($event) => {
      if (defaultImg) {
        defaultImg.style.opacity = 0;
      }
      img.style.opacity = 1;
    };

    $scope.hide = ($event) => {
      img.style.opacity = 0;
      if (defaultImg) {
        defaultImg.style.opacity = 1;
      }
    };
  };
  return {
    link: link,
    restrict: 'E',
    transclude: true,
    scope: {
      target: '@',
      src: '@'
    },
    template: `
          <a
            href="javascript: void 0;"
            ng-mouseenter="show()"
            ng-mouseleave="hide()"
            >
            <ng-transclude></ng-transclude>
          </a>
          `
  };
};

module.exports = {
  name: 'memeLink',
  directive: ['$window', memeLinkDirective]
};
