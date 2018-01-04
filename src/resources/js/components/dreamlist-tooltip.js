export default function() {
    /* Position tooltip at the end of the target */
    function positionTooltip() {
        let $tooltip = $('.product-dreamlist__tooltip');
        let $target = $('.product-dreamlist__current');
        let $width = $tooltip.outerWidth();
        let $position = $target.position().left + $target.outerWidth();
        let $leftPos = $position - $width/2;

        if ($position >= 5) {
            $tooltip.css('left', $leftPos);
        }
    }
    positionTooltip();
}