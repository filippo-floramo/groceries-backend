import { List } from "../models/listModel";
import { Context } from "hono";



export const getLists = async (c: Context) => {
   const lists = await List.find();

   return c.json({ list: lists });
};



export const createList = async (c: Context) => {
   const { name, items }: Partial<List> = await c.req.json();
   
   let res;
   try {
      res = await List.create({
         name,
         items
      });

   } catch (error: any) {
      const errMessage = error.message
      c.status(400)
      return c.json(
         errMessage
      );
   }
   return c.json({
      message: "List created successfully",
      item: res
   })
}