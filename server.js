import express from "express";
import * as http from "http";
import io from "socket.io";
import Coinbase from "./coinbase";
import { getPrices } from "./js/utils/api";

const app = express();
const coinbase = new Coinbase();

const httpServer = http.createServer(express);
io(httpServer);

const PORT = 8080;
const HOST = "0.0.0.0";

app.use(express.static("public"));

app.get("/", async (req, res) => {
    res.sendFile("views/index.html", { root: __dirname });
});

app.get("/prices/:currency_pair", async (req, res) => {
    res.json(await coinbase.getPrice(req.params.currency_pair, "SPOT"));
});

// io.on('connection', function(socket){
//   console.log('a user connected');
// });

app.listen(PORT, HOST);
