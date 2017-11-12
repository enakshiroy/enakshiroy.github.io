const shootMenuDirective = ($log, $timeout, $window) => {
  const triggerClass = "shoot-menu-trigger";

  const setStyles = (element, styles) => {
    Object.assign(element.style, styles);
  };

  const getWidth = element => {
    const domRect = element.getBoundingClientRect();
    const styles = $window.getComputedStyle(element);
    let width = domRect.width;
    width += parseInt(styles.marginRight, 10) || 0;
    width += parseInt(styles.marginLeft, 10) || 0;
    return width;
  };

  const hasWrapped = targets =>
    targets.some((node, index) => {
      if (index === 0) {
        return false;
      }
      const { top: currTop } = node.getBoundingClientRect();
      const { top: prevTop } = targets[index - 1].getBoundingClientRect();
      return currTop !== prevTop;
    });

  const setDisplay = (targets, display) => {
    targets.forEach(target => {
      setStyles(target, { display });
    });
  };

  const shootTargets = (targets, trigger) => {
    trigger.style.display = "none";
    setDisplay(targets, "initial");
    if (hasWrapped(targets)) {
      return;
    }
    targets.forEach((node, index) => {
      const x = -getWidth(node) * index;
      setStyles(node, {
        transform: `translateX(${x}px)`
      });
    });
    $timeout(() => {
      targets.forEach((node, index) => {
        setStyles(node, {
          transition: "transform 0.2s ease",
          transform: "translateX(0)"
        });
      });
      // TODO: Play sound here.
    }, 10);
  };

  const link = ($scope, element, attrs) => {
    element = element[0];
    const options = Array.prototype.slice.call(element.children);
    const trigger = options.find(({ className }) =>
      className.includes(triggerClass)
    );
    if (!trigger) {
      $log.error(
        `ShootMenuDirective: No trigger found. Please make sure add "${triggerClass}" class.`
      );
      return;
    }
    const targets = options.filter(
      (option, index) => options.indexOf(trigger) < index
    );
    // Ugly hack for to preload images if shoot menu has any.
    setTimeout(() => {
      setDisplay(targets, "none");
    }, 10);
    trigger.addEventListener("click", event => {
      shootTargets(targets, trigger);
    });
  };

  return {
    link,
    restrict: "A"
  };
};

module.exports = {
  name: "shootMenu",
  directive: ["$log", "$timeout", "$window", shootMenuDirective]
};
