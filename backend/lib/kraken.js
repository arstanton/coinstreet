import { fetchData } from "../utils";

class Kraken {	
	constructor(socket) {
		this.baseUrl = "https://api.kraken.com/0/public";
		this.socket = socket;
	}

	async getData() {
		try {
			let tickers = Object.keys(JSON.parse(await fetchData(`${this.baseUrl}/AssetPairs`)).result)
				.join(',');
			return JSON.parse(await fetchData(`${this.baseUrl}/Ticker?pair=${tickers}`));
		} catch (error) {
			console.log(error);
		}
	}

	async start() {
		let data = await this.getData();
		let formatData = this.formatData(data);
		this.socket.emit("kraken_feed", formatData);
		return formatData;
	}

	formatData(data) {
		let coins = {};
		Object.entries(data.result).forEach(([coin, product]) => {
			coins[coin] = {
				ask: product.a[0],
				bid: product.b[0],
				price: product.c[0],
				volume_today: product.v[0],
				volume_1day: product.v[1],
				volume_weighted_average_today: product.p[0],
				volume_weighted_average_1day: product.p[1],
				number_of_trade_today: product.t[0],
				number_of_trade_1day: product.t[1],
				low_today: product.l[0],
				low_1day: product.l[1],
				high_today: product.h[0],
				high_1day: product.h[1],
				open: product.o
			}
		});
		return coins;
	}
}
export default Kraken
