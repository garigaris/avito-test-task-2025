import { Outlet } from "react-router-dom";

import Header from "../Header/Header";

const RootLayout = () => {
  return (
    <>
      <Header />
      <main className="container">
        <Outlet />
      </main>
    </>
  );
};
export default RootLayout;
