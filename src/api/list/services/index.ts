import { ItemUpdateBody} from "../types";




export const getDbFilterAndUpdateObject = ({ listId, body }: {
   listId: string
   body: ItemUpdateBody
}) => {


   let updateOperation
   let filter;

   switch (body.updateAction) {
      case "edit_item":
         const updateItemObject = Object.entries(body.payload).reduce((obj, [key, value]) => ({ ...obj, [`items.$.${key}`]: value }), {});

         filter = { _id: listId, "items._id": body.itemId };
         updateOperation = {
            $set: updateItemObject
         }
         break;
      case "add_item":
         filter = { _id: listId };
         updateOperation = {
            $push: { items: body.payload }
         };
         break;
      case "delete_item":
         filter = { _id: listId };
         updateOperation = {
            $pull: {
               items: { _id: body.itemId }
            }
         }
         break;
      default:
         throw new Error("No action type found")
   }
   return { filter, updateOperation }
}