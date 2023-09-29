var axios = require("axios");
var cheerio = require("cheerio");
var express = require("express");
var cors = require("cors");

let url;
let bkprod, cprod, cprice, cpic, url1, url2, url3, url4, url5, encodename;
let flipkart = 1,
   amazon = 1,
   croma = 1,
   reliance = 1,
   work = 1;

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
      flipkart = 0;
      prodn1 = null;
      price1 = null;
      let response = await axios.get(url, {
         headers: {
            "User-Agent":
               "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.88 Safari/537.36",
         },
      });
      //console.log("here1");
      let $ = cheerio.load(response.data);

      //#container > div > div._2c7YLP.UtUXW0._6t1WkM._3HqJxg > div._1YokD2._2GoDe3 > div._1YokD2._3Mn1Gg.col-8-12 > div:nth-child(3) > div > div:nth-child(1) > h1 > span
      //#container > div > div._2c7YLP.UtUXW0._6t1WkM._3HqJxg > div._1YokD2._2GoDe3 > div._1YokD2._3Mn1Gg.col-8-12 > div:nth-child(3) > div > div.dyC4hf > div.CEmiEU > div > div._30jeq3._16Jk6d
      //#container > div > div._2c7YLP.UtUXW0._6t1WkM._3HqJxg > div._1YokD2._2GoDe3 > div._1YokD2._3Mn1Gg.col-8-12 > div:nth-child(3) > div > div.dyC4hf > div.CEmiEU > div > div._30jeq3._16Jk6d

      //#container > div > div._2c7YLP.UtUXW0._6t1WkM._3HqJxg > div._1YokD2._2GoDe3 > div._1YokD2._3Mn1Gg.col-8-12 > div:nth-child(2) > div > div:nth-child(1) > h1 > span

      //#container > div > div._2c7YLP.UtUXW0._6t1WkM._3HqJxg > div._1YokD2._2GoDe3 > div._1YokD2._3Mn1Gg.col-8-12 > div:nth-child(2) > div > div.dyC4hf > div.CEmiEU > div > div

      cprod = $(
         "#container > div > div._2c7YLP.UtUXW0._6t1WkM._3HqJxg > div._1YokD2._2GoDe3 > div._1YokD2._3Mn1Gg.col-8-12 > div:nth-child(3) > div > div:nth-child(1) > h1 > span"
      ).text();
      if (cprod.length == 0) {
         cprod = $(
            "#container > div > div._2c7YLP.UtUXW0._6t1WkM._3HqJxg > div._1YokD2._2GoDe3 > div._1YokD2._3Mn1Gg.col-8-12 > div:nth-child(2) > div > div:nth-child(1) > h1 > span"
         ).text();
         if (cprod.length == 0) {
            cprod = $(
               "#container > div > div._2c7YLP.UtUXW0._6t1WkM._3HqJxg > div > div._1YokD2._3Mn1Gg.col-8-12 > div:nth-child(1) > div > div:nth-child(1) > h1 > span"
            ).text();
         }
      }
      cprice = $(
         "#container > div > div._2c7YLP.UtUXW0._6t1WkM._3HqJxg > div._1YokD2._2GoDe3 > div._1YokD2._3Mn1Gg.col-8-12 > div:nth-child(3) > div > div.dyC4hf > div.CEmiEU > div > div._30jeq3._16Jk6d"
      ).text();

      //#container > div > div._2c7YLP.UtUXW0._6t1WkM._3HqJxg > div > div._1YokD2._3Mn1Gg.col-8-12 > div:nth-child(1) > div > div.dyC4hf > div.CEmiEU > div > div._30jeq3._16Jk6d

      if (cprice.length == 0) {
         cprice = $(
            "#corePriceDisplay_desktop_feature_div > div.a-section.a-spacing-none.aok-align-center > span.a-price.aok-align-center.reinventPricePriceToPayMargin.priceToPay > span:nth-child(2) > span.a-price-whole"
         ).text();
         if (cprice.length == 0) {
            cprice = $(
               "#container > div > div._2c7YLP.UtUXW0._6t1WkM._3HqJxg > div._1YokD2._2GoDe3 > div._1YokD2._3Mn1Gg.col-8-12 > div:nth-child(2) > div > div.dyC4hf > div.CEmiEU > div > div._30jeq3._16Jk6d"
            ).text();
            if (cprice.length == 0) {
               cprice = $(
                  "#container > div > div._2c7YLP.UtUXW0._6t1WkM._3HqJxg > div > div._1YokD2._3Mn1Gg.col-8-12 > div:nth-child(1) > div > div.dyC4hf > div.CEmiEU > div > div._30jeq3._16Jk6d"
               ).text();
            }
         }
      }
      cpic = $(
         "#container > div > div._2c7YLP.UtUXW0._6t1WkM._3HqJxg > div._1YokD2._2GoDe3 > div._1YokD2._3Mn1Gg.col-5-12._78xt5Y > div:nth-child(1) > div > div._3li7GG > div._1BweB8 > div._3kidJX > div.CXW8mj._3nMexc > img"
      ).attr("src");

      console.log(cprod);
      cprice = cprice.replaceAll(/[₹,]/g, "");
      cprice = parseInt(cprice);
      console.log(cprice);
      console.log(cpic);
   } else if (url.includes("croma.com")) {
      console.log("Croma link found");
      croma = 0;
      prodn3 = null;
      price3 = null;
      p_id = url.substring(url.lastIndexOf("/") + 1);

      //{"correlation_id":"sssaasss","client":"CROMA","catalog":"croma_products","user_id":"4V3QsbiaMwCCUu5F","org_user_id":"","mad_uuid":"4V3QsbiaMwCCUu5F","fields":["no_of_views","product_image_url","product_title","product_price","product_image_text","product_detail_page_url","rating"],"data_params":{"catalog_item_id":"260532"}}

      //https://api.croma.com/pricing-services/v1/price?productList=275932

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

      /* let response;

        if (true) {
            response = await axios.post(`https://api.tatadigital.com/api/v1.1/msd/data`, {
                "correlation_id":"sssaasss","client":"CROMA","catalog":"croma_products","user_id":"4V3QsbiaMwCCUu5F","org_user_id":"","mad_uuid":"4V3QsbiaMwCCUu5F","fields":["no_of_views","product_image_url","product_title","product_price","product_image_text","product_detail_page_url","rating"],"data_params":{"catalog_item_id":"260532"}
            })
        }

        console.log(response.data); */

      //console.log(response.data[0].images[0].altText);
      //#search > div.s-desktop-width-max.s-desktop-content.s-wide-grid-style-t2.s-opposite-dir.s-wide-grid-style.sg-row > div.sg-col-20-of-24.s-matching-dir.sg-col-16-of-20.sg-col.sg-col-8-of-12.sg-col-12-of-16 > div > span.rush-component.s-latency-cf-section > div.s-main-slot.s-result-list.s-search-results.sg-row > div:nth-child(9) > div > div > div > div > div > div.sg-col.sg-col-4-of-12.sg-col-8-of-16.sg-col-12-of-20.sg-col-12-of-24.s-list-col-right > div

      /* cprod = response.data[0].images[0].altText;
        cprice = response.data[0].price.value;
        cpic = response.data[0].images[0].url; */
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
      cprod = cprod.split(" ");
      cprod =
         cprod[0] +
         " " +
         cprod[1] +
         " " +
         cprod[2] +
         " " +
         cprod[3] +
         " " +
         cprod[4] +
         " " +
         cprod[5];
      //console.log('After slice ', cprod);
      encodename = encodeURIComponent(cprod);
      let flipkartenc = encodename.replaceAll(/\(/g, "%28");
      flipkartenc = flipkartenc.replaceAll(/\)/g, "%29");
      flipkartenc = flipkartenc.replaceAll(/%5B/g, "%20");
      url1 =
         "https://www.flipkart.com/search?q=" +
         flipkartenc +
         "&otracker=search&otracker=search&otracker1=search&marketplace=FLIPKART&as-show=on&as=off";
      //https://www.flipkart.com/search?q=apple%20watch%20se%20%282nd%20gen&otracker=search&otracker1=search&marketplace=FLIPKART&as-show=on&as=off
      //console.log(url1);

      //console.log('\nsliced title : ', cprod, '\n');
   }
}

