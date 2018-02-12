import { fetchData } from "../utils";

class Bittrex {
	constructor(socket) {
		this.baseUrl = "https://bittrex.com/api/v1.1/public";
		this.socket = socket;
	}

	async getData() {
		try {
			return JSON.parse(await fetchData(`${this.baseUrl}/getmarketsummaries`));
		} catch (error) {
			console.log(error)
		}
	}

	async start() {
		let data = await this.getData();
		let formatData = this.formatData(data);
		this.socket.emit("bittrex_feed", formatData);
		return formatData;
	}

	formatData(data) {
    	let coins = {};
    	(data.result).forEach((obj) => {
    		let coin = obj.MarketName.split('-').join('');
    		coins[coin] = {
	    		high: obj.High,
	    		low: obj.Low,
	    		volume: obj.Volume,
	    		last: obj.Last,
	    		base_volume: obj.BaseVolume,
	    		bid: obj.Bid,
	    		ask: obj.Ask,
	    		prev_day: obj.PrevDay,
	    		percent_change: ((obj.Last - obj.PrevDay) / obj.PrevDay) * 100
    		}
    	});
    	return coins;
	}
}
export default Bittrex