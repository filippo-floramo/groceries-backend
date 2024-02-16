import { Schema, model } from "mongoose";

const listSchema = new Schema({
   name: String,
   lastname: String,
   description: String
});


export const List = model('List', listSchema);