import MainLayout from "@/components/layouts/MainLayout";
import { useUser } from "@/contexts/UserContext";
import { useEffect, useState } from "react";
import { FaHome } from "react-icons/fa";

export default function DashboardPage() {
  const { user, loading } = useUser();

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
              Welcome <strong>{user?.username}</strong> to{" "}
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
