import { z } from "zod"


export const updateListSchema = z.object({
   name: z.string().optional()
}).strict()

export type updateListSchema = z.infer<typeof updateListSchema>;