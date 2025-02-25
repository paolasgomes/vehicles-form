import type { Route } from "./+types/vehicles";
import { ClientForm } from "~/components/forms/client";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "System - Clientes" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Clients() {
  return (
    <div className="flex-1 flex flex-col gap-10 p-[5%]">
      <h2 className="text-4xl">Cadastre seu cliente</h2>

      <ClientForm />
    </div>
  );
}
