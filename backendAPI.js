var axios = require("axios");
var cheerio = require("cheerio");
var express = require("express");
var cors = require("cors");

let url;
let bkprod,
	cprod,
	cprice,
	cpic,
	url1,
	url2,
	url3,
	url4,
	url5,
	encodename,
	brand;
let flipkart = 1,
	amazon = 1,
	croma = 1,
	reliance = 1,
	work = 1,
	service = 0;

let prodn1 = [],
	prodn2 = [],
	prodn3 = [],
	prodn4 = [],
	price1 = [],
	price2 = [],
	price3 = [],
	price4 = [];



async function start(url9) {
	url = url9;
	if (url.includes("amazon.in")) {
		console.log("Amazon Link found");
		amazon = 0;
		prodn2 = null;
		price2 = null;
		let response = await axios.get(url, {
			headers: {
				"User-Agent":
					"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.169 Safari/537.36",
			},
		});
		let $ = cheerio.load(response.data);
		cprod = $("#productTitle").text().trim();
		console.log(cprod);
		cprice = $(
			"#corePriceDisplay_desktop_feature_div > div.a-section.a-spacing-none.aok-align-center > span.a-price.aok-align-center.reinventPricePriceToPayMargin.priceToPay > span:nth-child(2) > span.a-price-whole"
		).text();
		cpic = $("#landingImage").attr("src");
		//console.log(cprice);
		cprice = cprice.replaceAll(",", "");
		//console.log(cprice);
		cprice = parseInt(cprice);
		console.log(cprice);
		console.log(cpic);
	} else if (url.includes("flipkart.com")) {
		console.log("Flipkart link found");
		//console.log(url);
		flipkart = 0;
		prodn1 = null;
		price1 = null;
		let response = await axios.get(url, {
			headers: {
				"User-Agent":
					"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.169 Safari/537.36",
			},
		});
		//console.log("here1");
		let $ = cheerio.load(response.data);

		$("span.B_NuCI").each((index, element) => {
			if (index == 0) {
				cprod = $(element).text();
			}
		});

		//console.log("ran here");
		$(".dyC4hf").each((index, element) => {
			//console.log($(element).text().split('₹')[1].replace(',', ''));
			cprice = parseInt($(element).text().split("₹")[1].replaceAll(",", ""));
		});

		$("img").each((index, element) => {
			//console.log($(element).attr("src"));
			if (index == 2) {
				cpic = $(element).attr("src");
			}
		});

		
		console.log(cprod);
		//cprice = cprice.replaceAll(/[₹,]/g, "");
		//cprice = parseInt(cprice);
		console.log(cprice);
		console.log(cpic);
	} else if (url.includes("croma.com")) {
		console.log("Croma link found");
		croma = 0;
		prodn3 = null;
		price3 = null;
		p_id = url.substring(url.lastIndexOf("/") + 1);

		let response1 = await axios.get(
			`https://api.croma.com/pricing-services/v1/price?productList=${p_id}`,
			{
				headers: {
					"User-Agent":
						"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.88 Safari/537.36",
					Channel: "EC",
				},
			}
		);

		cprice = parseInt(response1.data.pricelist[0].sellingPriceValue);

		let response2 = await axios.get(url, {
			headers: {
				"User-Agent":
					"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.88 Safari/537.36",
			},
		});

		//console.log(response2.data);

		cprod = response2.data.match(/"name": "([^"]+)"/)[1];

		const pattern = /https:\/\/media\.croma\.com\/image\/upload\/[^\"]+/g;
		const links = response2.data.match(pattern);

		cpic = links[0];

		console.log(cprod);
		console.log(cprice);
		console.log(cpic);
	} else if (url.includes("reliancedigital")) {
		console.log("Reliance link found");
		reliance = 0;
		prodn4 = null;
		price4 = null;
		let response = await axios.get(url, {
			headers: {
				"User-Agent":
					"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.88 Safari/537.36",
			},
		});

		cprice = response.data.match(/"price":"(\d+).0","availability":"/)[1];
		cprod = response.data.match(/property="og:title" content="([^"]+)"/)[1];
		cpic = response.data.match(/,"image":"([^"]+)","/)[1];
		cprice = parseInt(cprice);
		console.log(cprod);
		console.log(cprice);
		console.log(cpic);
	}
}

