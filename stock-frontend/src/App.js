import { useEffect, useState } from 'react';
import axios from 'axios';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

function App() {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPrice = async () => {
      try {
        const res = await axios.get('/api/price?symbol=AAPL'); // Changed to relative URL
        console.log('Fetched data:', res.data);
        setData(Array.isArray(res.data) ? res.data : []);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Failed to fetch stock data');
      }
    };

    fetchPrice();
    const interval = setInterval(fetchPrice, 60000); // Refresh every 60s
    return () => clearInterval(interval);
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!data.length) {
    return <div>Loading...</div>;
  }

  return (
    <div className="App">
      <h2>Live Stock Price (AAPL)</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <XAxis dataKey="time" tickFormatter={(tick) => tick.split(" ")[1]?.slice(0, 5) || tick} />
          <YAxis domain={['auto', 'auto']} />
          <Tooltip />
          <Line type="monotone" dataKey="price" stroke="#8884d8" strokeWidth={2} dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default App;