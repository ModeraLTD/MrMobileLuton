// Handle the background scroll blur
function handleBgBlur(scroll) {
	if (scroll <= blurScrollMax) {
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
}

// Handle scroll event
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

function updateQuotes(d) {
	quotesIndex += d;
	max = quotes.length - 1;

	if (quotesIndex > max) {
		quotesIndex = 0;
	} else if (quotesIndex < 0) {
		quotesIndex = max;
	}

	_updateQuotes(true);
}

function _updateQuotes(flash) {
	author = quotes[quotesIndex][0];
	quote = quotes[quotesIndex][1];

	if (flash) {
		$(".quotes").fadeOut(200);
		setTimeout(function() {
			$("#author").text(author);
			$("#quote").text(quote);
			$(".quotes").fadeIn(200);
		}, 200);
	} else {
		$("#author").text(author);
		$("#quote").text(quote);
	}
}

// When the page loads
$(document).ready(function() {
	$(".fadein").hide();
	$(".fadein").fadeIn(1500).show();

	$(window).scroll(function (event) {
		var scroll = $(window).scrollTop();
		handleScroll(scroll);
	});

	_updateQuotes(false);
});

cs_visible = false;
currentBlur = 0;
quotesIndex = 0;

quotes = [
	[
		"Junaid Rahmat",
		"Best shop in Luton most affordable prices in the bury park I got these two phones from them literally I loved it both works excellent thanks mate ."
	],
	[
		"Ravi Sakma",
		"Professional technician in Luton... best customer service ❤️"
	],
	[
		"Zubair Bond",
		"Better than all shops in luton.."
	],
	[
		"Terry Woods",
		"TOP CLASS.....Don't go anywhere else, this is the best."
	],
	[
		"Mirjan Noka",
		"Positive: Professionalism"
	]
];

const blurScrollMax = 400;
const blurPxMax = 8;
const changeThreshold = 1;
