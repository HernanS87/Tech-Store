import React from "react";

export default function ErrorMsg({ msg }) {
  return (
    <>{msg && <p className="text-xs font-medium text-red-600 ">{msg}</p>}</>
  );
}
