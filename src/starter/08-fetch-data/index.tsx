//import { useEffect, useState } from "react";
//import { Tour, tourSchema } from "./types";

//const url = 'https://www.course-api.com/react-tours-project'

// function Component() {
//   const [tours, setTours] = useState<Tour[] | null>([]);
//   const [error, setError] = useState<string | null>('');
//   const [loading, setLoading] = useState<boolean>(false);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         setLoading(true)
//         const response = await fetch(url);
//         if(!response.ok) {
//           throw new Error('Faliled to fetch tours');
//         }
//         const data:Tour[] = await response.json();
//         const result = tourSchema.array().safeParse(data);
//         console.log('result: ', result)

//         if(!result.success) {
//           console.log(result.error.message);
//           throw new Error('Failed to parse tours');
//         }
//         setTours(result.data)
//       } catch (error) {       
//          const msg = error instanceof Error ? error?.message : 'there was an error';
//          setError(msg);        
//       } finally {
//         setLoading(false);
//       }
//     }
//     fetchData()
//   }, [])

//   if(loading) return <h2>Loading...</h2>
//   if(error) return <h2>Error... {error}</h2>

//   return (
//     <div>
//       <h2>React & Typescript</h2>
//       <div style={{display: 'grid', placeItems: 'center', marginBottom: '1rem'}}>
//         {tours?.map(tour => {
//           return (
//             <div key={tour.id}>{tour.name}</div>
//           )
//         })}
//       </div>
//       <h2>Fetch Data</h2>
//     </div>
//   );
// }
// export default Component;

//REFACTOR with React query - Omit useEffect and useState for handelinf loaders and errors
import { useQuery } from '@tanstack/react-query';
import {fetchData} from './types';

function Component() {
  const {isLoading, isError, error, data:tours} = useQuery({
    queryKey: ['tours'],
    queryFn: fetchData
  }); 

  if(isLoading) return <h2>Loading...</h2>
  if(isError) return <h2>Error... {error.message}</h2>

  return (
    <div>
      <h2>React & Typescript</h2>
      <div style={{display: 'grid', placeItems: 'center', marginBottom: '1rem'}}>
        {tours?.map(tour => {
          return (
            <div key={tour.id}>{tour.name}</div>
          )
        })}
      </div>
      <h2>Fetch Data</h2>
    </div>
  );
}
export default Component;
