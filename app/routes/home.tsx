import VehicleForm from "~/components/form";
import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {
  return (
    <main className="min-h-screen flex items-center w-full">
      <VehicleForm />
    </main>
  );
}
