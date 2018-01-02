import Gdax from "gdax";
class GDAX {
    constructor(socket, interval) {
    	this.socket = socket;
        this.publicClient = new Gdax.PublicClient();
        this.tickers = ["BTC-USD", "ETH-USD", "LTC-USD", "BCH-USD"];
    }

    async getProductTrades(ticker) {
	    return await this.publicClient.getProductTicker(ticker);
    }

    async getProduct24HrStats(ticker) {
		return await this.publicClient.getProduct24HrStats(ticker);
    }

    async getCoins() {
    	let group = {};
		for (let ticker of this.tickers) {
			let product = await this.getProductTrades(ticker);
			let stats = await this.getProduct24HrStats(ticker);
			group[ticker] = { ...product, ...stats };
		}
		return group;
    }

    async start() {
    	let interval = setInterval(async () => {
    		let product = await this.getCoins();
    		let cleanse = this.cleanseData(product);
    		this.socket.emit("gdax_feed", cleanse);
    	}, 10000);
    }

    cleanseData(data) {
    	let coins = {};
    	Object.entries(data).forEach(([coin, product]) => {
    		coin = coin.split('-')[0];
    		coins[coin] = { ...product,
	    		volume_1day: product.volume * product.price,
	    		percent_change: `${((product.price - product.open) / product.open) * 100} %`,
	    		price: `$ ${product.price.toLocaleString()}`,
	    		low: `$ ${product.low}`,
	    		high: `$ ${product.high}`
    		}
    	});
    	return coins;
    }
}

export default GDAX;