async function start3(url9) {
   await start2(url9);
   if (flipkart) {
      console.log(url1);
      let response = await axios.get(url1, {
         headers: {
            "User-Agent":
               "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3",
         },
      });
      let $ = cheerio.load(response.data);
      let sorry = $(
         "#container > div > div._36fx1h._6t1WkM._3HqJxg > div > div > div._3uTeW4"
      ).text();
      //console.log('sorry', sorry);
      if (sorry) {
         console.log("Nothing found");
      } else {
         let first = $(
            "#container > div > div._36fx1h._6t1WkM._3HqJxg > div > div:nth-child(2) > div:nth-child(2) > div > div > div > a > div._3pLy-c.row > div.col.col-7-12 > div._4rR01T"
         ).text();

         if (first) {
            //less
            console.log("imp");

            //#container > div > div._36fx1h._6t1WkM._3HqJxg > div._1YokD2._2GoDe3 > div:nth-child(2) > div:nth-child(2) > div > div > div > div > span

            let title = [];
            $("span").each((index, element) => {
               title.push($(element).text());
            });

            $("div._4rR01T").each((index, element) => {
               if (title.includes("Sponsored")) {
                  if (index > 1 && index < 7) {
                     prodn1.push($(element).text());
                  }
               } else {
                  prodn1.push($(element).text());
               }
            });
            $("div._30jeq3._1_WHN1").each((index, element) => {
               if (title.includes("Sponsored")) {
                  if (index > 1 && index < 7) {
                     price1.push(
                        parseInt($(element).text().replaceAll(/[₹,]/g, ""))
                     );
                  }
               } else {
                  price1.push(
                     parseInt($(element).text().replaceAll(/[₹,]/g, ""))
                  );
               }
            });
            /* console.log(prodn1);
                console.log(price1); */
         } else {
            //more
            console.log("non-imp");

            //#container > div > div._36fx1h._6t1WkM._3HqJxg > div._1YokD2._2GoDe3 > div:nth-child(2) > div:nth-child(2) > div > div:nth-child(1) > div > div._2I5qvP > span
            //#container > div > div._36fx1h._6t1WkM._3HqJxg > div._1YokD2._2GoDe3 > div:nth-child(2) > div:nth-child(2) > div > div:nth-child(1) > div > div._2B099V > a.IRpwTa
            //#container > div > div._36fx1h._6t1WkM._3HqJxg > div._1YokD2._2GoDe3 > div:nth-child(2) > div:nth-child(2) > div > div:nth-child(1) > div > div > a.IRpwTa

            let title = [];
            $("span").each((index, element) => {
               //console.log($(element).text());
               title.push($(element).text());
            });

            $("a.IRpwTa").each((index, element) => {
               //console.log('names ', $(element).text());
               if (title.includes("Sponsored")) {
                  if (index > 1 && index < 7) {
                     prodn1.push($(element).text());
                  }
               } else {
                  prodn1.push($(element).text());
               }
            });
            if (prodn1.length == 0) {
               $("a.s1Q9rs").each((index, element) => {
                  if (title.includes("Sponsored")) {
                     if (index > 1 && index < 7) {
                        prodn1.push($(element).text());
                     }
                  } else {
                     prodn1.push($(element).text());
                  }
               });
            }
            $("div._30jeq3").each((index, element) => {
               if (title.includes("Ad")) {
                  if (index > 1 && index < 7) {
                     price1.push(
                        parseInt($(element).text().replaceAll(/[₹,]/g, ""))
                     );
                  }
               } else {
                  price1.push(
                     parseInt($(element).text().replaceAll(/[₹,]/g, ""))
                  );
               }
            });

            /* console.log(prodn1);
                console.log(price1); */

            //#container > div > div._36fx1h._6t1WkM._3HqJxg > div._1YokD2._2GoDe3 > div:nth-child(2) > div:nth-child(2) > div > div:nth-child(3) > div > a.s1Q9rs
         }
         prodn1 = prodn1.slice(0, 5);
         price1 = price1.slice(0, 5);

         console.log("Flipkart Price");

         console.log(prodn1);
         console.log(price1);
      }
   }
}

