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
	"samsung": [
		{
			"img": "http://localhost:5000/static/css/imgs/placeholder-product.png",
			"name": "Samsung product",
			"cost": "0.00"
		},
		{
			"img": "http://localhost:5000/static/css/imgs/placeholder-product.png",
			"name": "Example product",
			"cost": "0.00"
		},
		{
			"img": "http://localhost:5000/static/css/imgs/placeholder-product.png",
			"name": "Example product",
			"cost": "0.00"
		},
		{
			"img": "http://localhost:5000/static/css/imgs/placeholder-product.png",
			"name": "Example product",
			"cost": "0.00"
		},
		{
			"img": "http://localhost:5000/static/css/imgs/placeholder-product.png",
			"name": "Example product",
			"cost": "0.00"
		}
	],
	"apple": [
		{
			"img": "http://localhost:5000/static/css/imgs/placeholder-product.png",
			"name": "Apple product",
			"cost": "0.00"
		},
		{
			"img": "http://localhost:5000/static/css/imgs/placeholder-product.png",
			"name": "Example product",
			"cost": "0.00"
		},
		{
			"img": "http://localhost:5000/static/css/imgs/placeholder-product.png",
			"name": "Example product",
			"cost": "0.00"
		},
		{
			"img": "http://localhost:5000/static/css/imgs/placeholder-product.png",
			"name": "Example product",
			"cost": "0.00"
		},
		{
			"img": "http://localhost:5000/static/css/imgs/placeholder-product.png",
			"name": "Example product",
			"cost": "0.00"
		}
	]
}
