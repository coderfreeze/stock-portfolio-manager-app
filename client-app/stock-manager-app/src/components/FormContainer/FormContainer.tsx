import * as React from 'react';
import axios from 'axios';
import { serverUrl } from '../../Helpers/Constants';
import { useUser } from '../UserContext/UserContext';
import { StockData } from '../../interface/StockData';
import StockInfo from '../StockInfo/StockInfo';
import { Link } from 'react-router-dom';

interface IFormContainerProps {}

const FormContainer: React.FunctionComponent<IFormContainerProps> = () => {

  const {user} = useUser(); // Get user from context

  const [ticker, setTicker] = React.useState<string>("");
  const [data, setData] = React.useState<StockData | null>(null);


  const searchStock = async (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        console.log("Token error, no token available");
        return;
      }
      const stock = await axios.get(`${serverUrl}/stocks/${ticker}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (stock.data && stock.data.symbol) {
        setData(stock.data);
        console.log("Data ", data);
      } else {
        console.log("No stock data found for this ticker");
        setData(null);
      }

    } catch (error) {
      console.log("Error fetching stock data", error);
    }
  };


  return (
    <div className="container mx-auto p-4 flex flex-col items-center mt-12">

      {/* Greeting */}
      {user && <h2 className='text-2xl mb-4'>Hello, {user.username}!</h2>}

      {/* Text for user*/}
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-3">Search for Your Favorite Stocks</h2>
        <p className="text-gray-700 text-lg">
          Find and add stocks to your portfolio easily. Enter the stock symbol below and click "Search" to get started.
        </p>
      </div>
      
      {/* Search Bar */}
      <div className="w-full max-w-lg flex justify-center">

        <form className="w-full max-w-md flex flex-col items-center bg-white shadow-lg rounded-lg p-8" onSubmit={searchStock}>
          <input type="text" placeholder="Enter stock symbol (ex: AAPL)" onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTicker(e.target.value)}
            className="w-full p-4 border border-gray-300 rounded-2xl text-lg mb-4 focus:outline-none focus:ring-2 focus:ring-green-400 transition duration-300"/>
          <button type="submit" className="w-full bg-green-500 text-white p-3 rounded-full text-lg hover:bg-green-600 transition-colors duration-300">Search</button>
        </form>

      </div>

      {/* Render StockInfo if data exists */}
      {data && <StockInfo data={[data]} clearData={() => setData(null)}/>}


      {/* View your stocks button */}
      <div className="w-full max-w-lg mt-14 flex justify-center">
        <Link to="/portfolio" className="text-lg font-medium hover:text-blue-600 transition-colors duration-200">
          <button className="w-full max-w-xs bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 text-white text-xl font-bold p-6 rounded-full shadow-lg hover:opacity-90 transition-opacity duration-300">
            View Your Stocks Here
          </button>
        </Link>
      </div>

    </div>
  );
};

export default FormContainer;


