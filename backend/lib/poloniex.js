import { fetchData } from "../utils";

class Poloniex {
	constructor(socket) {
		this.baseUrl = "https://poloniex.com/public?command=";
		this.socket = socket;
	}

	async getData() {
		try {
			return JSON.parse(await fetchData(`${this.baseUrl}returnTicker`));
		} catch (error) {
			console.log(error)
		}
	}

	async start() {
		let data = await this.getData();
		let formatData = this.formatData(data);
		this.socket.emit("poloniex_feed", formatData);
		return formatData;
	}

	formatData(data) {
    	let coins = {};
    	Object.entries(data).forEach(([coin, product]) => {
    		coins[coin] = { ...product,
	    		low: product.lowestAsk,
	    		high: product.highestBid,
    		}
    		delete coins[coin].lowestAsk;
    		delete coins[coin].highestBid;
    	});
    	return coins;
	}
}
export default Poloniex