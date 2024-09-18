import mongoose from "mongoose";

interface Stock extends Document {
    symbol: string;
    price: number;
    volume: number;
    high: number;
    low: number;
    previousClose: number;
    change: number;
    changePercent: string;
    latestTradingDay: string;
}


const stockSchema = new mongoose.Schema({
    symbol: {
        type: String,
        required: true,
    },
    open: {
        type: String,
        required: true
    },
    high: {
        type: String,
        required: true
    },
    low: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    volume: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    previousClose: {
        type: String, 
        required: true
    },
    change: {
        type: String,
        required: true
    },
    changePercent: {
        type: String,
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // reference the user model
        required: true,
    }
}, {
    timestamps: true,
});

export const stockModel = mongoose.model("Stock", stockSchema);