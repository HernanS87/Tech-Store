import { uploadImage, db } from "../constants";
import { collection, addDoc, doc, updateDoc } from "firebase/firestore";
import { useAdminContext } from "../context";

export default function AdminForm() {
  const { categories, prodToEdit, setProdToEdit } = useAdminContext();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const image = await uploadImage(e.target.image.files[0]);
    if (prodToEdit) {
      const prodRef = doc(db, `stock/${prodToEdit.id}`);
      updateDoc(prodRef, {
        ...prodToEdit,
        name: e.target.name.value,
        category: e.target.category.value,
        description: e.target.description.value,
        price: e.target.price.value,
      });
      setProdToEdit(null);
    } else {
      const stockRef = collection(db, "stock");
      addDoc(stockRef, {
        name: e.target.name.value,
        category: e.target.category.value,
        description: e.target.description.value,
        price: e.target.price.value,
        img: image,
      });
    }

    e.target.name.value = "";
    e.target.price.value = "";
    e.target.description.value = "";
    e.target.image.value = null;
    e.target.category.value = "";
  };

  return (
    <form
      className="p-2 flex flex-col flex-1 h-screen bg-slate-400 pl-40"
      onSubmit={handleSubmit}
    >
      <label htmlFor="name">Nombre del producto</label>
      <input
        type="text"
        id="name"
        placeholder="Producto"
        className="border-2 my-2 "
        defaultValue={prodToEdit ? prodToEdit.name : ""}
      />
      <label htmlFor="category">Selecciona una categoría</label>
      <select
        id="category"
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
      <label htmlFor="image">Imagen</label>
      <input type="file" className="my-2" id="image" />
      <button
        type="submit"
        className="w-fit my-2 px-2 py-1 text-white bg-blue-600"
      >
        {prodToEdit ? "Editar" : "Guardar"}
      </button>
    </form>
  );
}
