import request from "request-promise";
request.defaults({
    headers: {
        "Content-Type": "application/json"
    },
    resolveWithFullResponse: false, // A boolean to set whether the promise should be resolved with the full response or just the response body.
    simple: true // A boolean to set whether status codes other than 2xx should also reject the promise.
});
class Coinbase {
    constructor() {
        this.BASE_URL = "https://api.coinbase.com/v2";
        this.API_KEY = process.env.COINBASE_API_KEY;
        this.API_SECRET = process.env.COINBASE_API_SECRET;
        this.API_VERSION = process.env.COINBASE_API_VERSION;
    }

    async getCurrencies() {
        const endpoint = `${this.BASE_URL}/currencies`;
        return await request(endpoint, {
            header: {
                "CB-VERSION": this.API_VERSION
            }
        });
    }

    async getExchangeRate(currency = "USD") {
        const endpoint = `${this.BASE_URL}/exchange-rates?currency=${currency}`;
        return await request(endpoint, {
            header: {
                "CB-VERSION": this.API_VERSION
            }
        });
    }

    async getPrice(currency_pair, action) {
        console.log(`IM USING VERSION: ${this.API_VERSION}`);
        switch (action) {
            case "BUY":
                return await this.getBuyPrice(currency_pair);
                break;
            case "SELL":
                return await this.getSellPrice(currency_pair);
                break;
            case "SPOT":
                return await this.getSpotPrice(currency_pair);
                break;
        }
    }

    async getBuyPrice(currency_pair) {
        const endpoint = `${this.BASE_URL}/prices/${currency_pair}/buy`;
        return await request(endpoint, {
            header: {
                "CB-VERSION": this.API_VERSION
            }
        });
    }

    async getSellPrice(currency_pair) {
        const endpoint = `${this.BASE_URL}/prices/${currency_pair}/sell`;
        return await request(endpoint, {
            header: {
                "CB-VERSION": this.API_VERSION
            }
        });
    }

    async getSpotPrice(currency_pair) {
        const endpoint = `${this.BASE_URL}/prices/${currency_pair}/spot`;
        return await request(endpoint, {
            header: {
                "CB-VERSION": this.API_VERSION
            }
        });
    }
}

export default Coinbase;
