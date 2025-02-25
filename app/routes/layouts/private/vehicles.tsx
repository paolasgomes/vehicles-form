import { VehicleForm } from "~/components/forms/vehicle";
import type { Route } from "./+types/vehicles";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "System - Veículos" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Vehicles() {
  return (
    <div className="flex-1 flex flex-col gap-10 p-[5%]">
      <h2 className="text-4xl">Cadastre seu veículo</h2>

      <VehicleForm />
    </div>
  );
}
