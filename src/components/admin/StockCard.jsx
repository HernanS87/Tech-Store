import { MdDeleteForever, MdEdit } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useAdminContext } from "../../context";
import { db } from "../../constants";
import { deleteDoc, doc } from "firebase/firestore";
import { toast, Toaster } from "react-hot-toast";

export default function Stock({ prod }) {
  const { setDetailPopup, setForm } = useAdminContext();
  const navigate = useNavigate();

  const handleEdit = () => {
    console.log(prod);
    setForm(prod);
    navigate("/admin/form");
  };

  const handleDelete = () => {
    let answer = confirm(
      `¿Estas seguro que quieres eliminar ${prod.name} de tu stock?`
    );
    // let answer = false;
    // toast.custom(
    //   <div className="bg-white">
    //     ¿Estas seguro que quieres eliminar ${prod.name} de tu stock?
    //     <button
    //       onClick={() => {
    //         answer = true;
    //         toast.dismiss()
    //       }}
    //     >
    //       Aceptar
    //     </button>
    //     <button onClick={() => {
    //       toast.dismiss()
    //     }}>Cancelar</button>
    //   </div>
    // );
    if (answer) {
      console.log("Se eliminó", prod.name);
      toast.error(`Eliminaste "${prod.name}" de tu stock`, {
        duration: 3000,
        position: "top-center",
        className: "bg-red-400 text-white ",
      });
      deleteDoc(doc(db, "Stock", prod.id));
    }
  };

  return (
    <div className="card bg-white flex justify-between flex-1 w-3/4 m-auto py-2 px-4 border-b first:rounded-t last:rounded-b  ">
      <div className="min-w-fit flex flex-col justify-center">
        <img
          src={prod.images[0]}
          alt=""
          className="w-36 h-36 object-contain "
        />
      </div>

      <div className="flex flex-col flex-grow justify-between pl-3 pr-2 alin">
        <div>
          <h2
            className="font-medium text-xl w-fit cursor-pointer capitalize hover:text-blue-900"
            onClick={() => {
              setDetailPopup({
                ...prod,
                ok: true,
              });
            }}
          >
            {prod.name}
          </h2>
        </div>
        <div className="flex flex-col flex-grow pt-3">
          <div className="flex justify-between flex-wrap">
            <div className="flex flex-grow">
              {!prod.offer ? (
                <span className="font-semibold ">
                  $ {new Intl.NumberFormat("es-AR").format(prod.price)}
                </span>
              ) : (
                <div>
                  <p className="text-xs text-gray-600 line-through">
                    $ {new Intl.NumberFormat("es-AR").format(prod.price)}
                  </p>
                  <div className="flex items-center">
                    <p className="font-semibold">
                      ${" "}
                      {new Intl.NumberFormat("es-AR").format(
                        Math.floor(prod.price * (1 - prod.percent / 100))
                      )}
                    </p>
                    <span className="text-xs font-medium text-green-500 ml-2">
                      {prod.percent}% OFF
                    </span>
                  </div>
                </div>
              )}
            </div>

            <div className="flex flex-grow flex-col">
              <span>
                {prod.quantity > 1 ? `${prod.quantity} unidades` : "1 unidad"}
              </span>
              <div className="flex flex-wrap ">
                {prod.images.map((url, index) => (
                  <img
                    key={index}
                    src={url}
                    alt=""
                    className="w-10 h-10 object-contain rounded-full bg-purple-300 m-1 "
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="w-16 flex justify-between">
        <MdEdit
          size={25}
          className="text-blue-700 cursor-pointer"
          onClick={handleEdit}
        />
        <MdDeleteForever
          size={30}
          className="text-blue-700 cursor-pointer"
          onClick={handleDelete}
        />
      </div>
      {/* <Toaster/> */}
    </div>
  );
}
