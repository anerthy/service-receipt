import { useParams } from 'react-router';

export const CustomerPage = () => {
  const { id } = useParams();

  return <div>Customer no. {id}</div>;
};
