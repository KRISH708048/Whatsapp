import React from "react";
import { atom } from "recoil";
export const authUser = atom({
  key: "authUser",
  default: JSON.stringify(localStorage.getItem("user-info") || ''),
});
