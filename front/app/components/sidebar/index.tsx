import { useEffect, useState } from "react";
import { LogOut, Car, Users, Menu } from "lucide-react";
import { Button } from "../ui/button";
import { useNavigate } from "react-router";
import Cookies from "js-cookie";

export function Sidebar() {
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(true);

  const [userName, setUserName] = useState("");

  function signOut() {
    Cookies.remove("loggedUser");

    navigate("/");
  }

  useEffect(() => {
    const userName = Cookies.get("loggedUser");

    if (!userName) {
      navigate("/");

      return;
    }

    setUserName(JSON.parse(userName));
  }, []);

  return (
    <div
      className={`${
        isOpen ? "w-64" : "w-20"
      } bg-gray-900 text-white flex flex-col transition-all duration-300`}
    >
      <div className="flex items-center justify-between p-4">
        {isOpen && <span className="text-lg font-bold">Painel Admin</span>}
        <Button variant="ghost" onClick={() => setIsOpen(!isOpen)}>
          <Menu className="h-6 w-6" />
        </Button>
      </div>

      <nav className="flex-1 px-4 py-2 space-y-2">
        <Button
          variant="ghost"
          className="w-full flex items-center justify-start gap-3"
          onClick={() => navigate("/painel/clientes")}
        >
          <Users className="h-5 w-5" />
          {isOpen && "Clientes"}
        </Button>

        <Button
          variant="ghost"
          className="w-full flex items-center justify-start gap-3"
          onClick={() => navigate("/painel/veiculos")}
        >
          <Car className="h-5 w-5" />
          {isOpen && "Veículos"}
        </Button>
      </nav>

      <div className="p-4 flex items-center gap-3 mt-auto">
        <div className="flex-1">
          {isOpen && <span className="text-sm font-semibold">{userName}</span>}
        </div>
        <Button variant="ghost" onClick={signOut}>
          <LogOut className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
}
