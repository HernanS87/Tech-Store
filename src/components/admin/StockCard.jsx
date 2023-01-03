import { MdDeleteForever, MdEdit } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useAdminContext } from "../../context";

export default function Stock({ prod }) {
  const { setProdToEdit } = useAdminContext();
  const navigate = useNavigate();
  const handleClick = () => {
    console.log(prod);
    setProdToEdit(prod);
    navigate('/admin/form')
  };

  return (
    <div className="card bg-white flex justify-between flex-1 w-3/4 m-auto py-2 px-4 border-b first:rounded-t last:rounded-b  ">
      <div className="min-w-fit flex flex-col justify-center">
        <img src={prod.img} alt="" className="w-36 h-36 object-contain " />
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

            <div className="flex flex-grow">
              <span>5 unidades</span>
            </div>
          </div>
        </div>
      </div>

      <div className="w-16 flex justify-between">
        <MdEdit size={25} className="text-blue-700 " onClick={handleClick} />
        <MdDeleteForever
          size={30}
          className="text-blue-700"
          onClick={handleClick}
        />
      </div>
    </div>
  );
}
