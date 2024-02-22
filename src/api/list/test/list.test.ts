import { it, describe, test, beforeAll, afterAll, expect, beforeEach, afterEach } from "bun:test"
import { connectTestDB, disconnectDb } from "../../../config/db"
import { List } from "../models"
import { listFixtures } from "./fixtures"
import app from "../../../server"
import { ZodError } from "zod"

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

   test("GET / >> Should return array of all lists", async () => {
      const res = await app.request(`${apiUrl}/lists`)
      const parsedRes = await res.json();
      expect(parsedRes).toEqual({
         list: [
            listFixtures.oneItemList,
            listFixtures.twoItemList
         ]
      });
   });

   test("POST / >> Should create a new list", async () => {
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
      expect(res.status).toBe(200);

      const parsedRes = await res.json();
      expect(parsedRes.message).toBe("List created successfully");
      expect(parsedRes.list.shareId).toHaveLength(8);
      expect(parsedRes.list.items).toHaveLength(1);
   });

   test("POST / >> Should THROW ERROR 400 when create a new list without name", async () => {
      const bodypayload = {
         _id: "65d65f04acb821ff567d4bf0",
         // name: "lista terza e fantastica",
         items: [
            {
               itemName: "Elemento creazione 1",
               _id: "65d65f04acb821ff567d4bf0"
            }
         ],
      }

      const res = await app.request(`${apiUrl}/lists`, {
         method: 'POST',
         body: JSON.stringify(bodypayload)
      })
      expect(res.status).toBe(400);

      const parsedRes = await res.json();
      expect(parsedRes).toBe("List validation failed: name: Path `name` is required.")
   });


   test("PUT /:id >> Should edit List name", async () => {

      const nameEdited = `${listFixtures.oneItemList.name}, EDITED`;
      const bodypayload = {
         name: nameEdited,
      }

      const res = await app.request(`${apiUrl}/lists/${listFixtures.oneItemList._id}`, {
         method: 'PUT',
         body: JSON.stringify(bodypayload),
         headers: {
            "Content-Type": "application/json"
         }
      });
      expect(res.status).toBe(200);

      const parsedRes = await res.json();
      expect(parsedRes.ok).toBe(1);
      expect(parsedRes.value.name).toBe(nameEdited);
   });

   test("PUT /:id >> THROW ERROR 'unrecognized_keys' when edit List with extra an extra field", async () => {

      const nameEdited = `${listFixtures.oneItemList.name}, EDITED`;

      const bodypayload = {
         errorName: "UNRECOGNIZED_FIELD",
         name: nameEdited
      }

      const res = await app.request(`${apiUrl}/lists/${listFixtures.oneItemList._id}`, {
         method: 'PUT',
         body: JSON.stringify(bodypayload),
         headers: {
            "Content-Type": "application/json"
         }
      });
      expect(res.status).toBe(400);

      const { success, error }: {
         success: boolean,
         error: ZodError
      } = await res.json();

      expect(success).toBe(false);
      expect(error.issues[0].code).toBe("unrecognized_keys");
   });


   
});


