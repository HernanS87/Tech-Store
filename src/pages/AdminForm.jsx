import { db } from "../constants";
import { doc, updateDoc, setDoc } from "firebase/firestore";
import { useAdminContext } from "../context";
import {
  InputPriceCustom,
  InputFileCustom,
  InputQuantityCustom,
  InputOfferCustom,
  InputAlert,
} from "../components";

export default function AdminForm() {
  const {
    categories,
    form,
    error,
    handleChange,
    handleBlur,
    handleSubmit,
    // setPriceOk,
    // quantity,
    // setQuantity,
    // offer,
    // setOffer,
    // prodToEdit,
    // setProdToEdit,
    // imgArray,
    // setImgArray,
  } = useAdminContext();

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   if (imgArray.length > 0) {
  //     if (prodToEdit) {
  //       const prodRef = doc(db, `Stock/${prodToEdit.id}`);
  //       updateDoc(prodRef, {
  //         ...prodToEdit,
  //         name: e.target.name.value.trim(),
  //         category: e.target.category.value,
  //         description: e.target.description.value.trim(),
  //         price: e.target.price.value,
  //         quantity: quantity,
  //         offer: offer,
  //         percent: e.target.percent.value,
  //         img: imgArray,
  //       });
  //       setProdToEdit(null);
  //     } else {
  //       const stockRef = doc(db, "Stock", `${e.target.name.value}`);
  //       setDoc(stockRef, {
  //         name: e.target.name.value.trim(),
  //         category: e.target.category.value,
  //         description: e.target.description.value.trim(),
  //         price: e.target.price.value,
  //         quantity: quantity,
  //         offer: offer,
  //         percent: e.target.percent.value,
  //         img: imgArray,
  //       });
  //     }

  //     e.target.name.value = "";
  //     e.target.price.value = "";
  //     e.target.description.value = "";
  //     e.target.category.value = "";
  //     e.target.percent.value = "";
  //     setImgArray([]);
  //     setQuantity(1);
  //     setPriceOk(true);
  //     setOffer(false);
  //   } else {
  //     alert("Debes cargar al menos una imágen");
  //   }
  // };

  return (
    <form
      className="p-2 flex flex-col flex-1 min-h-screen bg-slate-400 pl-40"
      onSubmit={handleSubmit}
    >
      <label htmlFor="name">Nombre del producto</label>
      <input
        type="text"
        id="name"
        name="name"
        placeholder="Producto"
        className="border-2 my-2 "
        value={form.name}
        onChange={handleChange}
      />

      <InputAlert msg={error.name} />
      <label htmlFor="category">Selecciona una categoría</label>
      <select
        id="category"
        name="category"
        aria-placeholder="Categoría"
        className="border-2 my-2"
        value={form.category}
        onChange={handleChange}
      >
        <option value=""></option>
        {categories.sort().map((elem) => (
          <option key={elem} value={elem}>
            {elem}
          </option>
        ))}
      </select>
      <InputAlert msg={error.category} />
      <div className="flex justify-center my-2">
        <div className="flex flex-wrap items-center justify-between py-4 w-full sm:w-3/4 md-920-w-66 lg:w-3/5 ">
          <InputPriceCustom />
          <InputQuantityCustom />
        </div>
      </div>
      <div>{/* <InputOfferCustom /> */}</div>
      <label htmlFor="description">Descripción</label>
      <textarea
        id="description"
        name="description"
        cols="30"
        rows="3"
        placeholder="..."
        className="border-2 my-2"
        value={form.description}
        onChange={handleChange}
      ></textarea>
      <InputAlert msg={error.description} />

      {/* <InputFileCustom /> */}
      <button
        type="submit"
        className="w-fit my-2 px-2 py-1 text-white bg-blue-600"
      >
        Guardar
        {/* {prodToEdit ? "Editar" : "Guardar"} */}
      </button>
    </form>
  );
}
