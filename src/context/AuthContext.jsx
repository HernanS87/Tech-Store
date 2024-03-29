import { createContext, useContext, useEffect, useState } from "react";
import { auth, db } from "../constants";
import {
  collection,
  query,
  where,
  getDocs,
  addDoc,
  updateDoc,
  doc,
} from "firebase/firestore";
import {
  onAuthStateChanged,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  linkWithCredential,
  EmailAuthProvider,
  sendPasswordResetEmail,
} from "firebase/auth";

const AuthContext = createContext();

export const useAuthContext = () => {
  const context = useContext(AuthContext);

  if (!context) throw new Error("you can't execute useAuthContext here");

  return context;
};

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Funcion que me carga el nuevo usuario en la db y actualiza el currentUser
  const createNewUser = async (user, method, password = null) => {
    console.log("Usuario nuevo creado");
    const newUser = {
      name: user.displayName,
      email: user.email,
      role: "client",
      photo: user.photoURL,
      method: [method],
      password: password,
    };
    setCurrentUser(newUser);
    const ref = collection(db, "Users");
    await addDoc(ref, newUser);
  };

  // Funcion que busca el usuario en la db y lo retorna o devuelve null
  const checkUser = async (user) => {
    const q = query(collection(db, "Users"), where("email", "==", user.email));
    let userFromDB = null;
    const qSnap = await getDocs(q);
    if (qSnap.docs.length == 1) {
      qSnap.forEach((doc) => {
        console.log("loading user from DB", doc.data());
        userFromDB = { ...doc.data(), id: doc.id };
      });
    }
    return userFromDB;
  };

  const signup = async (email, password) => {
    const { user } = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    await createNewUser(user, "password", password);
  };

  const login = async (email, password) => {
    const { user } = await signInWithEmailAndPassword(auth, email, password);
    const userFromDB = await checkUser(user);
    setCurrentUser(userFromDB);
    if (userFromDB.password !== password) {
      const userRef = doc(db, `Users/${userFromDB.id}`);
      await updateDoc(userRef, {
        ...userFromDB,
        password: password,
      });
    }
  };

  const loginWithGoogle = async () => {
    console.log("ejecutando loginGoogle");
    const provider = new GoogleAuthProvider();

    const { user } = await signInWithPopup(auth, provider);

    const userFromDB = await checkUser(user);

    if (userFromDB) {
      if (
        userFromDB.method.length === 1 &&
        userFromDB.method[0] === "password"
      ) {
        const credential = EmailAuthProvider.credential(
          userFromDB.email,
          userFromDB.password
        );
        console.log("CREDENCIALES", credential);
        await linkWithCredential(user, credential);
        const userRef = doc(db, `Users/${userFromDB.id}`);
        await updateDoc(userRef, {
          ...userFromDB,
          method: ["password", "google"],
        });
        setCurrentUser(userFromDB);
      } else {
        setCurrentUser(userFromDB);
      }
    } else {
      createNewUser(user, "google");
    }
  };

  const logout = () => {
    setCurrentUser(null);
    return signOut(auth);
  };

  const resetPassword = (email) => sendPasswordResetEmail(auth, email);

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      console.log("useEffect", user);
      if (user != null) {
        setCurrentUser(await checkUser(user));
      }
      setLoading(false);
    });
  }, []);

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        loginWithGoogle,
        logout,
        loading,
        setLoading,
        signup,
        login,
        resetPassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