async function start4(url9) {
   await start3(url9);
   //console.log("here1");
   if (amazon) {
      let amazonenc = encodename.split("(")[0];
      amazonenc = amazonenc.replace(/%20/g, "+");

      amazonenc = amazonenc.replace(/\(/g, "%28");
      amazonenc = amazonenc.replace(/\)/g, "%29");
      url2 =
         "https://www.amazon.in/s?k=" +
         amazonenc +
         "&ref=nb_sb_ss_ts-doa-p_2_7";
      //url2 = "https://www.amazon.in/s?k=OnePlus+11R+5G+%2816GB+RAM%2C+256GB%2C+Galactic+Silver%29&ref=nb_sb_ss_ts-doa-p_2_7"
      console.log(url2);
      let response = await axios.get(url2, {
         headers: {
            "User-Agent":
               "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3",
         },
      });
      //console.log(response.data);
      let $ = cheerio.load(response.data);
      //console.log($('div.sg-col.sg-col-4-of-12.sg-col-8-of-16.sg-col-12-of-20.sg-col-12-of-24.s-list-col-right').text());

      $(
         "div.sg-col.sg-col-4-of-12.sg-col-8-of-16.sg-col-12-of-20.sg-col-12-of-24.s-list-col-right"
      ).each((index, element) => {
         //console.log($(element).text().split('  '), '\n');
         //console.log($(element).text().split('  ')[0].includes('SponsoredSponsored'), '\n');

         if (
            $(element).text().split("  ")[0].includes("SponsoredSponsored") ===
            false
         ) {
            prodn2.push($(element).text().split("  ")[0]);
            if (
               $(element).text().split("  ").at(-2).includes("coupon") === true
            ) {
               //console.log('coupon', $(element).text().split('  ').at(-3));
               price2.push(
                  parseInt(
                     $(element)
                        .text()
                        .split("  ")
                        .at(-3)
                        .split("₹")[1]
                        .replaceAll(",", "")
                  )
               );
               //console.log($(element).text().split('  ').at(-2).split('₹')[1].replace(',', ''));
            } else if (
               $(element).text().split("  ").at(-2).includes("₹") === false
            ) {
               //console.log('no price');
               price2.push(NaN);
            } else if (
               $(element).text().split("  ").at(-2).includes("coupon") === false
            ) {
               //console.log('no coupon', $(element).text().split('  ').at(-2));
               price2.push(
                  parseInt(
                     $(element)
                        .text()
                        .split("  ")
                        .at(-2)
                        .split("₹")[1]
                        .replaceAll(",", "")
                  )
               );
               //console.log($(element).text().split('  ').at(-2).split('₹')[1].replace(',', ''));
            }
         }
      });

      prodn2 = prodn2.slice(0, 5);
      price2 = price2.slice(0, 5);

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
      //let url3 = "https://www.croma.com/searchB?q="+cromaenc+"%3Arelevance&text="+encodename;
      let url3 =
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

         prodn3 = prodn3.slice(0, 5);
         price3 = price3.slice(0, 5);

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
      relianceenc = relianceenc.replace(/\(/g, "%28");
      relianceenc = relianceenc.replace(/\)/g, "%29");
      url4 =
         "https://www.reliancedigital.in/search?q=" +
         relianceenc +
         "r:relevance";
      //url4 = "https://www.reliancedigital.in/search?q=fans:relevance";

      //console.log(url4);

      let response = await axios.get(url4, {
         headers: {
            "User-Agent":
               "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3",
         },
      });

      let $ = cheerio.load(response.data);
      //console.log(response.data);

      let pattern = /"currencyIso":"INR","value":(\d+),/g;
      let match;
      while ((match = pattern.exec(response.data)) !== null) {
         const price = parseInt(match[1]);
         price4.push(price);
      }

      price4 = price4.slice(0, 5);

      $("p").each((index, element) => {
         if (index > 0 && index < 6) {
            prodn4.push($(element).text());
         }
      });
      prodn4 = prodn4.slice(0, price4.length);
      console.log("Reliance Prices");
      console.log(prodn4);
      console.log(price4);
   }
}
const app = express();
app.use(cors());

app.get("/data", async (req, res) => {
   let url9 = req.query.site;
   await start6(url9);
   url3 = url5;
   res.json({
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
      (amazon = 1),
      (flipkart = 1),
      (croma = 1),
      (reliance = 1);
});
let port = 5000;
app.listen(port, () => {
   console.log(`Server is running on http://localhost:${port}/data?site=`);
});
