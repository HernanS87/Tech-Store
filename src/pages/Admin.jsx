import { Outlet } from "react-router-dom";

export default function Admin() {
  return (
    <section className="flex bg-gray-200 w-screen min-h-screen">
      {/* Acá tengo que hacer el login para editar el stock */}
      <Outlet/>
    </section>
  );
}
