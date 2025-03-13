import { VehicleForm } from "~/components/forms/vehicle";
import type { Route } from "./+types/vehicles";
import { useState } from "react";
import { Button } from "~/components/ui/button";
import { PlusCircle } from "lucide-react";
import { VehiclesTable, type Vehicle } from "~/components/tables/vehicles";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "System - Veículos" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Vehicles() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [editingVehicle, setEditingVehicle] = useState<Vehicle | null>(null);
  const [isFormVisible, setIsFormVisible] = useState(false);

  const handleAddVehicle = (formData: Omit<Vehicle, "id">) => {
    const newVehicle = {
      id: crypto.randomUUID(),
      ...formData,
    };

    setVehicles([...vehicles, newVehicle]);
    setIsFormVisible(false);
  };

  const handleUpdateVehicle = (updatedVehicle: Vehicle) => {
    setVehicles(
      vehicles.map((vehicle) =>
        vehicle.id === updatedVehicle.id ? updatedVehicle : vehicle
      )
    );
    setEditingVehicle(null);
    setIsFormVisible(false);
  };

  const handleDeleteVehicle = (id: string) => {
    setVehicles(vehicles.filter((vehicle) => vehicle.id !== id));
  };

  const handleEditClick = (vehicle: Vehicle) => {
    setEditingVehicle(vehicle);
    setIsFormVisible(true);
  };

  return (
    <div className="flex-1 flex flex-col gap-10 p-[5%]">
      <div className="flex items-center justify-between">
        <h2 className="text-4xl">
          {isFormVisible && !editingVehicle && "Cadastrar veículo"}
          {isFormVisible && editingVehicle && "Editar veículo"}
          {!isFormVisible && "Lista de Veículos"}
        </h2>

        <Button
          onClick={() => {
            setEditingVehicle(null);
            setIsFormVisible(!isFormVisible);
          }}
        >
          {isFormVisible ? (
            "Cancelar"
          ) : (
            <>
              <PlusCircle className="mr-2 h-4 w-4" />
              Novo Veículo
            </>
          )}
        </Button>
      </div>

      {isFormVisible ? (
        <VehicleForm
          initialData={editingVehicle || undefined}
          onSubmit={editingVehicle ? handleUpdateVehicle : handleAddVehicle}
        />
      ) : (
        <VehiclesTable
          vehicles={vehicles}
          onEdit={handleEditClick}
          onDelete={handleDeleteVehicle}
        />
      )}
    </div>
  );
}
