import { useEffect, usestate } from 'react';
import axios from 'axios';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

function App(){
  const [data, setData] = usestate([]);

  useEffect(() => {
    const fetchPrice = async () => {
      const res = await axios.get('http://localhost:8000/api/price?symbol=AAPL');
      setData(res.data);
    };
    fetchPrice();
    const interval = setinInterval(fetchPrice, 60000);
    return () => clearInterval(interval);
  }, []);
  return (
    <div className="App">
      <h2>Live Stock Price (AAPL)</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <XAxis dataKey="time" tickFormatter={(tick) => tick.split(" ")[1].slice(0,5)} />
          <YAxis domain={['auto', 'auto']} />
          <Tooltip />
          <Line type="monotone" dataKey="price" stroke="#8884d8" strokeWidth={2} dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default App;