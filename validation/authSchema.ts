import { z } from "zod"

export const authSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6)
})
export type AuthBody = z.infer<typeof authSchema>
