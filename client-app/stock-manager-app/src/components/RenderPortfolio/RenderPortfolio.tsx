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
        const response = await axios.get(`${serverUrl}/stocks/${userId}`);
        
        setStocks(response.data);

      } catch (error) {
        console.log("Error fetching stocks", error);
      }
    }
  };

  React.useEffect(() => {
    getUserStocks();
  }, []);

  return (
    <div>


      <div className="container mx-auto p-4 flex flex-col items-center mt-12">
        {stocks.length > 0 ? (
          stocks.map((stock) => (
            <div>
              <h2>{stock.symbol}</h2>
              <p><strong>Open:</strong>{stock.open}</p>
             <p><strong>High:</strong>{stock.high}</p>
              <p><strong>Low:</strong>{stock.low}</p>
              <p><strong>Current Price:</strong>{stock.price}</p>
              <p><strong>Volume:</strong>{stock.volume}</p>
              <p><strong>Date:</strong>{stock.date}</p>
              <p><strong>Previous Close:</strong>{stock.previousClose}</p>
              <p><strong>Change:</strong>{stock.change}</p>
              <p><strong>Change Percent:</strong>{stock.changePercent}</p>
            </div>
          ))
        ) : (
          <p>No stocks found in your portfolio.</p>
       )}
      </div>

      <div>
        <Link to="/">
          <button>
            Back to Search
          </button>
        </Link>
      </div>


    </div>
    
  );

};

export default RenderPortfolio;
