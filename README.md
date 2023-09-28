# Online-Shopping-API
API that fetches the data of products from shopping websites including:
- Flipkart
- Amazon
- Croma
- Reliance Digital

This is used in conjunction with the [Front-End](https://github.com/Santhosh-004/Project-Front-End) to get a beautiful looking UI with price comparisons.

This backend uses:
- Axios
- Cheerio
- Express
- Cors

We gather the data from each of these websites through **Web Scraping** which can later be used for various purposes

## Instructions:

1. First install Node.js from [official website](https://nodejs.org/en)
2. Clone this repo `$ git clone https://github.com/Santhosh-004/Online-Shopping-API.git`
3. Open a terminal in the repo directory and enter `$ node backendAPI.js`
4. The server will run in the localhost at port 5000.

## Usage:

- `/data?site=XXX` => Gives the comparison of similar products from the other 3 stores

XXX - Full link of the store
