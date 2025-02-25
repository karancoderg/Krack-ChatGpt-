"use client";

import { useEffect, useState } from "react";
import { getCapsules } from "@/utils/api";
import useAuthStore from "@/store/authStore";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const { user, token, logout } = useAuthStore();
  const [capsules, setCapsules] = useState([]);
  const router = useRouter();

  useEffect(() => {
    if (!token) router.push("/login");

    async function fetchCapsules() {
      try {
        const { data } = await getCapsules(token);
        setCapsules(data);
      } catch {
        alert("Failed to load capsules");
      }
    }

    fetchCapsules();
  }, [token, router]);

  return (
    <div className="p-5">
      <h2 className="text-2xl font-bold">Welcome, {user?.id || "User"}!</h2>
      <button className="bg-red-500 text-white p-2 rounded mt-3" onClick={logout}>Logout</button>
      
      <h3 className="mt-5 text-xl font-semibold">Your Capsules:</h3>
      <ul>
        {capsules.map((capsule: any) => (
          <li key={capsule._id} className="border p-3 mt-2">
            {capsule.title} - {capsule.status}
          </li>
        ))}
      </ul>
    </div>
  );
}
