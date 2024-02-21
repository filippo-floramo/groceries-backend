import { it, describe, test, beforeAll, afterAll, expect } from "bun:test"
import { connectTestDB, disconnectDb } from "../../config/db"
import { List } from "./models"
import app from "../../server"

const apiUrl = "http://localhost:3000/api"

beforeAll(async () => {
   //disconnect previous connections
   await disconnectDb();

   await connectTestDB();
   await List.insertMany([{
      "_id": "65d6208cc8f69d5a5b42904a",
      name: "lista di prova piena di parole sconce",
      items: [],
      shareId: "FAKE_SHAREID"
   }])

})

afterAll(async () => {
   await List.deleteMany({});
   await disconnectDb()
})

describe("Lists endpoint", () => {

   it("Should retu", async () => {
      const res = await app.request(`${apiUrl}/lists`)
      const content = await res.json();

      expect(content).toEqual({ "list": [] });
   })
})


