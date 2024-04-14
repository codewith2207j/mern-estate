import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";
export default function Header() {
  return (
    <header className="text-slate-200 shadow-md">
      <div className=" flex justify-between items-center max-w-6xl mx-auto p-3">
        <h1 className="font-bold text-sm sm:text-xl flex flex-wrap">
          <span className="text-slate-500">Arun</span>
          <span className="text-slate-700">Estate</span>
        </h1>
        <form className="text-slate-100 p-3 rounded-lg flex items-start">
          <input
            type="text"
            placeholder="search..."
            value=""
            className="bg-transparent focus:outline-none w-24 sm:w-24"
          />
          <FaSearch className="text-slate-500"></FaSearch>
        </form>
        <ul className="flex gap-4">
          <Link to="/">
            <li className="hidden sm:inline text-slate-700 hover:underline">
              Home
            </li>
          </Link>
          <Link to="/about">
            <li className="hidden sm:inline text-slate-700 hover:underline">
              About
            </li>
          </Link>
          <Link to="/signin">
            <li className="hidden sm:inline text-slate-700 hover:underline">
              Sign In
            </li>
          </Link>
          <Link to="/admin">
            <li className="hidden sm:inline text-slate-700 hover:underline">
              Admin
            </li>
          </Link>
        </ul>
      </div>
    </header>
  );
}
