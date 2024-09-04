"use client";
import { Link } from "react-router-dom";
import "../App.css";
import Home from "../pages/Home";
import Movies from "../pages/Movies";
import Series from "../pages/Series";

const navigation = [
  { name: "Movies", href: "../../Movies" },
  { name: "Series", href: "../../Series" },
];

function Navbar() {
  return (
    <>
      <div className="top-section">
        <header className=" inset-x-0 top-0 z-50">
          <nav
            aria-label="Global"
            className="flex items-center justify-between p-8 lg:px-8"
          >
            <div className="flex lg:flex-1 text-xl">
              <Link to="../" className="linkcolor ">
                <h1 className="Logo pb-2">
                  7 Day <span className="text-blue-400">Weather</span>
                </h1>
              </Link>
            </div>
            
          </nav>
        </header>
      </div>
    </>
  );
}

export default Navbar;
