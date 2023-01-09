import { db } from "../constants";
import { doc, updateDoc, setDoc } from "firebase/firestore";
import { useAdminContext } from "../context";
import { InputFileCustom, InputQuantityCustom } from "../components";

export default function AdminForm() {
  const {
    categories,
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
        name: e.target.name.value,
        category: e.target.category.value,
        description: e.target.description.value,
        price: e.target.price.value,
        quantity: quantity,
        img: imgArray,
      });
      setProdToEdit(null);
    } else {
      const stockRef = doc(db, "Stock", `${e.target.name.value}`);
      setDoc(stockRef, {
        name: e.target.name.value,
        category: e.target.category.value,
        description: e.target.description.value,
        price: e.target.price.value,
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
        required
        placeholder="Producto"
        className="border-2 my-2 "
        defaultValue={prodToEdit ? prodToEdit.name : ""}
      />
      <label htmlFor="category">Selecciona una categoría</label>
      <select
        id="category"
        required
        aria-placeholder="Categoría"
        className="border-2 my-2"
        defaultValue={prodToEdit ? prodToEdit.category : ""}
      >
        <option value=""></option>
        {categories.sort().map((elem) => (
          <option key={elem} value={elem}>
            {elem}
          </option>
        ))}
      </select>
      <label htmlFor="price">Precio</label>
      <input
        type="number"
        id="price"
        required
        placeholder="$ARS"
        className="border-2 my-2"
        defaultValue={prodToEdit ? prodToEdit.price : ""}
      />
      <label htmlFor="description">Descripcion</label>
      <textarea
        name=""
        id="description"
        cols="30"
        rows="3"
        className="border-2 my-2"
        defaultValue={prodToEdit ? prodToEdit.description : ""}
      ></textarea>
      <InputQuantityCustom />
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
