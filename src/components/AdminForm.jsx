export default function AdminForm() {
  return (
    <form className="p-2 flex flex-col h-screen bg-slate-400">
      <label htmlFor="name">Nombre del producto</label>
      <input
        type="text"
        id="name"
        placeholder="Producto"
        className="border-2 my-2 "
      />
      <label htmlFor="price">Precio</label>
      <input type="number" placeholder="$ARS" className="border-2 my-2" />
      <label htmlFor="description">Descripcion</label>
      <textarea
        name=""
        id="description"
        cols="30"
        rows="3"
        className="border-2 my-2"
      ></textarea>
      <label htmlFor="images">Imagen</label>
      <input type="file" className="my-2" />
      <button type="submit" className="w-fit my-2 px-2 py-1 text-white bg-blue-600">Guardar</button>
    </form>
  );
}
