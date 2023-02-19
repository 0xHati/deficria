import { Outlet } from "react-router-dom";
import { Header } from "../../components/Header";
import styles from "./Layout.scss";

// wrapper for everything, add things to be common accross all pages.

const Layout = ({ outlet }) => {
  return (
    <>
      {/* add other elements such as navigation and footer */}
      <Header />
      <main>{outlet ? outlet : <Outlet />}</main>
    </>
  );
};

export default Layout;
