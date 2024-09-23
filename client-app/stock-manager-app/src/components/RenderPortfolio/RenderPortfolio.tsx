import * as React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { serverUrl } from '../../Helpers/Constants';
import { StockData } from '../../interface/StockData';

interface IRenderPortfolioProps {}

const RenderPortfolio: React.FunctionComponent<IRenderPortfolioProps> = (props) => {

  const userId = localStorage.getItem("userId");
  const [stocks, setStocks] = React.useState<StockData[]>([]);

  const getUserStocks = async () => {
    if (userId) {
      try {
        const token = localStorage.getItem("token");

        const response = await axios.get(`${serverUrl}/stocks/user/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        });

        console.log(response.data);

        if (response.data && Array.isArray(response.data)) {
          setStocks(response.data);
        } else {
          console.error("stocks data is not an array", response.data);
        }

      } catch (error) {
        console.log("Error fetching stocks", error);
      }
    }
  };

  React.useEffect(() => {
    getUserStocks();
  }, []);

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 p-4">
      
      {/* Heading */}
      <h1 className="text-4xl font-bold mb-8 text-center">Your Stock Portfolio</h1>
      
      {/* Portfolio Container */}
      <div className="bg-white shadow-lg rounded-lg w-full max-w-4xl p-6 border border-gray-200">
        
        {stocks.length > 0 ? (
          <div className="space-y-6">
            {stocks.map((stock) => (
              <div key={stock.symbol} className="bg-gray-50 p-6 border border-gray-300 rounded-lg shadow-md">
                <h2 className="text-2xl font-semibold text-center mb-4">{stock.symbol}</h2>
                <div className="grid grid-cols-2 gap-4">
                  <p className="text-lg"><strong>Open:</strong> {stock.open}</p>
                  <p className="text-lg"><strong>High:</strong> {stock.high}</p>
                  <p className="text-lg"><strong>Low:</strong> {stock.low}</p>
                  <p className="text-lg"><strong>Current Price:</strong> {stock.price}</p>
                  <p className="text-lg"><strong>Volume:</strong> {stock.volume}</p>
                  <p className="text-lg"><strong>Date:</strong> {stock.date}</p>
                  <p className="text-lg"><strong>Previous Close:</strong> {stock.previousClose}</p>
                  <p className="text-lg"><strong>Change:</strong> {stock.change}</p>
                  <p className="text-lg"><strong>Change Percent:</strong> {stock.changePercent}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-lg text-center text-gray-500">No stocks found in your portfolio.</p>
        )}
      </div>

      {/* Back Button */}
      <div className="mt-8">
        <Link to="/">
          <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg shadow-md">
            Back to Search
          </button>
        </Link>
      </div>
    </div>
  );
};

export default RenderPortfolio;

