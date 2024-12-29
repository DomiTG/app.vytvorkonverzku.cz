import { ReactNode, useState } from "react";
import MainLayout from "./MainLayout";
import ISidebarItem from "@/interfaces/sidebar/ISidebarItem";
import { FaHome } from "react-icons/fa";
import { GrDomain } from "react-icons/gr";
import { GoRepoTemplate } from "react-icons/go";

export default function ConverseLayout({
  converse_id,
  siderbarShrink,
  children,
}: {
  converse_id: number;
  siderbarShrink: boolean;
  children: ReactNode;
}) {
  const [additionalItems, setAdditionalItems] = useState<ISidebarItem[]>([
    {
      name: "Main",
      description: "Main",
      icon: FaHome,
      href: "/converses/" + converse_id,
    },
    {
      name: "Domains",
      description: "Propojené domény",
      icon: GrDomain,
      href: "/converses/" + converse_id + "/domains",
    },
    {
      name: "Editor",
      description: "Upravuj konverzku",
      icon: GoRepoTemplate,
      href: "/converses/" + converse_id + "/editor",
    }
  ]);

  return (
    <MainLayout
      additionalItems={additionalItems}
      sidebarShrink={siderbarShrink}
    >
      {children}
    </MainLayout>
  );
}
