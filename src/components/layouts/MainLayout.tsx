import { useUser } from "@/contexts/UserContext";
import ISidebarItem from "@/interfaces/sidebar/ISidebarItem";
import { useEffect, useState } from "react";
import { FaArrowUp, FaCogs, FaHome } from "react-icons/fa";
import { FaNewspaper } from "react-icons/fa6";
import { MdPermMedia } from "react-icons/md";

export default function MainLayout({
  children,
  additionalItems,
  sidebarShrink,
  childPaddingDisabled,
}: {
  additionalItems?: Array<ISidebarItem>;
  sidebarShrink?: boolean;
  children: React.ReactNode;
  childPaddingDisabled?: boolean;
}) {
  const { user, loading } = useUser();
  const [sidebarItems, setSidebarItems] = useState<Array<ISidebarItem>>([
    {
      name: "Dashboard",
      description: "All the important stuff",
      icon: FaHome,
      href: "/",
    },
    {
      name: "Media",
      description: "List and upload media",
      icon: MdPermMedia,
      href: "/media",
    },
    {
      name: "Conversion pages",
      description: "Manage conversion pages",
      icon: FaNewspaper,
      href: "/converses",
    },
    {
      name: "Settings",
      description: "Manage settings",
      icon: FaCogs,
      href: "/settings",
    },
    ...((additionalItems
      ? additionalItems.map((item) => {
          return { ...item, additional: true };
        })
      : []) as Array<ISidebarItem>),
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
    <div className="flex flex-col min-h-screen w-full">
      {/* Navbar */}
      <nav className="bg-neutral-800 text-white p-4 w-full">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <h1 className="text-lg font-bold uppercase">Vytvorkonverzku</h1>
          </div>
          <div className="flex items-center gap-4">
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

      <div className="flex flex-1 w-full">
        {/* Sidebar */}
        <div className="hidden md:block w-[250px] bg-neutral-800 text-white">
          {sidebarItems
            .filter((item) => !item.additional)
            .map((val, i) => (
              <a
                key={i}
                className={`flex items-center p-4 hover:bg-neutral-700 cursor-pointer gap-4 ${
                  val.href === window.location.pathname
                    ? "bg-neutral-700"
                    : "bg-neutral-800"
                }`}
                href={val.href}
              >
                <val.icon className="text-xl" />
                <div className="flex flex-col">
                  <span className="text-md font-semibold">{val.name}</span>
                  <span className="text-xs text-zinc-400">
                    {val.description}
                  </span>
                </div>
              </a>
            ))}
          <hr className="border-neutral-700 my-4 mx-4" />
          {sidebarItems
            .filter((item) => item.additional)
            .map((val, i) => (
              <a
                key={i}
                className={`flex items-center p-4 hover:bg-neutral-700 cursor-pointer gap-4 ${
                  val.href === window.location.pathname
                    ? "bg-neutral-700"
                    : "bg-neutral-800"
                }`}
                href={val.href}
              >
                <val.icon className="text-xl" />
                <div className="flex flex-col">
                  <span className="text-md font-semibold">{val.name}</span>
                  <span className="text-xs text-zinc-400">
                    {val.description}
                  </span>
                </div>
              </a>
            ))}
        </div>

        {/* Sidebar for Mobile */}
        <div className="md:hidden fixed bottom-0 left-0 w-full flex flex-col z-[9999]">
          <div className="bg-neutral-800 p-2 text-white flex justify-center items-center border border-neutral-700 w-full">
            <div className="flex flex-row items-center gap-2">
              <FaArrowUp className="text-xl" />
              <p className="text-xs">Click to expand</p>
            </div>
          </div>
          <div className="bg-neutral-800 text-white  flex justify-evenly py-4 z-[9999]">
            {sidebarItems
              .filter((item) => !item.additional)
              .map((val, i) => (
                <a
                  key={i}
                  className={`flex flex-col items-center gap-1 hover:text-neutral-100
                ${
                  val.href === window.location.pathname
                    ? "text-neutral-100"
                    : "text-neutral-400"
                }`}
                  href={val.href}
                >
                  <val.icon className="text-xl" />
                  <span className="text-xs font-medium">{val.name}</span>
                </a>
              ))}
          </div>
        </div>
        {/* Main Content */}
        <div
          className={`flex-1 ${!childPaddingDisabled ? "p-8" : "p-2"} bg-gray-100 w-full overflow-y-auto`}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
