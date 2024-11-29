import MainLayout from "@/components/layouts/MainLayout";
import { useUser } from "@/contexts/UserContext";
import ISidebarItem from "@/interfaces/sidebar/ISidebarItem";
import { useEffect, useState } from "react";
import { FaCogs, FaHome } from "react-icons/fa";
import { FaNewspaper } from "react-icons/fa6";
import { MdPermMedia } from "react-icons/md";

export default function DashboardPage({
  version,
  isDev,
}: {
  version: string;
  isDev: boolean;
}) {
  const { user, loading } = useUser();
  const [sidebarItems, setSidebarItems] = useState<Array<ISidebarItem>>([
    {
      name: "Dashboard",
      description: "All the important stuff",
      icon: FaHome,
      href: "/admin/dashboard",
    },
    {
      name: "Media",
      description: "List and upload media",
      icon: MdPermMedia,
      href: "/admin/media",
    },
    {
      name: "Conversion pages",
      description: "Manage conversion pages",
      icon: FaNewspaper,
      href: "/admin/editor",
    },
    {
      name: "Settings",
      description: "Manage settings",
      icon: FaCogs,
      href: "/admin/settings",
    },
  ]);

  useEffect(() => {
    if (!user && !loading) {
      window.location.href = "/auth/login";
    }
  }, [user, loading]);

  if (!user) return <div>Loading...</div>;

  const handleLogout = async () => {
    try {
      const result = await user.api.logOut();
      if (result.success) {
        window.location.href = "/auth/login";
      }
    } catch (err) {
      console.log("Could not logout", err);
    }
  };

  return (
    <MainLayout>
      <div className="flex flex-col">
        <div className="w-full p-10 bg-gradient-to-b from-blue-500 to-blue-600">
          {/* responsive max width */}
          <div className="max-w-7xl mx-auto">
            <h1 className="text-2xl md:text-3xl font-bold text-white uppercase">
              Vytvorkonverzku
            </h1>
            <p className="text-white text-sm md:text-md max-w-md">
              Welcome <strong>{user.username}</strong> to{" "}
              <strong>Vytvorkonverzku</strong>! This is a dashboard where you
              can manage your website.
            </p>
          </div>
        </div>
        <div className="w-full bg-white p-10 flex flex-col md:flex-row gap-8">
          <div className="flex flex-row gap-4 items-start">
            <div className="min-w-12 min-h-12 bg-black rounded-lg flex items-center justify-center">
              <FaHome className="text-white text-2xl" />
            </div>
            <div className="flex flex-col">
              <span className="text-md font-semibold">
                Vytvořte bohatý obsah s bloky a vzory
              </span>
              <span className="text-sm text-zinc-400 mt-1">
                Ve vzorech bloků jsou předem nakonfigurovaná rozložení bloků.
                Použijte je k inspiraci nebo bleskově vytvořte nové stránky.
              </span>
              <a href="/admin/editor" className="text-blue-500 mt-1">
                Vytvořit novou stránku
              </a>
            </div>
          </div>
          <div className="flex flex-row gap-4 items-start">
            <div className="min-w-12 min-h-12 bg-black rounded-lg flex items-center justify-center">
              <FaHome className="text-white text-2xl" />
            </div>
            <div className="flex flex-col">
              <span className="text-md font-semibold">
                Vytvořte bohatý obsah s bloky a vzory
              </span>
              <span className="text-sm text-zinc-400 mt-1">
                Ve vzorech bloků jsou předem nakonfigurovaná rozložení bloků.
                Použijte je k inspiraci nebo bleskově vytvořte nové stránky.
              </span>
              <a href="/admin/editor" className="text-blue-500 mt-1">
                Vytvořit novou stránku
              </a>
            </div>
          </div>
          <div className="flex flex-row gap-4 items-start">
            <div className="min-w-12 min-h-12 bg-black rounded-lg flex items-center justify-center">
              <FaHome className="text-white text-2xl" />
            </div>
            <div className="flex flex-col">
              <span className="text-md font-semibold">
                Vytvořte bohatý obsah s bloky a vzory
              </span>
              <span className="text-sm text-zinc-400 mt-1">
                Ve vzorech bloků jsou předem nakonfigurovaná rozložení bloků.
                Použijte je k inspiraci nebo bleskově vytvořte nové stránky.
              </span>
              <a href="/admin/editor" className="text-blue-500 mt-1">
                Vytvořit novou stránku
              </a>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

export async function getServerSideProps() {
  const version = process.env["npm_package_version"];
  const isDev = process.env["NODE_ENV"] === "development";
  return {
    props: {
      is_dev: isDev,
      version: isDev ? "dev" : version,
    },
  };
}
