import { z } from "zod";

export const createOrderSchema = z.object({
  orderItems: z.array(z.object({ productId: z.number(), qty: z.number() })).min(1),
  address: z.string(),
  postalCode: z.string(),
  city: z.string(),
  country: z.string(),

})
export type CreateOrder = z.infer<typeof createOrderSchema>
