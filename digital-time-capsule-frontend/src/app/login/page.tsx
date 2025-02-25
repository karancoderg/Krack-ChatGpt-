"use client";

import { useState } from "react";
import { loginUser } from "@/utils/api";
import useAuthStore from "@/store/authStore";
import { useRouter } from "next/navigation";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const { login } = useAuthStore();
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { data } = await loginUser(form);
      login(data.token);
      router.push("/dashboard");
    } catch (err: any) {
      alert(err.response?.data?.error || "Login failed");
    }
  };

  return (
    <div className="flex flex-col items-center mt-10">
      <h2 className="text-2xl font-bold">Login</h2>
      <form className="mt-5 flex flex-col gap-3 w-80" onSubmit={handleSubmit}>
        <input name="email" type="email" placeholder="Email" className="border p-2" onChange={handleChange} />
        <input name="password" type="password" placeholder="Password" className="border p-2" onChange={handleChange} />
        <button className="bg-blue-500 text-white p-2 rounded">Login</button>
      </form>
    </div>
  );
}
