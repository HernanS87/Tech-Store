import { db } from "../constants";
import { collection, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Stock } from "../components";
import { useAdminContext } from "../context";

export default function AdminStock() {
  const [stock, setStock] = useState([]);
  const ref = collection(db, "stock");
  const { categories } = useAdminContext();

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
    <div className="admin-stock flex-row flex-1 justify-center pl-36">
      {categories.sort().map((cat, index) => {
        let arrayTemp = stock.filter((el) => el.category === cat);
        return (
          <div
            key={index}
            className="category-container pb-6 border-b-2 border-gray-300"
          >
            <h2 className="title px-6 mt-4 mb-6 text-2xl font-semibold">
              {cat}
            </h2>
            {arrayTemp.length === 0 ? (
              <h2 className=" text-center font-semibold uppercase text-gray-600 opacity-50">
                No tiene productos 😔
              </h2>
            ) : (
              <div>
                {arrayTemp.map((prod) => (
                  <Stock key={prod.id} prod={prod} />
                ))}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
