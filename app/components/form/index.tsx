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

type Form = z.infer<typeof formSchema>;

const formSchema = z.object({
  placa: z.string().min(7, "A placa deve ter pelo menos 7 caracteres"),
  modelo: z.string().min(1, "O modelo é obrigatório"),
  marca: z.string().min(1, "A marca é obrigatória"),
  anoFabricacao: z.string().min(1, "Ano de fabricação inválido"),
  cor: z.string().min(1, "A cor é obrigatória"),
  chassi: z.string().min(1, "O chassi é obrigatório"),
  renavam: z.string().min(1, "O renavam é obrigatório"),
  combustivel: z
    .string()
    .nonempty("Selecione um tipo de combustível")
    .min(1, "Selecione um tipo de combustível"),
});

export default function VehicleForm() {
  const {
    handleSubmit,
    control,
    formState: { errors },
    register,
  } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      placa: "",
      modelo: "",
      marca: "",
      cor: "",
      chassi: "",
      renavam: "",
      combustivel: "",
      anoFabricacao: "",
    },
  });

  function onSubmit(values: Form) {
    console.log(values);
  }

  return (
    <form
      className="space-y-4 max-w-md w-full mx-auto p-4 bg-white shadow-md rounded-2xl"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div>
        <Label htmlFor="placa">Placa</Label>
        <Input id="placa" placeholder="Digite a placa" {...register("placa")} />

        {errors.placa && (
          <span className="mt-1 text-[0.75rem] text-red-500">
            {errors.placa.message}
          </span>
        )}
      </div>

      <div>
        <Label htmlFor="modelo">Modelo</Label>
        <Input
          id="modelo"
          placeholder="Digite o modelo"
          {...register("modelo")}
        />
        {errors.modelo && (
          <span className="mt-1 text-[0.75rem] text-red-500">
            {errors.modelo.message}
          </span>
        )}
      </div>

      <div>
        <Label htmlFor="marca">Marca</Label>
        <Input id="marca" placeholder="Digite a marca" {...register("marca")} />
        {errors.marca && (
          <span className="mt-1 text-[0.75rem] text-red-500">
            {errors.marca.message}
          </span>
        )}
      </div>

      <div>
        <Label htmlFor="ano">Ano de Fabricação</Label>
        <Input
          id="ano"
          type="number"
          placeholder="Digite o ano"
          {...register("anoFabricacao")}
        />
        {errors.anoFabricacao && (
          <span className="mt-1 text-[0.75rem] text-red-500">
            {errors.anoFabricacao.message}
          </span>
        )}
      </div>

      <div>
        <Label htmlFor="cor">Cor</Label>
        <Input id="cor" placeholder="Digite a cor" {...register("cor")} />
        {errors.cor && (
          <span className="mt-1 text-[0.75rem] text-red-500">
            {errors.cor.message}
          </span>
        )}
      </div>

      <div>
        <Label htmlFor="chassi">Chassi</Label>
        <Input
          id="chassi"
          placeholder="Digite o chassi"
          {...register("chassi")}
        />
        {errors.chassi && (
          <span className="mt-1 text-[0.75rem] text-red-500">
            {errors.chassi.message}
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
          name="combustivel"
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
        {errors.combustivel && (
          <span className="mt-1 text-[0.75rem] text-red-500">
            {errors.combustivel.message}
          </span>
        )}
      </div>

      <Button type="submit" className="w-full">
        Enviar
      </Button>
    </form>
  );
}
