export default function() {
    /* Position tooltip at the end of the target */
    function positionTooltip() {
        let $tooltip = $('.product-dreamlist__tooltip');

        if ($tooltip.length) {
            let $target = $('.product-dreamlist__current');
            let $toolTipArrow = $('.product-dreamlist__tooltip-arrow');
            let toolTipWidth = $tooltip.outerWidth();
            let parentWidth = $tooltip.parent().outerWidth();
            let parentLeft = $tooltip.parent().position().left;
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
        }
    }
    positionTooltip();

    $(window).resize(function() {
        positionTooltip();
    });
}