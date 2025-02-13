import { Outlet } from "react-router-dom";
import Navbar from "./navbar";

const PageContainer = () => {
  return (
    <>
      <Navbar />
      <div className="bg-white">
        <main className="mx-auto max-w-7xl px-4 pb-16 pt-4 sm:px-6 sm:pb-24 sm:pt-8 lg:px-8 xl:px-2 xl:pt-14">
          <Outlet />
        </main>
      </div>
    </>
  );
};

export default PageContainer;
