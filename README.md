# Stock Porfolio Manager App

This is a stock portfolio web application built with Node, Express, React, and MongoDB. Also utilized TypeScript and Tailwind CSS.

## Features

- Register and sign in.
- Add, view, and delete stocks.
- MongoDB database integration.
- Responsive UI design with Tailwind CSS.
- TypeScript for type-safe development.

## Prerequsite Installations

- Node.js installed on your local environment.
- MongoDB server running locally or accessible via a remote connection.

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/coderfreeze/stock-portfolio-manager-app.git

2. Navigate to the project directory: 

    cd stock-portfolio-manager-app

3. Install dependencies for the client and server:
    
    cd client-app/stock-manager-app
    npm install

    cd ../../server-app
    npm install

4. Usage:

   Navigate to root project directory:
   
      Build: npm run build
   
      Start: npm run dev

## Contributions

Contributions are welcome. Fork the repo and submit a pull request.

## In Development
- **Login Features**: Currently working on implementing JSON web tokens so that users can login securely and each user can manage their own contacts independently. This ensures that many users can run or try out the application.
- **Portfolio Features** : Allowing users to add and view their portfolios with functional requests.
- **Portoflio Analysis**: Algorithms that analyze portfolios and advise users of appropriate changes.
- **Plaid API**: Allowing users to link their actual portfolios for actual use cases.
