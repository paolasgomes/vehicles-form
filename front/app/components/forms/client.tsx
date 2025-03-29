import { Input } from "app/components/ui/input";
import { Label } from "app/components/ui/label";
import { Button } from "app/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import type { Client } from "../tables/client";

interface ClientFormProps {
  initialData?: Client;
  onSubmit: (data: any) => void;
}

type Form = z.infer<typeof formSchema>;

const formSchema = z.object({
  name: z.string().min(1, "O nome é obrigatório"),
  cpf: z.string().min(11, "O CPF deve ter 11 caracteres"),
  phone: z.string().min(10, "O telefone deve ter pelo menos 10 dígitos"),
  email: z.string().email("E-mail inválido"),
  address: z.string().min(1, "O endereço é obrigatório"),
});

export function ClientForm({ initialData, onSubmit }: ClientFormProps) {
  const {
    handleSubmit,
    control,
    formState: { errors },
    register,
  } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      name: "",
      cpf: "",
      phone: "",
      email: "",
      address: "",
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
      className="space-y-4 max-w-md w-full mx-auto p-4 bg-white shadow rounded-2xl"
      onSubmit={handleSubmit(handleFormSubmit)}
    >
      <div>
        <Label htmlFor="nome">Nome</Label>
        <Input id="nome" placeholder="Digite o nome" {...register("name")} />
        {errors.name && (
          <span className="mt-1 text-[0.75rem] text-red-500">
            {errors.name.message}
          </span>
        )}
      </div>

      <div>
        <Label htmlFor="cpf">CPF</Label>
        <Input id="cpf" placeholder="Digite o CPF" {...register("cpf")} />
        {errors.cpf && (
          <span className="mt-1 text-[0.75rem] text-red-500">
            {errors.cpf.message}
          </span>
        )}
      </div>

      <div>
        <Label htmlFor="telefone">Telefone</Label>
        <Input
          id="telefone"
          placeholder="Digite o telefone"
          {...register("phone")}
        />
        {errors.phone && (
          <span className="mt-1 text-[0.75rem] text-red-500">
            {errors.phone.message}
          </span>
        )}
      </div>

      <div>
        <Label htmlFor="email">E-mail</Label>
        <Input
          id="email"
          placeholder="Digite o e-mail"
          {...register("email")}
        />
        {errors.email && (
          <span className="mt-1 text-[0.75rem] text-red-500">
            {errors.email.message}
          </span>
        )}
      </div>

      <div>
        <Label htmlFor="endereco">Endereço</Label>
        <Input
          id="endereco"
          placeholder="Digite o endereço"
          {...register("address")}
        />
        {errors.address && (
          <span className="mt-1 text-[0.75rem] text-red-500">
            {errors.address.message}
          </span>
        )}
      </div>

      <Button type="submit" className="w-full">
        Enviar
      </Button>
    </form>
  );
}
