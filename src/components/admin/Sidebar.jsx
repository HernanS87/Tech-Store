import { Link } from "react-router-dom";
import { useAdminContext } from "../../context";

export default function Sidebar() {
  const { setProdToEdit, setImgArray } = useAdminContext();
  return (
    <div className="bg-gray-700 text-white h-screen fixed">
      <ul className="h-full flex flex-col w-36">
        <li className="px-2 my-2 text-center">
          <img src="" alt="" />
        </li>
        <li className="px-2 my-2 text-center">
          <Link
            to="/admin/stock"
            onClick={() => {
              setProdToEdit(null);
              setImgArray([]);
            }}
          >
            Productos
          </Link>
        </li>
        <li className="px-2 my-2 text-center">
          <Link to="/admin/form">Añadir Producto</Link>
        </li>
        <li className="px-2 my-2 text-center">
          <button>Cerrar</button>
        </li>
      </ul>
    </div>
  );
}
