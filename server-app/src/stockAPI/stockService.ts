import axios from "axios";


const fetchDailyStockData = async(symbol:string) => {
    try {
        const url = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${process.env.API_KEY}`;

        const response = await axios.get(url);

        console.log("Full API Response: ", response.data);

        if (response.data["Error Message"]) {
            throw new Error("Invalid stock symbol or API request");
        }

        const stockData = response.data["Global Quote"];
        const formattedData = formatStockData(stockData);
        
        return formattedData;

    } catch (error) {
        console.error("Error fetching stock data", error);
        throw error;
    }
};



const formatStockData = (rawData: any) => {
    return {
        symbol: rawData["01. symbol"],
        open: rawData["02. open"],
        high: rawData["03. high"],
        low: rawData["04. low"],
        price: rawData["05. price"],
        volume: rawData["06. volume"],
        date: rawData["07. latest trading day"],
        previousClose: rawData["08. previous close"],
        change: rawData["09. change"],
        changePercent: rawData["10. change percent"]
    }
};

export default fetchDailyStockData;