import { useState, useEffect } from 'react';
import { supabase } from './lib/supabase';

function App() {
  const [services, setServices] = useState([]);

  useEffect(() => {
    async function getServices() {
      const { data: services } = await supabase.from('services').select();

      if (services === null) return;

      if (services.length > 1) {
        console.log(services);

        setServices(services);
      }
    }

    getServices();
  }, []);

  return (
    <ul>
      {services.map(({ id, name }) => (
        <li key={id}>{name}</li>
      ))}
    </ul>
  );
}
export default App;
