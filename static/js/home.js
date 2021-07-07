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
			$(".inactiveLeft").removeClass("inactiveLeft");
			$(".inactiveRight").removeClass("inactiveRight");

			setTimeout(function() {
				$(".inactiveFade").removeClass("inactiveFade");
			}, 500);
		}
	}

	if (!repair_visible) {
		if (scroll >= 840) {
			repair_visible = true;
			$("#repairDetails .dropin").removeClass("inactive");
			$("#repairDetails .fadeinrepair").removeClass("inactive");
		}
	}

	if (!reviews_visible && (scroll >= 1380)) {
		reviews_visible = true;
		$(".quote").removeClass("inactive");
		$(".slidein").removeClass("inactive");
	}

	if (!products_visible && (scroll >= 1963)) {
		products_visible = true;
		$("#products .reveal .cover").removeClass("hidden");
		$(".reveal h1").fadeIn(1000);
		setTimeout(function() {
			$(".slideinLeft").removeClass("slideinLeft");
			$(".slideinRight").removeClass("slideinRight");
		}, 500);
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

function addProducts() {
	applehtml = "";
	samsunghtml = "";

	for (i in products["apple"]) {
		applehtml += `<div class="product apple">
			<img src="${products["apple"][i]["img"]}">
			<h2 class="name">${products["apple"][i]["name"]}</h2>
			<h3 class="cost">${products["apple"][i]["cost"]}</h3>
		</div>`;
	}

	for (i in products["samsung"]) {
		samsunghtml += `<div class="product samsung">
			<img src="${products["samsung"][i]["img"]}">
			<h2 class="name">${products["samsung"][i]["name"]}</h2>
			<h3 class="cost">${products["samsung"][i]["cost"]}</h3>
		</div>`;
	}

	$("#popup-apple .box .content .products").append(applehtml);
	$("#popup-samsung .box .content .products").append(samsunghtml);
}

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
	}

	if (flash && !switchingQuotes) {
		switchingQuotes = true;
		$(".flashdiv").fadeOut(200);
		setButton();
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
		setButton();
	}
}

function openPopup(popup) {
	$(`#popup-${popup}`).stop().fadeTo(200, 1);
}

function closePopup(popup) {
	$(`#popup-${popup}`).stop().fadeTo(100, 0);
	setTimeout(function() {
		$(`#popup-${popup}`).hide();
	}, 300);
}

// When the page loads
$(document).ready(function() {
	$(".fadein").hide();
	$(".fadein").fadeIn(1500).show();

	$(window).scroll(function (event) {
		var scroll = $(window).scrollTop();
		handleScroll(scroll);
	});

	setTimeout(function() {
		$(".buttonContainer").removeClass("inactive");
	}, 1500);

	flashFast();
	setupQuotes();
	updateQuotes(false);
	addProducts();

	$(".product.apple").click(function() {
		window.open("products.html?tab=apple");
	});

	$(".product.samsung").click(function() {
		window.open("products.html?tab=samsung");
	});

});

cs_visible = false;
repair_visible = false;
reviews_visible = false;
products_visible = false;

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

const products = {
	"apple": [
		{
			"img": "https://www.chorleyxchange.co.uk/wp-content/uploads/2020/08/s-l1600.png",
			"name": "iPhone 7 (128GB)",
			"cost": "145"
		},
		{
			"img": "https://support.apple.com/library/APPLE/APPLECARE_ALLGEOS/SP726/SP726-iphone6s-gray-select-2015.png",
			"name": "iPhone 6s (64GB)",
			"cost": "100"
		},
		{
			"img": "https://cdn.simplyfixit.co.uk/wp-content/uploads/deviceImages/devicepng/apple/phone/iphone-x.png",
			"name": "iPhone X (64GB)",
			"cost": "260"
		},
		{
			"img": "https://i.ebayimg.com/images/g/-NgAAOSwfVtd1HoC/s-l640.png",
			"name": "iPhone XS Max (64GB)",
			"cost": "350"
		},
		{
			"img": "https://lh3.googleusercontent.com/proxy/ZLtOfLA0yqzJ2l53EQG7-SeYINtrQAlliYdYhUF1dzMpOzbiKzLYu_3wiOZ5t3cn1FHLCdRoE5fguGXLz7igY7yz1MpEsAKPRgCDSB_kc1L020uLyPHEuDfgXl-PYykc7ZzEz4GyK1oQ9h-Sm60qicWvWz8UFpQz9OK-gfFPO7PNcSP8DxyD8No",
			"name": "iPhone 8",
			"cost": "?"
		},
		{
			"img": "https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/iphone11-black-select-2019_GEO_EMEA?wid=940&hei=1112&fmt=png-alpha&.v=1567021766023",
			"name": "iPhone 11",
			"cost": "?"
		},
		{
			"img": "https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/iphone-12-blue-select-2020?wid=940&hei=1112&fmt=png-alpha&.v=1604343704000",
			"name": "iPhone 12",
			"cost": "?"
		},
	],
	"samsung": [
		{
			"img": "https://image.samsung.com/africa_en/smartphones/galaxy-s9/shop/buyingtool/product/product_galaxys9_lilacpurple_01.png",
			"name": "Samsung S9",
			"cost": "170"
		},
		{
			"img": "https://www.chitterchatter.co.uk/pub/media/catalog/product/cache/1b4929b11a49fe9bc0938cef0890c9e3/s/m/sm-g975fzwdbtu_1_largeproductimage.png",
			"name": "Samsung S10",
			"cost": "270"
		},
		{
			"img": "https://www.buymobiles.net/files/images/handsets/samsung/samsung-galaxy-s20-fe-front-navy.png",
			"name": "Samsung S20",
			"cost": "410"
		},
	]
}

const blurScrollMax = 400;
const blurPxMax = 12;
const changeThreshold = 1;
