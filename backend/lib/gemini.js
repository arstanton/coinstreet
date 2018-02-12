import { fetchData } from "../utils";

class Gemini {
	constructor(socket) {
		this.baseUrl = "https://api.gemini.com/v1/";
		this.socket = socket;
	}

	async getData() {
		try {
			let data = {};
			let tickers = JSON.parse(await fetchData(`${this.baseUrl}/symbols`));
			for (let ticker of tickers) {
				data[ticker] = JSON.parse(await fetchData(`${this.baseUrl}/pubticker/${ticker}`));
			}
			return data;
		} catch (error) {
			console.log(error)
		}
	}

	async start() {
		let data = await this.getData();
		let formatData = this.formatData(data);
		this.socket.emit("gemini_feed", formatData);
		return formatData;
	}

	formatData(data) {
    	let coins = {};
    	Object.entries(data).forEach(([coin, product]) => {
    		coin = coin.toUpperCase();
    		coins[coin] = {
	    		volume_1day: product.volume.USD * product.last,
	    		last: product.last,
	    		ask: product.ask,
	    		bid: product.bid
    		}
    	});
    	return coins;
	}
}
export default Gemini;