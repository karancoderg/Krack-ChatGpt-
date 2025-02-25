"use client";

import { useState } from "react";
import { registerUser } from "@/utils/api";
import { useRouter } from "next/navigation";

export default function Signup() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await registerUser(form);
      router.push("/login");
    } catch (err: any) {
      alert(err.response?.data?.error || "Signup failed");
    }
  };

  return (
    <div className="flex flex-col items-center mt-10">
      <h2 className="text-2xl font-bold">Sign Up</h2>
      <form className="mt-5 flex flex-col gap-3 w-80" onSubmit={handleSubmit}>
        <input name="name" placeholder="Name" className="border p-2" onChange={handleChange} />
        <input name="email" type="email" placeholder="Email" className="border p-2" onChange={handleChange} />
        <input name="password" type="password" placeholder="Password" className="border p-2" onChange={handleChange} />
        <button className="bg-blue-500 text-white p-2 rounded">Register</button>
      </form>
    </div>
  );
}
