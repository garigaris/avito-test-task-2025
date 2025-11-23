import routes from "./routes";

export const getItemDetailUrl = (id: string | number) => 
  routes.ITEM_DETAIL.replace(':id', id.toString());