import { db } from "../firebase/firebase";
import { collection, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import Stock from "../components/admin/Stock";


export default function AdminStock() {
  const [stock, setStock] = useState([]);
  const ref = collection(db, "stock");

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
      {stock.map((prod, index) => (
        <Stock key={prod.id} prod={prod} />
      ))}
      
    </div>
  );
}
