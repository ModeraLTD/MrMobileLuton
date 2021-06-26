// On page load
$(document).ready(function() {
	params = new URLSearchParams(window.location.search);
	tab = params.get("tab");
	console.log(tab);
	if (tab == null) {
		// fill in apple as default
		addProducts(products["apple"]);
		renameTabname("APPLE");
	} else {
		addProducts(products[tab]);
		renameTabname(tab.toUpperCase());
	}

	spaceOutTab();

	$("#phones-apple").click(function() {
		removeProducts();
		fadeOutPage();
		setTimeout(function() {
			addProducts(products["apple"]);
			spaceOutTab();
			renameTabname("apple");
			setTimeout(fadeInPage, 400);
		}, 400);
	});

	$("#phones-samsung").click(function() {
		removeProducts();
		fadeOutPage();
		setTimeout(function() {
			renameTabname("samsung");
			spaceOutTab();
			addProducts(products["samsung"]);
			setTimeout(fadeInPage, 400);
		}, 200);
	});

	fadeInPage();
});

function removeProducts() {
	$(".products").empty();
}

function addProducts(productArray) {
	finalhtml = "";
	for (productIndex in productArray) {
		product = productArray[productIndex];

		// If img is none use default
		img = product["img"];
		name = product["name"];
		cost = product["cost"];

		$(".products").append(`<div class="product noselect">
	<img src="${img}"/>
	<h2 class="name">${name}</h2>
	<h2 class="cost">${cost}</h2>
</div>
`);
	}
}

function renameTabname(tabname) {
	target = $(".col.page .toptext.tab");
	target.text(tabname.toUpperCase());
	target.addClass("unspaced");
}

function spaceOutTab() {
	setTimeout(
		function() {$(".col.page .toptext").removeClass("unspaced");},
		500
	);
}

function fadeInPage() {
	$(".col.page").fadeIn(200);
}

function fadeOutPage() {
	$(".col.page").fadeOut(200);
}

// constants
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
