const scrollToDirective = ($, $log) => {

    // Defautl scroll duration.
    const DURATION = 1000;

    const link = (scope, element, attrs) => {
        let {
            scrollTo,
            duration
        } = attrs;
        duration = +duration || DURATION;
        element.on('click', (event) => {
            if (!scrollTo) {
                $log.error('ScrollTo: No target id is provided!!');
                return;
            }
            const target = $(`#${scrollTo}`);
            if (!target.length) {
                $log.error(`ScrollTo: No element found with id: ${scrollTo}`);
                return;
            }
            $('html, body').animate({
                scrollTop: target.offset().top
            }, {
                duration
            });
        });
    };
    return {
        link
    };
}
module.exports = {
    name: 'scrollTo',
    directive: ['jQuery', '$log', scrollToDirective]
};