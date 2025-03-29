import { Outlet } from "react-router";
import { Sidebar } from "~/components/sidebar";

export default function PrivateLayout() {
  return (
    <main className="grid grid-cols-[auto_1fr] h-screen">
      <Sidebar />

      <section className="p-[5%] overflow-y-auto">
        <Outlet />
      </section>
    </main>
  );
}
