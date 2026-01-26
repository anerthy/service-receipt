import { useParams } from 'react-router';

export const MechanicPage = () => {
  const { id } = useParams();
  return <div>Mechanic Page {id}</div>;
};

// export const MechanicPage = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const {
//     data: mechanic,
//     isLoading,
//     isError,
//     error,
//     mutation,
//   } = useMechanic(id!);

//   if (isLoading) {
//     return <FullScreenLoading />;
//   }

//   if (isError) {
//     return <div>{error.message}</div>;
//   }

//   if (!customer) {
//     return <div>Error loading customer.</div>;
//   }

//   const handleSubmit = async (customerLike: Partial<Customer>) => {
//     console.log(customerLike);

//     await mutation.mutateAsync(customerLike, {
//       onSuccess: (customer) => {
//         toast.success('Datos del cliente guardados correctamente');
//         navigate(`/dashboard/customers/${customer.id}`);
//       },
//       onError: (error) => {
//         toast.error(
//           'Ha ocurrido un error al guardar los datos del cliente ' +
//             error.message,
//           {
//             position: 'top-right',
//           },
//         );
//       },
//     });
//   };

//   return (
//     <CustomerForm
//       customer={customer}
//       onSubmit={handleSubmit}
//       isPending={false}
//     />
//   );
// };
