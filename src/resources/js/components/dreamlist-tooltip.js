export default function() {
    /* Position tooltip at the end of the target */
    function positionTooltip() {
        let wrapper = $('.product-dreamlist__progress-wrapper');

        if (wrapper.length) {
            wrapper.each(function() {
                let $tooltip = $(this).find('.product-dreamlist__tooltip');
                let $target = $(this).find('.product-dreamlist__current');
                let $toolTipArrow = $(this).find('.product-dreamlist__tooltip-arrow');
                let parentWidth = $(this).outerWidth();
                let parentLeft = $(this).position().left;
                let toolTipWidth = $tooltip.outerWidth();
                let progressPosition = $target.position().left + $target.outerWidth();
                let toolTipArrowLeftPos = progressPosition;
                let toolTipArrowMinLeftPosition = parentLeft + 10;
                let toolTipArrowfMaxRightPosition = parentLeft + parentWidth - 30;
                let toolTipLeftPos = progressPosition - toolTipWidth/2;
                let toolTipLeftBound = toolTipLeftPos;
                let toolTipRightBound = toolTipLeftPos + toolTipWidth;
                let toolTipMinLeftPosition = parentLeft - 10;
                let toolTipMaxRightPosition = parentLeft + parentWidth - 10;

                if (toolTipArrowLeftPos < toolTipArrowMinLeftPosition) {
                    toolTipArrowLeftPos = toolTipArrowMinLeftPosition;
                }
                if (toolTipArrowLeftPos > toolTipArrowfMaxRightPosition) {
                    toolTipArrowLeftPos = toolTipArrowfMaxRightPosition;
                }
                $toolTipArrow.css('left', toolTipArrowLeftPos);

                if (toolTipLeftBound < toolTipMinLeftPosition) {
                    toolTipLeftPos = toolTipMinLeftPosition;
                }
                if (toolTipRightBound > toolTipMaxRightPosition) {
                    toolTipLeftPos = toolTipMaxRightPosition - toolTipWidth;
                }
                $tooltip.css('left', toolTipLeftPos);
            });
        }
    }
    positionTooltip();

    $(window).resize(function() {
        positionTooltip();
    });
}