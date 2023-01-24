import { Toaster } from "react-hot-toast";
import { Outlet } from "react-router-dom";

export default function Admin() {
  return (
    <section className="flex bg-gray-200 min-h-screen">
      {/* Acá tengo que hacer el login para editar el stock */}
      <Outlet />
      <Toaster/>
    </section>
  );
}
