import { useState, useEffect } from 'react';
import { supabase } from './lib/supabase';
import type { Service } from './interfaces';

function App() {
  const [services, setServices] = useState<Service[]>([]);

  useEffect(() => {
    async function getServices() {
      const { data } = await supabase
        .from('services')
        .select()
        .order('id', { ascending: true });

      const services = data as Service[] | [];

      if (services === null) return;

      if (services.length > 1) {
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
