import express from "express";
import fetchDailyStockData from "../stockAPI/stockService";
import { stockModel } from "../models/stockModel";

// SEARCH STOCK
export const getStock = async(
    req: express.Request,
    res: express.Response
) => {
    try {
        const stockData = await fetchDailyStockData(req.params.id);

        res.status(200).json(stockData);
        return stockData;

    } catch (error) {
        res.status(500).json({message: "Error fetching daily stock data"});
        console.log(error);
    }
};

// ADD STOCK
export const addStock = async(
    req: express.Request,
    res: express.Response
) => {
    try {
        const {symbol, open, high, low, price, volume, date, previousClose, change, changePercent} = req.body;
        const userId = (req as any).user.userId;

        if (!symbol || !open || !high || !low || !price || !volume || !date || !previousClose || !change || !changePercent || !userId) {
            res.status(400);
            return;
        } else {
            const stock = await stockModel.create({
                symbol,
                open, 
                high,
                low,
                price, 
                volume,
                date, 
                previousClose, 
                change,
                changePercent,
                userId
            });
            res.status(201).send(stock);
        }
        
    } catch (error) {
        res.status(500).send("Something went wrong");
    }
};



export const getStocks = async(
    req: express.Request,
    res: express.Response
) => {
    const userId = req.params.userId;
    try {
        const stocks = await stockModel.find({userId});
        
        if (!stocks || stocks.length === 0) {
            return res.status(404).send({message: "Stocks not found"});
        }

        res.json(stocks);

    } catch (error) {
        res.status(500).json({message: "Error fetching stocks", error});
    }
}





// UPDATE STOCK
export const updateStock = async(
    req: express.Request,
    res: express.Response
) => {
    try {
        const stock = await stockModel.findById(req.params.id);
        if (!stock) {
            res.status(404).send({message: "Stock not found"});
        };

        const updatedStock = await stockModel.findByIdAndUpdate(req.params.id, req.body);
        res.status(200).send(updatedStock);

    } catch (error) {
        res.status(500).send({message: "Something went wrong"});
        
    }
};


// DELETE STOCK
export const deleteStock = async(
    req: express.Request,
    res: express.Response
) => {
    try {
        const stock = await stockModel.findByIdAndDelete(req.params.id);

        if (!stock) {
            res.status(404).send({message: "Stock not found"});
        };

    } catch (error) {
        res.status(500).send({message: "Something went wrong"});
    }
};