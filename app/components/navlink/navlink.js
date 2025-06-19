'use client'
import React from 'react'
import {usePathname} from 'next/navigation'
import classes from './navlink.module.css'
import Link from 'next/link'

const NavLinks = ({ children, href }) => {
  const path = usePathname();

  return (
    <Link
      href={href}
      className={path.startsWith(href) ? classes.active : classes.link}
    >
      {children}
    </Link>
  );
}

export default NavLinks;