async function start2(url9) {
	await start(url9);
	console.log("\n");
	bkprod = cprod;
	if (work) {
		//console.log('Before slice ', cprod);
		//cprod = cprod.split(" ");
		brand = cprod.split(" ")[0].toLocaleLowerCase();
		
		cprod = cprod.split("|")[0];
		cprod = cprod.split("&")[0];
		cprod = cprod.replaceAll("(", "");
		cprod = cprod.replaceAll(")", "");
		cprod = cprod.replaceAll("[", "");
		cprod = cprod.replaceAll("]", "");
		cprod = cprod.replaceAll(", ", " ");
		cprod = cprod.replaceAll("  ", " ");

		//console.log("At the start ", cprod.split(" "));
		//console.log('before', cprod, ' after ', cprod.trim())
		console.log("after removing stuff", cprod);
		encodename = encodeURIComponent(cprod);

		//https://www.flipkart.com/search?q=apple%20watch%20se%20%282nd%20gen&otracker=search&otracker1=search&marketplace=FLIPKART&as-show=on&as=off
		//https://www.flipkart.com/search?q=Apple+MacBook+Air+Laptop+M1+chip&otracker=search&otracker=search&otracker1=search&marketplace=FLIPKART&as-show=on&as=off&p%5B%5D=facets.price_range.from%3D30000&p%5B%5D=facets.price_range.to%3DMax
		//console.log(url1);

		//console.log('\nsliced title : ', cprod, '\n');
	}
}

async function start3(url9) {
	await start2(url9);
	if (flipkart) {
		let flipkartenc = encodeURIComponent(
			cprod.split(" ").slice(0, 5).join(" ")
		).replaceAll(/\(/g, "%28");
		flipkartenc = flipkartenc.replaceAll(/\)/g, "%29");
		flipkartenc = flipkartenc.replaceAll(/%5B/g, "%20");
		flipkartenc = flipkartenc.replaceAll(/%2C/g, "");
		url1 =
			"https://www.flipkart.com/search?q=" +
			flipkartenc +
			`&otracker=search&otracker=search&otracker1=search&marketplace=FLIPKART&as-show=on&as=off&as=off&p%5B%5D=facets.price_range.from%3D${
				cprice / 2
			}&p%5B%5D=facets.price_range.to%3DMax`;

		//url1 = "https://www.flipkart.com/search?q=thomson%20tv&otracker=search&otracker1=search&marketplace=FLIPKART&as-show=on&as=off";

		console.log(url1);
		let response = await axios.get(url1, {
			headers: {
				"User-Agent":
					"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3",
			},
		});
		let $ = cheerio.load(response.data);
		let sponsor = [];
		let sorry = $(
			"#container > div > div._36fx1h._6t1WkM._3HqJxg > div > div > div._3uTeW4"
		).text();
		//console.log('sorry', sorry);
		if (sorry) {
			console.log("Nothing found");
		} else {
			if ($("a.s1Q9rs").text().length != 0 || $("a.IRpwTa").text().length != 0) {
				console.log("stack");
				$("div._4ddWXP").each((index, element) => {
					//console.log($(element).text(), '\n');
					if ($(element).text().includes("Sponsored")) {
						sponsor.push(index);
					}
				});

				console.log(sponsor);

				$("a.s1Q9rs").each((index, element) => {
					if (!sponsor.includes(index)) {
						prodn1.push($(element).attr("title"));
					}
				});

				$("a.IRpwTa").each((index, element) => {
					if (!sponsor.includes(index)) {
						prodn1.push($(element).attr("title"));
					}
				})

				$("div._30jeq3").each((index, element) => {
					if (!sponsor.includes(index)) {
						price1.push(
							parseInt(
								$(element)
									.text()
									.replaceAll("₹", "")
									.replaceAll(",", "")
							)
						);
					}
				});
			} else {
				console.log("imp");
				$("div._2kHMtA").each((index, element) => {
					if ($(element).text().includes("Sponsored")) {
						sponsor.push(index);
					}
				});

				console.log(sponsor);

				$("div._4rR01T").each((index, element) => {
					if (!sponsor.includes(index)) {
						prodn1.push($(element).text());
					}
				});

				$("div._30jeq3").each((index, element) => {
					if (!sponsor.includes(index)) {
						price1.push(
							parseInt(
								$(element)
									.text()
									.replaceAll("₹", "")
									.replaceAll(",", "")
							)
						);
					}
				});
			}
		}
		//prodn1 = prodn1.slice(0, 5);
		//price1 = price1.slice(0, 5);

		console.log("Flipkart Price");

		console.log(prodn1);
		console.log(price1);
	}
}

