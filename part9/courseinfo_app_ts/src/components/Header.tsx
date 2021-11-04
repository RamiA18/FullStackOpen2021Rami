import React from "react";
import { HeaderProps } from "./../types";

// interface HeaderProps {
//   name: string
// }

const Header = ({ name }: HeaderProps) => {
  return <h1>{name}</h1>;
};

export default Header;
