import React, { useState } from "react";
import Axios, { AxiosError } from "axios";

export default function CreateUserPage() {
  const [loading, setLoading] = useState<boolean>(false);

  const [email, setEmail] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: HTMLFormElement) => {
    e.preventDefault();
    if (loading) return;
    if (!email || !username || !password) {
      setError("Please fill out all fields.");
      return;
    }
    setLoading(true);
    try {
      const { data } = await Axios({
        method: "POST",
        url: "/api/setup/createAccount",
        data: {
          email_address: email,
          username,
          password,
        },
      });
      if (data.success) {
        window.location.href = "/admin/login";
      }
      setLoading(false);
    } catch (err) {
      if (err instanceof AxiosError) {
        const res = err.response?.data;
        if (!res) return setError("An unknown error occurred.");
        setError(res.message);
        setLoading(false);
      } else {
        setError("An unknown error occurred.");
        setLoading(false);
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-lg p-8 bg-white shadow-lg rounded-lg">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800">SETUP</h1>
          <p className="text-gray-500">
            Create a new user to get started with your website.
          </p>
        </div>
        <form className="mt-6">
          {error && (
            <div className="bg-red-100 border-l-4 border-red-400 text-red-700 px-4 py-3 relative mb-4">
              {error}
            </div>
          )}
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Your Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="you@example.com"
              className="mt-1 block w-full border-b border-gray-300  focus:ring-blue-500 focus:border-blue-500 p-2"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              placeholder="e.g., admin123"
              className="mt-1 block w-full border-b border-gray-300  focus:ring-blue-500 focus:border-blue-500 p-2"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="********"
              className="mt-1 block w-full border-b border-gray-300  focus:ring-blue-500 focus:border-blue-500 p-2"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <p className="mt-1 text-sm text-gray-500">
              Use a strong password to keep your account secure.
            </p>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={loading}
            onClick={handleSubmit}
          >
            Create User
          </button>
        </form>
      </div>
    </div>
  );
}
