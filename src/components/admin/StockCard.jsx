import { MdDeleteForever, MdEdit } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useAdminContext } from "../../context";
import { db } from "../../constants";
import { deleteDoc, doc } from "firebase/firestore";

export default function Stock({ prod }) {
  const { setProdToEdit, setImgArray, setQuantity } = useAdminContext();
  const navigate = useNavigate();

  const handleEdit = () => {
    console.log(prod);
    setProdToEdit(prod);
    setImgArray(prod.img);
    setQuantity(prod.quantity);
    navigate("/admin/form");
  };

  const handleDelete = () => {
    let answer = confirm(
      `¿Estas seguro que quieres eliminar ${prod.name} de tu stock?`
    );
    if (answer) {
      console.log("Se eliminó", prod.name);
      deleteDoc(doc(db, "Stock", prod.id));
    }
  };

  return (
    <div className="card bg-white flex justify-between flex-1 w-3/4 m-auto py-2 px-4 border-b first:rounded-t last:rounded-b  ">
      <div className="min-w-fit flex flex-col justify-center">
        <a href={prod.img} target="_blank" rel="noopener noreferrer">
          <img src={prod.img[0]} alt="" className="w-36 h-36 object-contain " />
        </a>
      </div>

      <div className="flex flex-col flex-grow justify-between pl-3 pr-2 alin">
        <div>
          <h2 className="font-medium text-xl capitalize">{prod.name}</h2>
        </div>
        <div className="flex flex-col flex-grow  justify-center">
          <div className="flex justify-between flex-wrap">
            <div className="flex flex-grow">
              <span className="font-semibold ">${prod.price}</span>
            </div>

            <div className="flex flex-grow flex-col">
              <span>{prod.quantity} unidades</span>
              <div className="flex flex-wrap ">
                {prod.img.map((url, index) => (
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
    </div>
  );
}
