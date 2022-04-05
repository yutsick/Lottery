export default function () {
	function getVals(slider){
		// Get slider values
		let parent = $(slider);
		let slides = parent.find('input');
		let slide1 = parseFloat( slides[0].value );
		let slide2 = parseFloat( slides[1].value );
		// Neither slider will clip the other, so make sure we determine which is larger
		if( slide1 > slide2 ){ let tmp = slide2; slide2 = slide1; slide1 = tmp; }

		let displayElement = parent.find('.rangeValues');
		displayElement.find('.rangeValues_left').text(slide1 + ' kr');
		displayElement.find('.rangeValues_right').text(slide2 + ' kr');

		let rangeTrackValue = parent.find('.rangeTrack-value');
		let rangeMax = slides.attr('max');
		let valueWidth = (slide2 - slide1) * 100 / rangeMax;
		let valueOffset = slide1 * 100 / rangeMax;

		rangeTrackValue.css('width', valueWidth + '%');
		rangeTrackValue.css( 'left', valueOffset + '%');
	}
	getVals('.range-slider');

	$('.range-slider input').on('input', function() {
		getVals($(this).parent('.range-slider'));
	});

	//Link same range sliders in differen places on the page
	function linkSameRanges(link1, link2) {
		$(link1).find('input').on('input', function(evt) {
			link(link2, $(link1));
		});

		$(link2).find('input').on('input', function(evt) {
			link(link1, $(link2));
		});

		function link(linkWith, target) {
			let slide1 = parseFloat( target.find('input')[0].value );
			let slide2 = parseFloat( target.find('input')[1].value );
			let parent = $(linkWith);

			parent.find('input')[0].value = slide1;
			parent.find('input')[1].value = slide2;


			if( slide1 > slide2 ){ let tmp = slide2; slide2 = slide1; slide1 = tmp; }

			let displayElement = parent.find('.rangeValues');
			displayElement.find('.rangeValues_left').text(slide1 + ' kr');
			displayElement.find('.rangeValues_right').text(slide2 + ' kr');

			let rangeTrackValue = parent.find('.rangeTrack-value');
			let rangeMax = parent.find('input').attr('max');
			let valueWidth = (slide2 - slide1) * 100 / rangeMax;
			let valueOffset = slide1 * 100 / rangeMax;

			rangeTrackValue.css('width', valueWidth + '%');
			rangeTrackValue.css( 'left', valueOffset + '%');
		}
	}
	linkSameRanges('#rangeSlider', '#rangeSlider2');
}

