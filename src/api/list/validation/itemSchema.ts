import { z } from "zod";
import { UpdateItemAction } from "../types";

const addItemSchema = z.object({
   updateAction: z.literal(UpdateItemAction.add),
   payload: z.object({
      itemName: z.string(),
      price: z.number().optional().default(0),
   }).strict()
}).strict();

const editItemSchema = z.object({
   updateAction: z.literal(UpdateItemAction.edit),
   itemId: z.string(),
   payload: z.object({
      itemName: z.string().optional(),
      price: z.number().optional(),
      checked: z.boolean().optional()
   }).strict()
}).strict();

const deleteItemSchema = z.object({
   updateAction: z.literal(UpdateItemAction.delete),
   itemId: z.string(),
}).strict();

export const updateItemSchema = z.discriminatedUnion(
   'updateAction', [
   addItemSchema,
   editItemSchema,
   deleteItemSchema,
]);

export type updateItemSchema = z.infer<typeof updateItemSchema>;

