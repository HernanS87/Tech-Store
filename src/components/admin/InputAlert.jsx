import React from "react";

export default function InputAlert({ state, msg }) {
  return (
    <>
      {(!state || state == 0) && (
        <p className="text-xs font-medium text-red-600 absolute">
          {msg ? msg : "¡Debes seleccionar una cantidad mayor o igual a 1!"}
        </p>
      )}
    </>
  );
}
