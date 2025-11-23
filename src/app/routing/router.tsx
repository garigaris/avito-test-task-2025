import { createBrowserRouter, Navigate } from "react-router-dom";
import {ErrorPage} from "../../pages/ErrorPage/ui/ErrorPage";
import { ListPage } from "../../pages/ListPage/ListPage";
import {ItemPage} from "../../pages/ItemPage/ui/ItemPage";
import { StatsPage } from "../../pages/StatsPage/ui/StatsPage";
import RootLayout from "../../components/Layouts/Rootlayour";
import routes from "../../shared/routes/routes";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,           
    errorElement: <ErrorPage />,       
    children: [
      { index: true, element: <Navigate to="/list" replace /> },  
      { path: routes.HOME, element: <ListPage /> },   
      { path: routes.ITEM_DETAIL, element: <ItemPage />},  
      { path: routes.STATISTICS, element:<StatsPage/>}          
    ],
  },
]);