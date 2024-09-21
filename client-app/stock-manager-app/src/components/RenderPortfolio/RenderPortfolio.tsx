import * as React from 'react';
import axios from 'axios';

interface IRenderPortfolioProps {
}

const RenderPortfolio: React.FunctionComponent<IRenderPortfolioProps> = (props) => {
  const getUserStocks = async () => {
    const token = localStorage.getItem("token");
    const response = await axios.get("/api/users/user", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(response.data);
  };

  return (
    <></>
  );
};

export default RenderPortfolio;
