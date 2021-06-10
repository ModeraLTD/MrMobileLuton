function handleBgBlur(scroll) {
	val = Math.ceil((scroll/blurScrollMax) * blurPxMax);
	if (Math.abs(val-currentBlur) > changeThreshold) {
		currentBlur = val;
		var filterVal = `blur(${currentBlur}px)`;
		$('#bgimg')
			.css('filter',filterVal)
			.css('webkitFilter',filterVal)
			.css('mozFilter',filterVal)
			.css('oFilter',filterVal)
			.css('msFilter',filterVal);
	}
}

function handleScroll(scroll) {
	if (!cs_visible) {
		if (scroll >= 300) {
			cs_visible = true;
			$(".contentSection").removeClass("inactive");

			console.log("Here");

			setTimeout(function() {
				stars = $(".rating").children();
				console.log(stars);
				function showStars(stars, index) {
					console.log(index);
					if (index < (stars.length)) {
						setTimeout(showStars, 200, stars, index + 1);
						$(stars[index]).fadeIn(500);
					}
				}

				showStars(stars, 0);

			}, 1000);
		}
	}

	handleBgBlur(Math.ceil(scroll / 10) * 10);
}

$(document).ready(function() {
	$(".fadein").hide();
	$(".fadein").fadeIn(1500).show();

	$(window).scroll(function (event) {
		var scroll = $(window).scrollTop();
		handleScroll(scroll);
	});
});

cs_visible = false;
currentBlur = 0;

const blurScrollMax = 400;
const blurPxMax = 8;
const changeThreshold = 1;
