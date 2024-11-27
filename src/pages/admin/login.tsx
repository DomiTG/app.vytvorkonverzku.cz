import { useState } from "react";
import Axios, { AxiosError } from "axios";

export default function LoginPage() {

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>();

  const [username, setUsername] = useState<string | null>();
  const [password, setPassword] = useState<string | null>();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if(loading) return;
    if(!username || !password) {
      setError("Please fill out all fields.");
      return;
    }
    setLoading(true);
    try {
      const { data } = await Axios({
        method: "POST",
        url: "/api/auth/authenticate",
        data: {
          username,
          password,
        },
      });
      if(data.success) {
        window.location.href = "/admin/dashboard";
      }
      setLoading(false);
    } catch(err) {
      if(err instanceof AxiosError) {
        const res = err.response?.data;
        if(!res) return setError("An unknown error occurred.");
        setError(res.message);
        setLoading(false);
      } else {
        setError("An unknown error occurred.");
        setLoading(false);
      }
    }
  }

  return (
    <div className="h-screen w-full flex items-center justify-center bg-gray-100">
      <div className="flex flex-row w-full rounded-lg bg-white overflow-hidden max-w-sm md:max-w-3xl lg:max-w-4xl">
        <div className="flex flex-col w-full lg:w-1/2 p-8">
          <div className="flex flex-col items-start gap-3">
          {error && (
            <div className="bg-red-100 border-l-4 border-red-400 text-red-700 px-4 py-3 relative mb-4 w-full">
              {error}
            </div>
          )}
            <p className="text-xs text-gray-400 uppercase">
              E-Shop system Vytvorkonverzku
            </p>
            <h1 className="text-3xl font-bold text-gray-800 mb-6">
              Vítej zpět! Přihlášení
            </h1>
          </div>
          <form className="space-y-4">
            <div>
              <label
                className="block text-sm font-medium text-gray-600"
                htmlFor="username"
              >
                Přihlašovací jméno
              </label>
              <input
                type="text"
                placeholder="Zadej uživatelské jméno"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-300 focus:border-blue-500 p-2"
                value={username || ""}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div>
              <label
                className="block text-sm font-medium text-gray-600"
                htmlFor="password"
              >
                Heslo
              </label>
              <input
                type="password"
                placeholder="Zadej heslo"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-300 focus:border-blue-500 p-2"
                value={password || ""}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="flex items-end justify-end">
              <a href="#" className="text-sm text-blue-500 hover:underline">
                Forgot password?
              </a>
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 rounded-md transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={loading}
              onClick={handleSubmit}
            >
              Přihlasit se
            </button>
          </form>
        </div>
        <div className="hidden md:w-1/2 bg-blue-50 lg:flex items-center justify-center">
          <img
            src="https://picsum.photos/1400/1000"
            alt="Illustration"
            className="h-full w-full object-cover"
          />
        </div>
      </div>
    </div>
  );
}
