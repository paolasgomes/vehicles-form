import { ClientsTable, type Client } from "~/components/tables/client";
import { ClientForm } from "~/components/forms/client";
import { useState } from "react";
import type { Route } from "./+types/clients";
import { Button } from "~/components/ui/button";
import { PlusCircle } from "lucide-react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { api } from "~/services/api";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "System - Clientes" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Clients() {
  const {
    data: clients,
    isFetching,
    refetch,
  } = useQuery({
    queryKey: ["clients"],
    queryFn: async () => {
      const { data } = await api.get("/clients");
      return data;
    },
  });

  const { mutate: create } = useMutation({
    mutationKey: ["createClient"],
    mutationFn: async (client: Omit<Client, "id">) => {
      const { data } = await api.post("/clients", client);
      return data;
    },
    onSuccess: () => refetch(),
  });

  const { mutate: update } = useMutation({
    mutationKey: ["updateClient"],
    mutationFn: async (client: Client) => {
      const { data } = await api.patch(`/clients/${client.id}`, client);

      return data;
    },
    onSuccess: () => refetch(),
  });

  const { mutate: deleteClient } = useMutation({
    mutationKey: ["deleteClient"],
    mutationFn: async (id: string) => {
      await api.delete(`/clients/${id}`);
    },
    onSuccess: () => refetch(),
  });

  const [editingClient, setEditingClient] = useState<Client | null>(null);
  const [isFormVisible, setIsFormVisible] = useState(false);

  const handleAddClient = (formData: Omit<Client, "id">) => {
    create(formData);

    setIsFormVisible(false);
  };

  const handleUpdateClient = (updatedClient: Client) => {
    update(updatedClient);

    setEditingClient(null);
    setIsFormVisible(false);
  };

  const handleDeleteClient = (id: string) => deleteClient(id);

  const handleEditClick = (client: Client) => {
    setEditingClient(client);
    setIsFormVisible(true);
  };

  if (isFetching) {
    return null;
  }

  return (
    <div className="flex-1 flex flex-col gap-10">
      <div className="flex items-center justify-between">
        <h2 className="text-4xl">
          {isFormVisible && !editingClient && "Cadastrar cliente"}
          {isFormVisible && editingClient && "Editar cliente"}
          {!isFormVisible && "Lista de Clientes"}
        </h2>

        <Button
          onClick={() => {
            setEditingClient(null);
            setIsFormVisible(!isFormVisible);
          }}
        >
          {isFormVisible ? (
            "Cancelar"
          ) : (
            <>
              <PlusCircle className="mr-2 h-4 w-4" />
              Novo Cliente
            </>
          )}
        </Button>
      </div>

      {isFormVisible ? (
        <ClientForm
          initialData={editingClient || undefined}
          onSubmit={editingClient ? handleUpdateClient : handleAddClient}
        />
      ) : (
        <ClientsTable
          clients={clients}
          onEdit={handleEditClick}
          onDelete={handleDeleteClient}
        />
      )}
    </div>
  );
}
