import { Input } from "app/components/ui/input";
import { Label } from "app/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "app/components/ui/select";
import { Button } from "app/components/ui/button";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import type { Vehicle } from "../tables/vehicles";
import { useQuery } from "@tanstack/react-query";
import { api } from "~/services/api";
import type { Client } from "../tables/client";

type Form = z.infer<typeof formSchema>;

interface VehicleFormProps {
  initialData?: Vehicle;
  onSubmit: (data: any) => void;
}

const formSchema = z.object({
  licensePlate: z.string().min(7, "A placa deve ter pelo menos 7 caracteres"),
  model: z.string().min(1, "O modelo é obrigatório"),
  brand: z.string().min(1, "A marca é obrigatória"),
  yearOfManufacture: z.string().min(1, "Ano de fabricação inválido"),
  color: z.string().min(1, "A cor é obrigatória"),
  chassis: z.string().min(1, "O chassi é obrigatório"),
  renavam: z.string().min(1, "O renavam é obrigatório"),
  fuelType: z
    .string()
    .nonempty("Selecione um tipo de combustível")
    .min(1, "Selecione um tipo de combustível"),
  clientId: z
    .string()
    .nonempty("Selecione um cliente")
    .min(1, "Selecione um cliente"),
});

export function VehicleForm({ initialData, onSubmit }: VehicleFormProps) {
  const { data: clients, isFetching } = useQuery<Client[]>({
    queryKey: ["clients"],
    queryFn: async () => {
      const { data } = await api.get("/clients");
      return data;
    },
  });

  const {
    handleSubmit,
    control,
    formState: { errors },
    register,
  } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      licensePlate: "",
      model: "",
      brand: "",
      yearOfManufacture: "",
      color: "",
      chassis: "",
      renavam: "",
      fuelType: "",
      clientId: "",
    },
  });

  function handleFormSubmit(values: Form) {
    if (initialData) {
      onSubmit({ ...values, id: initialData.id });
    } else {
      onSubmit(values);
    }
  }

  return (
    <form
      className="space-y-4 max-w-md w-full mx-auto h-fit p-4 bg-white shadow rounded-2xl"
      onSubmit={handleSubmit(handleFormSubmit)}
    >
      <div>
        <Label htmlFor="cliente">Cliente</Label>
        <Controller
          name="clientId"
          control={control}
          render={({ field: { onChange, ...field } }) => (
            <Select onValueChange={onChange} disabled={isFetching} {...field}>
              <SelectTrigger>
                <SelectValue
                  placeholder={
                    isFetching ? "Carregando..." : "Selecione um cliente"
                  }
                />
              </SelectTrigger>
              <SelectContent>
                {!isFetching && clients?.length === 0 && (
                  <span className="px-2 py-1.5 text-sm font-semibold">
                    Nenhum cliente encontrado
                  </span>
                )}
                {clients?.map((client) => (
                  <SelectItem key={client.id} value={client.id}>
                    {client.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        />
        {errors.clientId && (
          <span className="mt-1 text-[0.75rem] text-red-500">
            {errors.clientId.message}
          </span>
        )}
      </div>

      <div>
        <Label htmlFor="placa">Placa</Label>
        <Input
          id="placa"
          placeholder="Digite a placa"
          {...register("licensePlate")}
        />

        {errors.licensePlate && (
          <span className="mt-1 text-[0.75rem] text-red-500">
            {errors.licensePlate.message}
          </span>
        )}
      </div>

      <div>
        <Label htmlFor="modelo">Modelo</Label>
        <Input
          id="modelo"
          placeholder="Digite o modelo"
          {...register("model")}
        />
        {errors.model && (
          <span className="mt-1 text-[0.75rem] text-red-500">
            {errors.model.message}
          </span>
        )}
      </div>

      <div>
        <Label htmlFor="marca">Marca</Label>
        <Input id="marca" placeholder="Digite a marca" {...register("brand")} />
        {errors.brand && (
          <span className="mt-1 text-[0.75rem] text-red-500">
            {errors.brand.message}
          </span>
        )}
      </div>

      <div>
        <Label htmlFor="ano">Ano de Fabricação</Label>
        <Input
          id="ano"
          type="number"
          placeholder="Digite o ano"
          {...register("yearOfManufacture")}
        />
        {errors.yearOfManufacture && (
          <span className="mt-1 text-[0.75rem] text-red-500">
            {errors.yearOfManufacture.message}
          </span>
        )}
      </div>

      <div>
        <Label htmlFor="cor">Cor</Label>
        <Input id="cor" placeholder="Digite a cor" {...register("color")} />
        {errors.color && (
          <span className="mt-1 text-[0.75rem] text-red-500">
            {errors.color.message}
          </span>
        )}
      </div>

      <div>
        <Label htmlFor="chassi">Chassis</Label>
        <Input
          id="chassi"
          placeholder="Digite o chassi"
          {...register("chassis")}
        />
        {errors.chassis && (
          <span className="mt-1 text-[0.75rem] text-red-500">
            {errors.chassis.message}
          </span>
        )}
      </div>

      <div>
        <Label htmlFor="renavam">Renavam</Label>
        <Input
          id="renavam"
          placeholder="Digite o Renavam"
          {...register("renavam")}
        />
        {errors.renavam && (
          <span className="mt-1 text-[0.75rem] text-red-500">
            {errors.renavam.message}
          </span>
        )}
      </div>

      <div>
        <Label htmlFor="combustivel">Tipo de Combustível</Label>
        <Controller
          name="fuelType"
          control={control}
          render={({ field: { onChange, ...field } }) => (
            <Select onValueChange={onChange} {...field}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione um tipo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="etanol">Etanol</SelectItem>
                <SelectItem value="gasolina">Gasolina</SelectItem>
                <SelectItem value="flex">Etanol/Gasolina</SelectItem>
                <SelectItem value="diesel">Diesel</SelectItem>
                <SelectItem value="gnv">Gás Natural</SelectItem>
              </SelectContent>
            </Select>
          )}
        />
        {errors.fuelType && (
          <span className="mt-1 text-[0.75rem] text-red-500">
            {errors.fuelType.message}
          </span>
        )}
      </div>

      <Button type="submit" className="w-full">
        Enviar
      </Button>
    </form>
  );
}
