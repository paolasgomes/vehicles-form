import { LoginForm } from "~/components/forms/login";
import type { Route } from "./+types/login";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "System - Login" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Login() {
  return (
    <main className="min-h-screen flex items-center w-full">
      <div className="flex flex-col flex-1 items-center gap-14">
        <h1 className="text-4xl">System - Log in</h1>

        <LoginForm />
      </div>
    </main>
  );
}
