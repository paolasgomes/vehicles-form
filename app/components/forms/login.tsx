import { Input } from "app/components/ui/input";
import { Label } from "app/components/ui/label";
import { Button } from "app/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useNavigate } from "react-router";

import Cookies from "js-cookie";

type Form = z.infer<typeof formSchema>;

const formSchema = z.object({
  usuario: z.string().min(1, "Usuário é obrigatório"),
  senha: z.string().min(1, "Senha é obrigatório"),
});

export function LoginForm() {
  const navigate = useNavigate();

  const {
    handleSubmit,
    control,
    formState: { errors },
    register,
  } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      usuario: "",
      senha: "",
    },
  });

  function onSubmit({ usuario }: Form) {
    Cookies.set("loggedUser", JSON.stringify(usuario));

    navigate("/painel/veiculos");
  }

  return (
    <form
      className="space-y-4 max-w-md w-full mx-auto p-4 bg-white shadow rounded-2xl"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div>
        <Label htmlFor="usuario">Usuário</Label>
        <Input
          id="usuario"
          placeholder="Digite o usuario"
          {...register("usuario")}
        />

        {errors.usuario && (
          <span className="mt-1 text-[0.75rem] text-red-500">
            {errors.usuario.message}
          </span>
        )}
      </div>

      <div>
        <Label htmlFor="senha">Senha</Label>
        <Input id="senha" placeholder="Digite a senha" {...register("senha")} />

        {errors.senha && (
          <span className="mt-1 text-[0.75rem] text-red-500">
            {errors.senha.message}
          </span>
        )}
      </div>

      <Button type="submit" className="w-full">
        Entrar
      </Button>
    </form>
  );
}
