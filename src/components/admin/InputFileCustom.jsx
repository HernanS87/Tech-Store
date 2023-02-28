import { useState } from "react";
import { useAdminContext } from "../../context";
import ErrorMsg from "../ErrorMsg";

export default function InputFileCustom() {
  const { uploadImage, form, setForm, error, wrongImages, setWrongImages} = useAdminContext();

  const [drag, setDrag] = useState(false);
  
  let imagesTemp = form.images;

  const uploadFiles = (dataFiles) => {
    setWrongImages([])
    let files = [];
    let wrongImagesTemp = []
    for (let img of dataFiles) {
      files.push(img);
    }
    files.forEach(async (el) => {
      if (el.type.includes("image")) {
        const imageURL = await uploadImage(el);
        imagesTemp.push(imageURL);
        setForm({
          ...form,
          images: [...imagesTemp],
        });
      } else {
        wrongImagesTemp.push(`No puedes cargar "${el.name}" porque no es una imágen`)
        setWrongImages(wrongImagesTemp)
      }
    });
  };

  const handleDelete = (urlToDelete) => {
    setForm({
      ...form,
      images: form.images.filter((url) => url !== urlToDelete),
    });
    setWrongImages([])
  };

  return (
    <div className="images-container">
      <span >
        Selecciona las imágenes de tu producto{" "}
        <label htmlFor="images" className="cursor-pointer text-blue-600">aquí</label>
      </span>
      <input
        type="file"
        className="hidden"
        id="images"
        name="images"
        multiple
        accept="image/*"
        onChange={(e) => {
          uploadFiles(e.target.files);
          e.target.value = null;
        }}
      />
      <div
        id="dropZone"
        className="p-2 bg-slate-500 w-3/4 m-auto mt-2 "
        value="pepe"
        onDragOver={(e) => {
          e.preventDefault();
          setDrag(true);
        }}
        onDrop={(e) => {
          e.preventDefault();
          uploadFiles(e.dataTransfer.files);
          setDrag(false);
        }}
        onDragLeave={() => setDrag(false)}
      >
        <div
          className={`p-2 text-center border-2 border-dashed min-h-100px flex items-center justify-center ${
            !drag
              ? " bg-white   text-gray-400 border-gray-500 "
              : "bg-gray-300 text-white border-white transition-all "
          }`}
        >
          {form.images.length === 0 ? (
            "Puedes arrastrar tus imágenes si lo prefieres"
          ) : (
            <div className="relative w-full">
              <ul className="flex flex-wrap w-full justify-evenly items-center">
                {form.images.map((url, ind) => (
                  <li key={ind} className="relative bg-slate-100">
                    <img
                      src={url}
                      alt={form.name}
                      className="w-36 h-36 object-contain"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        handleDelete(url);
                      }}
                      className="btn-delete bg-red-500 text-white rounded-full px-1 text-xs font-semibold absolute top-1 right-1 "
                    >
                      X
                    </button>
                  </li>
                ))}
              </ul>
              <label
                htmlFor="images"
                className="text-5xl pb-2 bg-green-300 text-white flex justify-center items-center w-12 h-12 rounded-full cursor-pointer absolute bottom-0 right-0"
              >
                +
              </label>
            </div>
          )}
        </div>
      </div>
      <ErrorMsg msg={error.images} />
      {(wrongImages.length > 0) && <>{wrongImages.map((msg, i) => <ErrorMsg key={i} msg={msg} />)}</>}
    </div>
  );
}