async function start4(url9) {
	await start3(url9);
	//console.log("here1");
	if (amazon) {
		//console.log(encodename.split("(")[0]);
		//let amazonenc = encodename;
		let amazonenc = bkprod;

		amazonenc = amazonenc.replaceAll("(", "");
		amazonenc = amazonenc.replaceAll(")", "");
		amazonenc = amazonenc.replaceAll("[", "");
		amazonenc = amazonenc.replaceAll("]", "");
		amazonenc = amazonenc.trim();
		amazonenc = amazonenc.replaceAll(" ", "+");
		amazonenc = amazonenc.replaceAll("  ", "+");
		console.log("amazon link search ", amazonenc);

		// amazonenc = amazonenc.replace(/%20/g, "+");
		// amazonenc = amazonenc.replace(/%2C/g, "");

		//console.log('last char ', amazonenc.charAt(amazonenc.length - 1));
		if (amazonenc.charAt(amazonenc.length - 1) == "+") {
			amazonenc = amazonenc.substring(0, amazonenc.length - 1);
		}
		//console.log('after removal', amazonenc);
		url2 =
			"https://www.amazon.in/s?k=" +
			amazonenc +
			`&rh=p_36%3A${Math.floor(cprice / 2)}00-`;
		//url2 = "https://www.amazon.in/s?k=OnePlus+11R+5G+%2816GB+RAM%2C+256GB%2C+Galactic+Silver%29&ref=nb_sb_ss_ts-doa-p_2_7"
		//url2 =
		//   "https://www.amazon.in/s?k=SAMSUNG+Galaxy+A34+5G&ref=nb_sb_ss_ts-doa-p_2_7";
		console.log(url2);

		while (prodn2.length == 0) {
			let response = await axios.get(url2, {
				headers: {
					"User-Agent":
						"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3",
				},
			});
			//console.log(response.data);
			let $ = cheerio.load(response.data);

			console.log("came here");

			const two = $("div.puisg-col-inner").each((index, element) => {
				// if (
				// 	$(element)
				// 		.text()
				// 		.split("  ")[0]
				// 		.toLocaleLowerCase()
				// 		.includes(brand)
				// ) {
				// 	console.log($(element).text().split("  "), "endline");
				// }

				if (
					$(element)
						.text()
						.split("  ")[0]
						.toLocaleLowerCase()
						.includes(brand) &&
					!$(element)
						.text()
						.split("  ")[0]
						.toLocaleLowerCase()
						.includes("Choicefor")
				) {
					if (
						$(element)
							.text()
							.split("  ")
							[$(element).text().split("  ").length - 2].includes(
								"coupon"
							)
					) {
						if (
							$(element)
								.text()
								.split("  ")
								[$(element).text().split("  ").length - 3].includes(
									"coupon"
								)
						) {
							//console.log("coupon", $(element).text().split("  "));
							prodn2.push($(element).text().split("  ")[0]);
							price2.push(
								parseInt(
									$(element)
										.text()
										.split("  ")
										[$(element).text().split("  ").length - 4].split(
											"₹"
										)[1]
										.replaceAll(",", "")
								)
							);
						} else {
							//console.log("not coupon", $(element).text().split("  "));
							prodn2.push($(element).text().split("  ")[0]);
							price2.push(
								parseInt(
									$(element)
										.text()
										.split("  ")
										[$(element).text().split("  ").length - 3].split(
											"₹"
										)[1]
										.replaceAll(",", "")
								)
							);
						}

						//price2.push(parseInt($(element).text().split('  ')[-2].split('₹')[1].replaceAll(',', '')));
					} else if (
						$(element)
							.text()
							.split("  ")
							[$(element).text().split("  ").length - 2].includes("₹")
					) {
						//console.log("above price");
						prodn2.push($(element).text().split("  ")[0]);
						price2.push(
							parseInt(
								$(element)
									.text()
									.split("  ")
									[$(element).text().split("  ").length - 2].split(
										"₹"
									)[1]
									.replaceAll(",", "")
							)
						);
					}
				}
			});
		}

		console.log("Amazon Price");
		console.log(prodn2);
		console.log(price2);
	}
}

