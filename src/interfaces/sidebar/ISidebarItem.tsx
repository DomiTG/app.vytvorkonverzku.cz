import React from "react";
import { IconType } from "react-icons";

export default interface ISidebarItem {
  name: string;
  description: string;
  icon: IconType;
  href: string;
  additional?: boolean;
}
