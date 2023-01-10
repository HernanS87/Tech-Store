import React from "react";

export default function InputAlert({ state }) {
  return (
    <>
      {(!state || state == 0) && (
        <p className="text-xs font-medium text-red-600 absolute">
          ¡Debes seleccionar una cantidad mayor o igual a 1!
        </p>
      )}
    </>
  );
}
