import * as React from 'react';

interface IFormContainerProps {}

const FormContainer: React.FunctionComponent<IFormContainerProps> = () => {

  return (
    <div className="container mx-auto p-4 flex flex-col items-center mt-12">

      {/* Text for user*/}
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-3">Search for Your Favorite Stocks</h2>
        <p className="text-gray-700 text-lg">
          Find and add stocks to your portfolio easily. Enter the stock symbol below and click "Search" to get started.
        </p>
      </div>
      
      {/* Search Bar */}
      <div className="w-full max-w-lg flex justify-center">
        <form className="w-full max-w-md flex flex-col items-center bg-white shadow-lg rounded-lg p-8">
          <input type="text" placeholder="Enter stock symbol"
            className="w-full p-4 border border-gray-300 rounded-2xl text-lg mb-4 focus:outline-none focus:ring-2 focus:ring-green-400 transition duration-300"/>
          <button type="submit" className="w-full bg-green-500 text-white p-3 rounded-full text-lg hover:bg-green-600 transition-colors duration-300">Search</button>
        </form>
      </div>


      {/* View your stocks button */}
      <div className="w-full max-w-lg mt-14 flex justify-center">
        <button className="w-full max-w-xs bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 text-white text-xl font-bold p-6 rounded-full shadow-lg hover:opacity-90 transition-opacity duration-300">
          View Your Stocks Here
        </button>
      </div>

    </div>
  );
};

export default FormContainer;


