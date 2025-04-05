import { useEffect, useState } from 'react';
import axios from 'axios';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

// Define the stock symbols and a corresponding color for each
const stockSymbols = [
  { symbol: "AAPL", color: "#4C51BF" },
  { symbol: "MSFT", color: "#F56565" },
  { symbol: "GOOGL", color: "#48BB78" },
  { symbol: "AMZN", color: "#F6AD55" },
  { symbol: "TSLA", color: "#ED8936" },
  { symbol: "META", color: "#68D391" },
  { symbol: "NVDA", color: "#3182CE" },
  { symbol: "BRK.B", color: "#D53F8C" },
  { symbol: "SPY", color: "#9F7AEA" },
  { symbol: "V", color: "#ECC94B" }
];

function App() {
  const [data, setData] = useState({});
  const [error, setError] = useState(null);

  // WebSocket URL - replace with your actual WebSocket server
  const wsUrl = "wss://api.stockapi.com/stocks/live";

  useEffect(() => {
    // Fetch initial stock prices
    const fetchPrices = async () => {
      try {
        const promises = stockSymbols.map(symbol =>
          axios.get(`https://stockview-api.onrender.com/api/price?symbol=${symbol.symbol}`)

            .then(res => ({
              symbol: symbol.symbol,
              data: res.data
            }))
        );

        const results = await Promise.all(promises);

        const fetchedData = results.reduce((acc, { symbol, data }) => {
          acc[symbol] = Array.isArray(data) ? data : [];
          return acc;
        }, {});

        setData(fetchedData);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Failed to fetch stock data');
      }
    };

    fetchPrices();

    // Setup WebSocket for real-time updates
    const socket = new WebSocket(wsUrl);
    
    socket.onopen = () => {
      console.log('WebSocket connected');
    };

    socket.onmessage = (event) => {
      const stockUpdate = JSON.parse(event.data);
      const { symbol, price, time } = stockUpdate;

      // Update the corresponding stock data
      setData(prevData => {
        const updatedData = { ...prevData };
        if (!updatedData[symbol]) {
          updatedData[symbol] = [];
        }
        updatedData[symbol].push({ price, time });
        return updatedData;
      });
    };

    socket.onerror = (error) => {
      console.error("WebSocket error: ", error);
    };

    socket.onclose = () => {
      console.log('WebSocket disconnected');
    };

    return () => {
      socket.close();
    };
  }, []);

  if (error) {
    return <div className="text-center text-red-500">Error: {error}</div>;
  }

  if (Object.keys(data).length === 0) {
    return <div className="text-center text-gray-500">Loading...</div>;
  }

  return (
    <div className="App min-h-screen bg-gray-100 flex flex-col items-center py-8 px-4">
      <h2 className="text-3xl font-semibold text-gray-800 mb-6">Live Stock Prices</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full max-w-6xl">
        {stockSymbols.map(({ symbol, color }) => {
          const stockData = data[symbol] || [];

          return (
            <div className="bg-white rounded-lg shadow-lg p-6" key={symbol}>
              <h3 className="text-xl font-bold text-gray-800 mb-4">{symbol}</h3>
              <ResponsiveContainer width="100%" height={200}>
                <LineChart data={stockData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="time" tickFormatter={(tick) => tick.split(" ")[1]?.slice(0, 5) || tick} />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="price" stroke={color} strokeWidth={2} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          );
        })}
      </div>

      {/* Show a table of the latest stock prices */}
      <div className="mt-8 w-full max-w-4xl">
        <h3 className="text-2xl font-semibold text-gray-800 mb-4">Latest Stock Prices</h3>
        <table className="min-w-full table-auto border-collapse">
          <thead>
            <tr>
              <th className="px-4 py-2 text-left">Stock</th>
              <th className="px-4 py-2 text-left">Price</th>
            </tr>
          </thead>
          <tbody>
            {stockSymbols.map(({ symbol }) => {
              const latestPrice = data[symbol]?.[data[symbol]?.length - 1]?.price || 'N/A';

              return (
                <tr key={symbol} className="border-b">
                  <td className="px-4 py-2 text-gray-700">{symbol}</td>
                  <td className="px-4 py-2 text-gray-700">{latestPrice}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
