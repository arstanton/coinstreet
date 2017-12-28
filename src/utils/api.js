export const getPrices = async currency_pair => {
    try {
        let response = await fetch("http://localhost:8080/prices/BTC-USD", {
            headers: {
                "Content-Type": "application/json"
            }
        });

        let json = await response.json();
        return JSON.parse(json);
    } catch (err) {
        return err;
        console.log(`Error: ${err}`);
    }
};
