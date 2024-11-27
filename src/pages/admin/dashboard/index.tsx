import { useUser } from "@/contexts/UserContext";
import { useEffect } from "react";

export default function DashboardPage({ version }: { version: string }) {
  const { user, loading } = useUser();

  useEffect(() => {
    if (!user && !loading) {
      window.location.href = "/login";
    }
  }, [user, loading]);

  if (!user) return <div>Loading...</div>;

  const handleLogout = async () => {
    try {
        const result = await user.api.logOut();
        if(result.success) {
            window.location.href = "/admin/login";
        }
    } catch(err) {
        console.log('Could not logout', err);
    }
  }

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
            <button className="border border-neutral-700 rounded-lg px-2 py-1 font-semibold uppercase text-xs hover:bg-neutral-700 focus:outline-none focus:ring-2 focus:ring-neutral-500" onClick={handleLogout}>
                Logout
            </button>
          </div>
        </div>
      </nav>
      <div className="flex flex-row flex-1">
        <div className="w-[250px] bg-neutral-800 text-white">
        </div>
        <div className="flex-1 p-4 bg-gray-100"></div>
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