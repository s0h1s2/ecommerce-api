import { z } from "zod";

export const createUserSchema=z.object({
  name:z.string().min(6),
  email:z.string().email(),
  password:z.string().min(6),
})

export type CreateUser=z.infer<typeof createUserSchema>
