import { fetchData } from "../utils";

class Bithumb {
	constructor(socket) {
		this.baseUrl = "https://api.bithumb.com/public/ticker/all";
		this.socket = socket;
	}

	async getData() {
		try {
			return JSON.parse(await fetchData(this.baseUrl));
		} catch (error) {
			console.log(error)
		}
	}

	async start() {
		let data = await this.getData();
		let formatData = this.formatData(data);
		this.socket.emit("bithumb_feed", formatData);
		return formatData;
	}

	formatData(data) {
    	let coins = {};
    	Object.entries(data.data).forEach(([coin, product]) => {
    		if (coin !== 'date') {
	    		coins[coin] = {
		  			open: product.opening_price,
		  			close: product.closing_price,
		  			low: product.min_price,
		  			high: product.max_price,
		  			average: product.average_price,
		  			units_traded: product.units_traded,
		  			volume_1day: product.volume_1day,
		  			volume_7day: product.volume_7day,
		  			last: product.buy_price,
		  			sell: product.sell_price,
		  			percent_change: ((product.buy_price - product.opening_price) / product.opening_price) * 100,
	    		}
    		}
    	});
    	return coins;
	}
}
export default Bithumb