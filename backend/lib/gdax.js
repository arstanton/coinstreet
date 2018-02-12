import gdax from "gdax";
import { fetchData } from "../utils.js";

class GDAX {
    constructor(socket) {
        this.baseUrl = "https://api.gdax.com";
    	this.socket = socket;
        this.publicClient = new gdax.PublicClient();
    }

    async getData() {
        try {
            let data = {};
            let tickers = (await this.publicClient.getProducts())
                .map(ticker => ticker.id);
            for (let ticker of tickers) {
                let product = await this.publicClient.getProductTicker(ticker);
                let stats = await this.publicClient.getProduct24HrStats(ticker);
                data[ticker] = { ...product, ...stats };
            }
            return data;
        } catch (error) {
            console.log(error)
        }
    }

    async start() {
		let data = await this.getData();
		let formatData = this.formatData(data);
		this.socket.emit("gdax_feed", formatData);
        return formatData;
    }

    formatData(data) {
    	let coins = {};
    	Object.entries(data).forEach(([coin, product]) => {
    		coin = coin.split('-').join('');
    		coins[coin] = { ...product,
	    		volume_1day: product.volume * product.price,
	    		percent_change: ((product.price - product.open) / product.open) * 100,
	    		last: product.price,
	    		low: product.low,
	    		high: product.high
    		}
    	});
    	return coins;
    }
}

export default GDAX;

