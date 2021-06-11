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

	if (!repair_visible) {
		if (scroll >= 1200) {
			repair_visible = true;
			$("#repairDetails .dropin").removeClass("inactive");
			$("#repairDetails .fadeinrepair").removeClass("inactive");
		}
	}

	if (!reviews_visible && (scroll >= 1680)) {
		reviews_visible = true;
		$(".quote").removeClass("inactive");
		$(".slidein").removeClass("inactive");
	}

	handleBgBlur(Math.ceil(scroll / 10) * 10);
}

// Fast flashing green
function flashFast() {
	chars = [
		$("#fast-0"),
		$("#fast-1"),
		$("#fast-2"),
		$("#fast-3")
	];

	maxcharslen = chars.length - 1;

	function lightUp(chars, index) {
		if (index > maxcharslen) {
			index = 0;
			chars[chars.length - 1].removeClass("lightUp");
			setTimeout(lightUp, 500, chars, index);
			return;
		}

		for (i in chars) {
			if (i == index) {
				chars[i].addClass("lightUp");
			} else {
				chars[i].removeClass("lightUp");
			}
		}

		setTimeout(lightUp, 100, chars, index + 1);
	}

	lightUp(chars, 0);
}

// When the page loads
$(document).ready(function() {
	$(".fadein").hide();
	$(".fadein").fadeIn(1500).show();

	$(window).scroll(function (event) {
		var scroll = $(window).scrollTop();
		handleScroll(scroll);
	});

	flashFast();
	setupQuotes();
	updateQuotes(false);

});

function setupQuotes() {
	single = "<div></div>\n"
	$(".dotContainer").append(single.repeat(quotes.length));
}

function changeQuotes(n) {
	if (!switchingQuotes) {
		quotesIndex += n;
		max = quotes.length-1;

		if (quotesIndex > max) {
			quotesIndex = 0;
		} else if (quotesIndex < 0) {
			quotesIndex = max;
		}

		updateQuotes(true);
	}
}

function updateQuotes(flash) {
	author = quotes[quotesIndex][0];
	quote = quotes[quotesIndex][1];

	function setButton() {
		children = $(".dotContainer").children();
		for (i in children) {
			if (i == quotesIndex) {
				$(children[i]).addClass("active");
			} else {
				$(children[i]).removeClass("active");
			}
		}
	}

	function setText(author, quote) {
		$("#author").text(author);
		$("#quote").text(quote);
		setButton();
	}

	if (flash && !switchingQuotes) {
		switchingQuotes = true;
		$(".flashdiv").fadeOut(200);
		setTimeout(function() {
			setText(author, quote);
			$(".flashdiv").fadeIn(500);

			setTimeout(
				function() {switchingQuotes = false;},
				200
			);
		}, 200);
	} else if (!flash) {
		setText(author, quote);
	}
}

cs_visible = false;
repair_visible = false;
reviews_visible = false;

currentBlur = 0;
quotesIndex = 0;
switchingQuotes = false;

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
const blurPxMax = 12;
const changeThreshold = 1;
