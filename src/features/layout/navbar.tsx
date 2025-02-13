import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <>
      <header className="relative bg-white">
        <nav className="mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="relative border-b border-gray-200 px-4 sm:static sm:px-0">
            <div className="flex h-16 items-center justify-between">
              <div className="flex flex-1">
                <Link to="/">Shopendo</Link>
              </div>
              <div className="flex">Cart</div>
            </div>
          </div>
        </nav>
      </header>
    </>
  );
};

export default Navbar;
