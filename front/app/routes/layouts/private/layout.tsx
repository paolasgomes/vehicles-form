import { Outlet } from "react-router";
import { Sidebar } from "~/components/sidebar";

export default function PrivateLayout() {
  return (
    <main className="h-screen flex w-full">
      <Sidebar />

      <div className="max-h-screen overflow-y-scroll w-full">
        <Outlet />
      </div>
    </main>
  );
}
