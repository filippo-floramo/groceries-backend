import { it, describe, test, beforeAll, afterAll, expect, beforeEach, afterEach } from "bun:test"
import { connectTestDB, disconnectDb } from "../../../config/db"
import { List } from "../models"
import { listFixtures } from "./fixtures"
import app from "../../../server"

const apiUrl = "http://localhost:3000/api"

beforeAll(async () => {
   //disconnect previous connections
   await disconnectDb();
   //Connect teest DB
   await connectTestDB();
});

afterAll(async () => {
   await disconnectDb()
})

describe("/lists endpoint", () => {

   beforeEach(async () => {
      await List.insertMany([
         listFixtures.oneItemList,
         listFixtures.twoItemList
      ])
   });
   afterEach(async () => {
      await List.deleteMany({});
   });

   test("GET /, Should return array of all lists", async () => {
      const res = await app.request(`${apiUrl}/lists`)
      const parsedRes = await res.json();
      expect(parsedRes).toEqual({
         list: [
            listFixtures.oneItemList,
            listFixtures.twoItemList
         ]
      });
   });

   test("POST /, Should create a new list with 1 item", async () => {
      const bodypayload = {
         _id: "65d65f04acb821ff567d4bf0",
         name: "lista terza e fantastica",
         items: [
            {
               itemName: "Elemento creazione 1",
               _id: "65d65f04acb821ff567d4bf0"
            }
         ],
      }
      const parsedBody = JSON.stringify(bodypayload);

      const res = await app.request(`${apiUrl}/lists`, {
         method: 'POST',
         body: parsedBody
      })
      const parsedRes = await res.json();
      console.log('parsedRes.message :>> ', parsedRes.message);
      expect(parsedRes.message).toBe("List created successfully");
   });
})


