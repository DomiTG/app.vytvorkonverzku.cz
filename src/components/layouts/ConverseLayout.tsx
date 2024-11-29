import { ReactNode, useState } from "react";
import MainLayout from "./MainLayout";
import ISidebarItem from "@/interfaces/sidebar/ISidebarItem";
import { FaHome } from "react-icons/fa";

export default function ConverseLayout({ children }: { children: ReactNode }) {
  const [additionalItems, setAdditionalItems] = useState<ISidebarItem[]>([
    {
      name: "Main",
      description: "Main",
      icon: FaHome,
      href: "/converses",
    },
  ]);

  return <MainLayout additionalItems={additionalItems}>{children}</MainLayout>;
}
