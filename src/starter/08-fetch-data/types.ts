import axios from 'axios';
import {z} from 'zod';
const url = 'https://www.course-api.com/react-tours-project'

export const tourSchema = z.object({
    id: z.string(),
    name: z.string(),
    image: z.string(),
    info: z.string(),
    price: z.string(),
})

export type Tour = z.infer<typeof tourSchema>;

export const fetchData = async (): Promise<Tour[]> => {
   const response = await axios.get<Tour[]>(url);
   const result = tourSchema.array().safeParse(response.data);
   if(!result.success) {
    throw new Error('Parsing failed...')
   }
   return result.data;
}

