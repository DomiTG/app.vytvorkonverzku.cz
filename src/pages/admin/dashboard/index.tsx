import { useUser } from "@/contexts/UserContext";
import ISidebarItem from "@/interfaces/sidebar/ISidebarItem";
import { useEffect, useState } from "react";
import { BsGraphUp } from "react-icons/bs";
import { FaCogs, FaHome, FaStar } from "react-icons/fa";
import { FaNewspaper } from "react-icons/fa6";
import { MdPermMedia } from "react-icons/md";

export default function DashboardPage({ version }: { version: string }) {
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
      name: "Ratings",
      description: "Manage customer ratings",
      icon: FaStar,
      href: "/admin/ratings",
    },
    {
      name: "Analytics",
      description: "How many orders?",
      icon: BsGraphUp,
      href: "/admin/analytics",
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
      window.location.href = "/admin/login";
    }
  }, [user, loading]);

  if (!user) return <div>Loading...</div>;

  const handleLogout = async () => {
    try {
      const result = await user.api.logOut();
      if (result.success) {
        window.location.href = "/admin/login";
      }
    } catch (err) {
      console.log("Could not logout", err);
    }
  };

  return (
    <div className="flex flex-col min-h-screen w-full">
      <nav className="bg-neutral-800 text-white p-4">
        <div className="flex flex-row items-center justify-between">
          <div className="flex flex-row items-center">
            <h1 className="text-lg font-bold uppercase">Vytvorkonverzku</h1>
            <span className="text-xs ml-1">v{version}</span>
          </div>
          <div className="flex flex-row items-center gap-4">
            <span className="font-semibold uppercase">{user.username}</span>
            <button
              className="border border-neutral-700 rounded-lg px-2 py-1 font-semibold uppercase text-xs hover:bg-neutral-700 focus:outline-none focus:ring-2 focus:ring-neutral-500"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        </div>
      </nav>
      <div className="flex flex-row flex-1">
        <div className="w-[250px] bg-neutral-800 text-white">
          {sidebarItems.map((val, i) => {
            return (
              <div
                key={i}
                className={`flex flex-row items-center p-4 hover:bg-neutral-700 cursor-pointer gap-4 ${
                  val.href === window.location.pathname
                    ? "bg-neutral-700"
                    : "bg-neutral-800"
                }`}
              >
                <val.icon className="text-xl" />
                <div className="flex flex-col">
                  <span className="text-md font-semibold">{val.name}</span>
                  <span className="text-xs text-zinc-400">
                    {val.description}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
        <div className="flex-1 p-10 bg-gray-100">
          <div className="flex flex-col">
            <div className="w-full p-10 bg-gradient-to-b from-blue-500 to-blue-600">
              {/* responsive max width */}
              <div className="max-w-7xl mx-auto">
                <h1 className="text-3xl font-bold text-white uppercase">
                  Vytvorkonverzku
                </h1>
                <p className="text-white">
                  Welcome <strong>{user.username}</strong> to{" "}
                  <strong>Vytvorkonverzku</strong>! This is a dashboard where
                  you can manage your website.
                </p>
              </div>
            </div>
            <div className="w-full bg-white p-10 flex flex-row gap-8">
              <div className="flex flex-row gap-2 items-start">
                <div className="min-w-12 min-h-12 bg-black rounded-lg flex items-center justify-center">
                  <FaHome className="text-white text-2xl" />
                </div>
                <div className="flex flex-col">
                  <span className="text-md font-semibold">
                    Vytvořte bohatý obsah s bloky a vzory
                  </span>
                  <span className="text-sm text-zinc-400">
                    Ve vzorech bloků jsou předem nakonfigurovaná rozložení
                    bloků. Použijte je k inspiraci nebo bleskově vytvořte nové
                    stránky.
                  </span>
                  <a href="/admin/editor" className="text-blue-500">
                    Vytvořit novou stránku
                  </a>
                </div>
              </div>
              <div className="flex flex-row gap-2 items-start">
                <div className="min-w-12 min-h-12 bg-black rounded-lg flex items-center justify-center">
                  <FaHome className="text-white text-2xl" />
                </div>
                <div className="flex flex-col">
                  <span className="text-md font-semibold">
                    Vytvořte bohatý obsah s bloky a vzory
                  </span>
                  <span className="text-sm text-zinc-400">
                    Ve vzorech bloků jsou předem nakonfigurovaná rozložení
                    bloků. Použijte je k inspiraci nebo bleskově vytvořte nové
                    stránky.
                  </span>
                  <a href="/admin/editor" className="text-blue-500">
                    Vytvořit novou stránku
                  </a>
                </div>
              </div>
              <div className="flex flex-row gap-2 items-start">
                <div className="min-w-12 min-h-12 bg-black rounded-lg flex items-center justify-center">
                  <FaHome className="text-white text-2xl" />
                </div>
                <div className="flex flex-col">
                  <span className="text-md font-semibold">
                    Vytvořte bohatý obsah s bloky a vzory
                  </span>
                  <span className="text-sm text-zinc-400">
                    Ve vzorech bloků jsou předem nakonfigurovaná rozložení
                    bloků. Použijte je k inspiraci nebo bleskově vytvořte nové
                    stránky.
                  </span>
                  <a href="/admin/editor" className="text-blue-500">
                    Vytvořit novou stránku
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps() {
  const version = process.env["npm_package_version"];
  return {
    props: {
      version: version,
    },
  };
}
