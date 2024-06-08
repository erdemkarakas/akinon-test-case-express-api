# Currency Exchange API

This project provides a set of RESTful APIs for currency exchange, including exchange rate retrieval, currency conversion, and transaction listing.

## Getting Started

### Prerequisites

- Node.js (v20.14.0)
- npm

### Installation

1. Clone the repository:
    ```sh
    git clone https://github.com/yourusername/currency-exchange-api.git
    cd currency-exchange-api
    ```

2. Install dependencies:
    ```sh
    npm install
    ```

3. Create a `.env` file in the root directory and add your configuration:
    ```env
    CURRENCY_API_KEY=your_api_key
    CURRENCY_API_URL=http://data.fixer.io/api
    PORT=3000
    ```

### Running the Application

```sh
npm start
