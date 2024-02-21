export enum UpdateItemAction  {
   add = "add_item",
   edit = "edit_item",
   delete = "delete_item"
}

type Item = {
   itemName?: string,
   price?: number,
   checked?: boolean
}



export type ItemUpdateBody =
   {
      updateAction: UpdateItemAction.add,
      payload: Item
   }
   |
   {
      updateAction: UpdateItemAction.edit,
      itemId: string
      payload: Item
   }
   |
   {
      updateAction: UpdateItemAction.delete,
      itemId: string
   }