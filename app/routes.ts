import {
  type RouteConfig,
  index,
  layout,
  route,
} from "@react-router/dev/routes";

export default [
  index("./routes/login.tsx"),

  layout("./routes/layouts/private/layout.tsx", [
    route("painel/veiculos", "./routes/layouts/private/vehicles.tsx"),
    route("painel/clientes", "./routes/layouts/private/clients.tsx"),
  ]),
] satisfies RouteConfig;
