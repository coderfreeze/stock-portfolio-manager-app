import * as React from 'react';
import axios from 'axios';
import { StockData } from '../../interface/StockData';
import { serverUrl } from '../../Helpers/Constants';

interface IStockInfoProps {
    data: StockData[];
    clearData: () => void;
}

const StockInfo: React.FunctionComponent<IStockInfoProps> = (props) => {

    const {data, clearData} = props;


    const renderStockInfo = () => {
        return data.map((item) => (
            <div key={item.symbol} className="border p-6 m-4 rounded-lg shadow-lg bg-white max-w-4xl flex flex-col transition-transform transform hover:scale-105">
                <h2 className="text-3xl font-bold text-center mb-4">{item.symbol}</h2>
                <div className="grid grid-cols-2 gap-4 mb-4">
                    <p className="text-lg"><strong>Open:</strong> {item.open}</p>
                    <p className="text-lg"><strong>High:</strong> {item.high}</p>
                    <p className="text-lg"><strong>Low:</strong> {item.low}</p>
                    <p className="text-lg"><strong>Current Price:</strong> {item.price}</p>
                    <p className="text-lg"><strong>Volume:</strong> {item.volume}</p>
                    <p className="text-lg"><strong>Date:</strong> {item.date}</p>
                    <p className="text-lg"><strong>Previous Close:</strong> {item.previousClose}</p>
                    <p className="text-lg"><strong>Change:</strong> {item.change}</p>
                    <p className="text-lg"><strong>Change Percent:</strong> {item.changePercent}</p>
                </div>
                
                <div className="flex justify-between mt-4">
                    <button className="bg-green-500 text-white p-4 rounded-full text-lg hover:bg-green-600 transition-colors duration-300" onClick={addStock}>
                        Add to Portfolio
                    </button>
                    <button className="bg-red-500 text-white p-4 rounded-full text-lg hover:bg-red-600 transition-colors duration-300 ml-4" onClick={clearData}>
                        Clear Search
                    </button>
                </div>
            </div>
        ));
    };

    const addStock = async(e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        try {
            if (data && data.length > 0) {
                const stockData = data[0];

                await axios.post(`${serverUrl}/stocks`, {
                    symbol: stockData.symbol,
                    open: stockData.open,
                    high: stockData.high,
                    low: stockData.low,
                    price: stockData.price,
                    volume: stockData.volume,
                    date: stockData.date,
                    previousClose: stockData.previousClose,
                    change: stockData.change,
                    changePercent: stockData.changePercent,
                    userId: localStorage.getItem("userId"),
                });
            }

            
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="flex flex-col items-center">
            {data.length > 0 ? renderStockInfo() : <p>No stock data available.</p>}
        </div>
    );
};

export default StockInfo;






