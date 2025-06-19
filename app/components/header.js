import React from "react";
import logo from "@/assets/logo.png";
import Link from "next/link";
import classes from "./header.module.css";
import Image from "next/image";
import HeaderBackground from "./headerBackground";
import NavLinks from "./navlink/navlink";
const Header = () => {
  return (
    <>
        <HeaderBackground/>
      <header className={classes.header}>
        <Link href="/" className={classes.logo}>
          <Image src={logo} alt="An image" priority />
          Next Foods
        </Link>
        <nav className={classes.nav}>
          <ul>
            <li>
              <NavLinks href='/meals'>Browse Meals</NavLinks>
            </li>
            <li>
              <NavLinks href='/community'>Foodies Community</NavLinks>
            </li>
          </ul>
        </nav>
      </header>
    </>
  );
};

export default Header;
