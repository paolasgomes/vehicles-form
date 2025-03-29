import { VehicleForm } from "~/components/forms/vehicle";
import type { Route } from "./+types/vehicles";
import { useState } from "react";
import { Button } from "~/components/ui/button";
import { PlusCircle } from "lucide-react";
import { VehiclesTable, type Vehicle } from "~/components/tables/vehicles";
import { api } from "~/services/api";
import { useMutation, useQuery } from "@tanstack/react-query";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "System - Veículos" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Vehicles() {
  const {
    data: vehicles,
    isFetching,
    refetch,
  } = useQuery({
    queryKey: ["vehicles"],
    queryFn: async () => {
      const { data } = await api.get("/vehicles");
      return data;
    },
  });

  const { mutate: create } = useMutation({
    mutationKey: ["createVehicle"],
    mutationFn: async (vehicle: Omit<Vehicle, "id">) => {
      const { clientId, ...rest } = vehicle;

      const { data } = await api.post(`/vehicles?clientId=${clientId}`, rest);

      return data;
    },
    onSuccess: () => refetch(),
  });

  const { mutate: update } = useMutation({
    mutationKey: ["updateVehicle"],
    mutationFn: async (vehicle: Vehicle) => {
      const { clientId, ...rest } = vehicle;

      const { data } = await api.patch(`/vehicles?clientId=${clientId}`, rest);

      return data;
    },
    onSuccess: () => refetch(),
  });

  const { mutate: deleteVehicle } = useMutation({
    mutationKey: ["deleteVehicle"],
    mutationFn: async (id: string) => {
      await api.delete(`/vehicles/${id}`);
    },
    onSuccess: () => refetch(),
  });

  const [editingVehicle, setEditingVehicle] = useState<Vehicle | null>(null);
  const [isFormVisible, setIsFormVisible] = useState(false);

  const handleAddVehicle = (formData: Omit<Vehicle, "id">) => {
    create(formData);
    setIsFormVisible(false);
  };

  const handleUpdateVehicle = (updatedVehicle: Vehicle) => {
    update(updatedVehicle);
    setEditingVehicle(null);
    setIsFormVisible(false);
  };

  const handleDeleteVehicle = (id: string) => deleteVehicle(id);

  const handleEditClick = (vehicle: Vehicle) => {
    setEditingVehicle(vehicle);
    setIsFormVisible(true);
  };

  if (isFetching) {
    return null;
  }

  return (
    <div className="flex flex-col gap-10">
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
