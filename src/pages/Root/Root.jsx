import { Outlet } from "react-router-dom";

// wrapper for everything, add things to be common accross all pages.

const Root = () => {
  return (
    <>
      {/* add other elements such as navigation and footer */}
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default Root;
