
export default function DeletePopup({ setState, handleDelete, name }) {
  return (
    <div className="modal-container w-full h-full fixed top-0 left-0 z-10 flex justify-center items-start">
      <div className="modal max-w-md p-4 flex-col bg-white rounded-md shadow-md shadow-slate-400">
        <p>¿Estas seguro que quieres eliminar "{name}" de tu stock?</p>
        <div className=" mt-3 flex justify-end items-center ">
          <button
            className="py-5px px-3 mx-1 bg-white text-blue-600 text-sm rounded-md border hover:bg-blue-50 "
            onClick={() => {
              setState(false);
            }}
          >
            Cancelar
          </button>
          <button
            className="py-1 px-3 mx-1 bg-blue-600 text-white text-sm rounded-md border-4 border-double border-white hover:opacity-90"
            onClick={() => {
              handleDelete();
              setState(false);
            }}
          >
            Aceptar
          </button>
        </div>
      </div>
    </div>
  );
}
