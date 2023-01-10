import { db } from "../constants";
import { doc, updateDoc, setDoc } from "firebase/firestore";
import { useAdminContext } from "../context";
import {
  InputPriceCustom,
  InputFileCustom,
  InputQuantityCustom,
} from "../components";

export default function AdminForm() {
  const {
    categories,
    setPriceOk,
    quantity,
    setQuantity,
    prodToEdit,
    setProdToEdit,
    imgArray,
    setImgArray,
  } = useAdminContext();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (prodToEdit) {
      const prodRef = doc(db, `Stock/${prodToEdit.id}`);
      updateDoc(prodRef, {
        ...prodToEdit,
        name: e.target.name.value.trim(),
        category: e.target.category.value,
        description: e.target.description.value.trim(),
        price: e.target.price.value.trim(),
        quantity: quantity,
        img: imgArray,
      });
      setProdToEdit(null);
    } else {
      const stockRef = doc(db, "Stock", `${e.target.name.value}`);
      setDoc(stockRef, {
        name: e.target.name.value.trim(),
        category: e.target.category.value,
        description: e.target.description.value.trim(),
        price: e.target.price.value.trim(),
        quantity: quantity,
        img: imgArray,
      });
    }

    e.target.name.value = "";
    e.target.price.value = "";
    e.target.description.value = "";
    e.target.category.value = "";
    setImgArray([]);
    setQuantity(1);
    setPriceOk(true);
  };

  return (
    <form
      className="p-2 flex flex-col flex-1 min-h-screen bg-slate-400 pl-40"
      onSubmit={handleSubmit}
    >
      <label htmlFor="name">Nombre del producto</label>
      <input
        type="text"
        id="name"
        placeholder="Producto"
        className="border-2 my-2 "
        defaultValue={prodToEdit ? prodToEdit.name : ""}
        required
      />
      <label htmlFor="category">Selecciona una categoría</label>
      <select
        id="category"
        aria-placeholder="Categoría"
        className="border-2 my-2"
        defaultValue={prodToEdit ? prodToEdit.category : ""}
        required
      >
        <option value=""></option>
        {categories.sort().map((elem) => (
          <option key={elem} value={elem}>
            {elem}
          </option>
        ))}
      </select>
      <div className="flex justify-center my-2">
        <div className="flex flex-wrap items-center justify-between w-full sm:w-3/4 md-920-w-66 lg:w-3/5 ">
          <InputPriceCustom />
          <InputQuantityCustom />
        </div>
      </div>

      <label htmlFor="description">Descripcion</label>
      <textarea
        name=""
        id="description"
        cols="30"
        rows="3"
        className="border-2 my-2"
        defaultValue={prodToEdit ? prodToEdit.description : ""}
      ></textarea>
      <InputFileCustom />
      <button
        type="submit"
        className="w-fit my-2 px-2 py-1 text-white bg-blue-600"
      >
        {prodToEdit ? "Editar" : "Guardar"}
      </button>
    </form>
  );
}
