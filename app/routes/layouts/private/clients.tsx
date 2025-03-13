import { ClientsTable, type Client } from "~/components/tables/client";
import { ClientForm } from "~/components/forms/client";
import { useState } from "react";
import type { Route } from "./+types/clients";
import { Button } from "~/components/ui/button";
import { PlusCircle } from "lucide-react";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "System - Clientes" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Clients() {
  const [clients, setClients] = useState<Client[]>([]);
  const [editingClient, setEditingClient] = useState<Client | null>(null);
  const [isFormVisible, setIsFormVisible] = useState(false);

  const handleAddClient = (formData: Omit<Client, "id">) => {
    const newClient = {
      id: crypto.randomUUID(),
      ...formData,
    };

    setClients([...clients, newClient]);
    setIsFormVisible(false);
  };

  const handleUpdateClient = (updatedClient: Client) => {
    setClients(
      clients.map((client) =>
        client.id === updatedClient.id ? updatedClient : client
      )
    );
    setEditingClient(null);
    setIsFormVisible(false);
  };

  const handleDeleteClient = (id: string) => {
    setClients(clients.filter((client) => client.id !== id));
  };

  const handleEditClick = (client: Client) => {
    setEditingClient(client);
    setIsFormVisible(true);
  };

  return (
    <div className="flex-1 flex flex-col gap-10 p-[5%]">
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
