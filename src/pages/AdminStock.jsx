import { db } from "../constants";
import { collection, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { StockCard, DetailPopup, Sidebar } from "../components";
import { useAdminContext } from "../context";
import { Toaster } from "react-hot-toast";

export default function AdminStock() {
  const [stock, setStock] = useState([]);
  const ref = collection(db, "Stock");
  const { categories, detailPopup } = useAdminContext();

  const getProd = () => {
    onSnapshot(ref, (querySnapshot) => {
      setStock(
        querySnapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }))
      );
    });
  };

  useEffect(() => {
    console.log("se ejecuta");
    getProd();
  }, []);

  return (
    <>
      <Sidebar />
      <div className="admin-stock justify-center pl-36 bg-gray-200">
        {categories.sort().map((cat, index) => {
          let arrayTemp = stock.filter((el) => el.category === cat);
          return (
            <div
              key={index}
              className="category-container pb-6 border-b-2 border-gray-300"
            >
              <h2 className="title px-6 pt-4 mb-6 text-2xl font-semibold">
                {cat}
              </h2>
              {arrayTemp.length === 0 ? (
                <h2 className=" text-center font-semibold uppercase text-gray-600 opacity-50">
                  No tiene productos 😔
                </h2>
              ) : (
                <div>
                  {arrayTemp.map((prod) => (
                    <StockCard key={prod.id} prod={prod} />
                  ))}
                </div>
              )}
            </div>
          );
        })}
        {detailPopup.ok && <DetailPopup />}
        <Toaster />
      </div>
    </>
  );
}
