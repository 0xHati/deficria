import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import { Header } from "../../components/Header";
import styles from "./Layout.module.scss";

// wrapper for everything, add things to be common accross all pages.

const Layout = ({ outlet }) => {
  return (
    <>
      {/* add other elements such as navigation and footer */}
      <Header />
      <main>
        <Suspense fallback={null}>{outlet ? outlet : <Outlet />}</Suspense>
      </main>
    </>
  );
};

export default Layout;
