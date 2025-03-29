"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";

import { Edit, MoreHorizontal, Trash2 } from "lucide-react";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import type { Client } from "./client";

export type Vehicle = {
  id: string;
  licensePlate: string;
  model: string;
  brand: string;
  yearOfManufacture: string;
  color: string;
  chassis: string;
  renavam: string;
  fuelType: string;
  clientId: string;
};

interface VehicleTableProps {
  vehicles: Vehicle[];
  onEdit?: (vehicle: Vehicle & { client?: Client }) => void;
  onDelete?: (id: string) => void;
}

export function VehiclesTable({
  vehicles,
  onEdit,
  onDelete,
}: VehicleTableProps) {
  return (
    <div className="rounded-md border bg-white">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Placa</TableHead>
            <TableHead>Modelo</TableHead>
            <TableHead>Marca</TableHead>
            <TableHead className="hidden md:table-cell">Ano</TableHead>
            <TableHead className="hidden md:table-cell">Cor</TableHead>
            <TableHead className="hidden lg:table-cell">Chassi</TableHead>
            <TableHead className="hidden lg:table-cell">Renavam</TableHead>
            <TableHead className="hidden md:table-cell">Combustível</TableHead>
            <TableHead className="w-[80px]">Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {vehicles.length === 0 ? (
            <TableRow>
              <TableCell colSpan={9} className="h-24 text-center">
                Nenhum veículo cadastrado.
              </TableCell>
            </TableRow>
          ) : (
            vehicles.map((vehicle) => (
              <TableRow key={vehicle.id}>
                <TableCell className="font-medium">
                  {vehicle.licensePlate}
                </TableCell>
                <TableCell>{vehicle.model}</TableCell>
                <TableCell>{vehicle.brand}</TableCell>
                <TableCell className="hidden md:table-cell">
                  {vehicle.yearOfManufacture}
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  {vehicle.color}
                </TableCell>
                <TableCell className="hidden lg:table-cell">
                  {vehicle.chassis}
                </TableCell>
                <TableCell className="hidden lg:table-cell">
                  {vehicle.renavam}
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  {formatCombustivel(vehicle.fuelType)}
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Abrir menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Ações</DropdownMenuLabel>
                      <DropdownMenuItem
                        onClick={() => onEdit && onEdit(vehicle)}
                        className="cursor-pointer"
                      >
                        <Edit className="mr-2 h-4 w-4" />
                        Editar
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => onDelete && onDelete(vehicle.id)}
                        className="cursor-pointer text-destructive"
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Excluir
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}

function formatCombustivel(combustivel: string): string {
  const options: Record<string, string> = {
    etanol: "Etanol",
    gasolina: "Gasolina",
    flex: "Etanol/Gasolina",
    diesel: "Diesel",
    gnv: "Gás Natural",
  };

  return options[combustivel] || combustivel;
}
