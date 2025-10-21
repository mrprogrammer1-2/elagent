import React from "react";
import Container from "./Container";
import { NavLink } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-slate-800 to-slate-900 text-white mt-8 bottom-0 w-full">
      <Container
        className={
          "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 py-8 md:flex-row justify-between items-start gap-8"
        }
      >
        <div>
          <h2 className="text-2xl font-semibold mb-6 text-teal-400">Info</h2>
          <ul className="space-y-3 text-slate-300">
            <li className="cursor-pointer transition-all hover:translate-x-2 hover:text-teal-400 w-fit">
              <NavLink to={"/"}>Home</NavLink>
            </li>
            <li className="cursor-pointer transition-all hover:translate-x-2 hover:text-teal-400 w-fit">
              <NavLink to={"/about"}>About us</NavLink>
            </li>
            <li className="cursor-pointer transition-all hover:translate-x-2 hover:text-teal-400 w-fit">
              <NavLink to={"/collection"}>Shop</NavLink>
            </li>
            <li className="cursor-pointer transition-all hover:translate-x-2 hover:text-teal-400 w-fit">
              <NavLink to={"/contact"}>Contact us</NavLink>
            </li>
          </ul>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-6 text-teal-400">
            Our Policies
          </h2>
          <ul className="space-y-3 text-slate-300">
            <li className="cursor-pointer transition-all hover:translate-x-2 hover:text-teal-400 w-fit">
              FAQs
            </li>
            <li className="cursor-pointer transition-all hover:translate-x-2 hover:text-teal-400 w-fit">
              Privacy Policy
            </li>
            <li className="cursor-pointer transition-all hover:translate-x-2 hover:text-teal-400 w-fit">
              Cookie Policy
            </li>
            <li className="cursor-pointer transition-all hover:translate-x-2 hover:text-teal-400 w-fit">
              Terms and Conditions
            </li>
          </ul>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-6 text-teal-400">Order</h2>
          <ul className="space-y-3 text-slate-300">
            <li className="cursor-pointer transition-all hover:translate-x-2 hover:text-teal-400 w-fit">
              My Account
            </li>
            <li className="cursor-pointer transition-all hover:translate-x-2 hover:text-teal-400 w-fit">
              View Cart
            </li>
            <li className="cursor-pointer transition-all hover:translate-x-2 hover:text-teal-400 w-fit">
              Wishlist
            </li>
            <li className="cursor-pointer transition-all hover:translate-x-2 hover:text-teal-400 w-fit">
              Compare
            </li>
          </ul>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-6 text-teal-400">Store</h2>
          <ul className="space-y-3 text-slate-300">
            <li className="cursor-pointer transition-all hover:translate-x-2 hover:text-teal-400 w-fit">
              2548 Broaddus Maple Court <br /> Avenue, Madisonville KY 4783,
              <br /> United States of America
            </li>
            <li className="cursor-pointer transition-all hover:translate-x-2 hover:text-teal-400 w-fit">
              Call Us: <b className="text-teal-400">1–234–5678901</b>
              <br />
              Mon-Sun: 9:00am - 9:00pm
            </li>
          </ul>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
