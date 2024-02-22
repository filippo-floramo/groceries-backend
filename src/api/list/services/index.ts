import { ItemUpdateBody, UpdateItemAction} from "../types";




export const getDbFilterAndUpdateObject = ({ listId, body }: {
   listId: string
   body: ItemUpdateBody
}) => {

   let updateOperation
   let filter;

   switch (body.updateAction) {
      case UpdateItemAction.edit:
         const updateItemObject = Object.entries(body.payload).reduce((obj, [key, value]) => ({ ...obj, [`items.$.${key}`]: value }), {});

         filter = { _id: listId, "items._id": body.itemId };
         updateOperation = {
            $set: updateItemObject
         }
         break;
      case UpdateItemAction.add:
         filter = { _id: listId };
         updateOperation = {
            $push: { items: body.payload }
         };
         break;
      case UpdateItemAction.delete:
         filter = { _id: listId, "items._id": body.itemId };
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