async function start5(url9) {
	await start4(url9);

	if (croma) {
		//console.log('here2');
		let cromaenc = encodename;
		//cromaenc = cromaenc.split("(")[0];
		cromaenc = cromaenc.replaceAll("(", "");
		cromaenc = cromaenc.replaceAll(")", "");
		console.log("croma link ", cromaenc);
		//let url3 = "https://www.croma.com/searchB?q="+cromaenc+"%3Arelevance&text="+encodename;
		url3 =
			"https://api.croma.com/searchservices/v1/search?currentPage=0&query=" +
			cromaenc +
			"%3Arelevance&fields=FULL&channel=WEB&channelCode=600082&spellOpt=DEFAULT";
		//https://api.croma.com/searchservices/v1/search?currentPage=0&query=Sansui%20Prime%20Series%20140cm%20(55%20%3Arelevance&fields=FULL&channel=WEB&channelCode=600082&spellOpt=DEFAULT

		try {
			let response = await axios.get(url3, {
				headers: {
					"User-Agent":
						"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3",
				},
			});

			let result = response.data.products;

			const products = result.map((result) => {
				prodn3.push(result.name);
				price3.push(
					parseInt(result.price.formattedValue.replaceAll(/[₹,]/g, ""))
				);
			});

			prodn3 = prodn3.slice(0, 10);
			price3 = price3.slice(0, 10);
			console.log("before split ", cromaenc);
			cromaenc = cromaenc.split("&")[0];
			console.log("After split ", cromaenc);
			url3 =
				"https://www.croma.com/searchB?q=" +
				cromaenc +
				"%3Arelevance&text=" +
				cromaenc;

			console.log("Croma Prices");
			console.log(prodn3);
			console.log(price3);

			return result;
		} catch (error) {
			console.log("error");
			throw error;
		}
	}
}

async function start6(url9) {
	await start5(url9);
	if (reliance) {
		//console.log('here3')
		let relianceenc = encodename;
		//relianceenc = relianceenc.split("(")[0];
		console.log(relianceenc);
		//relianceenc = relianceenc.split("(")[0];
		/* relianceenc = relianceenc.replace(/\(/g, "%28");
        relianceenc = relianceenc.replace(/\)/g, "%29"); */
		relianceenc = relianceenc.replaceAll(" ", "%20");
		//url4 = `https://www.reliancedigital.in/rildigitalws/v2/rrldigital/cms/pagedata?pageType=productSearchPage&q=${relianceenc}%3Arelevance&page=0&size=24&pc=`;

		url4 = `https://www.reliancedigital.in/rildigitalws/v2/rrldigital/cms/pagedata?pageType=productSearchPage&q=${relianceenc}%3Arelevance%3Aprice%3A%5B${
			cprice / 2
		}%20TO%20${cprice * 1.5}%5D&page=0&size=24&pc=`;

		//"https://www.reliancedigital.in/search?q=" + relianceenc + "r:relevance";
		//url4 = "https://www.reliancedigital.in/search?q=fans:relevance";

		//console.log(url4);

		let response = await axios.get(url4, {
			headers: {
				"User-Agent":
					"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3",
			},
		});

		let $ = cheerio.load(response.data);
		//console.log(response.data.data.productListData.results[0]);
		response.data.data.productListData.results.forEach((element, index) => {
			prodn4.push(element.name);
			price4.push(element.price.value);

			//console.log(index, element.name, element.price.value);
			//console.log(element);
		});

		console.log("Reliance Prices");
		
		console.log(prodn4);
		console.log(price4);
		url4 = `https://www.reliancedigital.in/search?q=${relianceenc}:relevance:price:[${
			cprice / 2
		}%20TO%202001990]&page=0`;
	}
}
const app = express();
app.use(cors());

app.get("/data", async (req, res) => {
	let url9 = req.query.site;
	await start6(url9);
	//url3 = url5;
	res.json({
		brand,
		bkprod,
		cprice,
		cpic,
		prodn1,
		price1,
		url1,
		prodn2,
		price2,
		url2,
		prodn3,
		price3,
		url3,
		prodn4,
		price4,
		url4,
	});
	(prodn1 = []),
		(price1 = []),
		(prodn2 = []),
		(price2 = []),
		(prodn3 = []),
		(price3 = []),
		(prodn4 = []),
		(price4 = []),
		(amazon = !service || amazon),
		(flipkart = !service || flipkart),
		(croma = !service || croma),
		(reliance = !service || reliance);
});
let port = 5000;
app.listen(port, () => {
	console.log(`Server is running on http://localhost:${port}/data?site=`);
});
