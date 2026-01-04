import { z } from 'zod';

export const productSchema = z.object({
  name: z.string().min(1, "Name is required"),
  category: z.string().min(1, "Category is required"),
  price: z.number().nonnegative("Price cannot be negative"),
  stock: z.number().int().nonnegative("Stock cannot be negative"),
  
  // --- ADDED SALES HERE ---
  // We make it optional or default to 0 so new products work too
  sales: z.number().int().nonnegative().default(0),
  
  imageUrl: z.string().url().optional().or(z.literal('')),
});

export type ProductInput = z.infer<typeof productSchema>;