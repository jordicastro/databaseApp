import React from "react";

const Navbar = () => {
  // Home, Database
  return (
    <>
      <nav className="bg-indigo-700 border-b border-indigo-500">
        <div>
          <ul className="flex h-20 justify-start px-4 items-center">
            <li className="hidden md:block text-white text-2xl font-bold ml-2 bg-indigo-800 px-2 py-1 rounded-lg hover:bg-orange-400 transition-all active:bg-orange-700">
              <a href="/">Home</a>
            </li>
            <li className="hidden md:block text-white text-2xl font-bold ml-2 py-1 bg-indigo-800 px-2 rounded-lg hover:bg-orange-400 transition-all active:bg-orange-700">
              <a href="/database">Database</a>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
