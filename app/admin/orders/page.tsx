"use client";
export const dynamic = 'force-dynamic';
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createBrowserClient } from "@/lib/supabase-browser";

export default function AdminOrders() {
  const router = useRouter();
  const [orders, setOrders] = useState<any[]>([]);
  const supabase = createBrowserClient();

  useEffect(() => {
    if (localStorage.getItem("admin_auth") !== "true") { router.push("/admin"); return; }
    load();
  }, []);

  const load = async () => {
    const { data } = await supabase.from("orders").select("*").order("created_at", { ascending: false });
    setOrders(data || []);
  };

  const updateStatus = async (id: string, status: string) => {
    await supabase.from("orders").update({ status }).eq("id", id);
    load();
  };

  return (
    <div className="min-h-screen bg-beige dark:bg-dark pt-16">
      <div className="max-w-5xl mx-auto px-6 py-16">
        <div className="flex items-center gap-4 mb-10">
          <button onClick={()=>router.push("/admin")} className="text-xs text-dark/50 dark:text-beige/50 hover:text-forest dark:hover:text-rose">← Back</button>
          <p className="font-serif text-4xl text-forest dark:text-beige">Orders</p>
        </div>
        {orders.length === 0 ? (
          <p className="text-dark/50 dark:text-beige/50">No orders yet.</p>
        ) : (
          <div className="flex flex-col gap-4">
            {orders.map(o => (
              <div key={o.id} className="border border-forest/10 dark:border-beige/10 p-6">
                <div className="flex items-start justify-between gap-4 flex-wrap">
                  <div>
                    <p className="font-serif text-xl text-dark dark:text-beige">{o.buyer_name}</p>
                    <p className="text-sm text-dark/60 dark:text-beige/60">{o.buyer_email}</p>
                    <p className="text-sm text-dark/60 dark:text-beige/60 mt-1">{o.artwork_title} · ₹{o.amount?.toLocaleString()}</p>
                    <p className="text-xs text-dark/40 dark:text-beige/40 mt-1">{new Date(o.created_at).toLocaleDateString("en-IN")}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`text-xs px-3 py-1 ${o.status==="Paid"?"bg-forest/20 text-forest":o.status==="Shipped"?"bg-teal/20 text-teal":o.status==="Cancelled"?"bg-red-100 text-red-500":"bg-beige dark:bg-darksurface text-dark/60 dark:text-beige/60"}`}>
                      {o.status || "Pending"}
                    </span>
                    <select value={o.status || "Pending"} onChange={e=>updateStatus(o.id,e.target.value)}
                      className="text-xs bg-beige dark:bg-dark border border-forest/20 dark:border-beige/20 text-dark dark:text-beige px-2 py-1 focus:outline-none">
                      <option>Pending</option><option>Paid</option><option>Shipped</option><option>Cancelled</option>
                    </select>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
