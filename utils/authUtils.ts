import { signOut } from "next-auth/react";
import api from "./api";

export const logout = async () => {
  await api.post("/auth/logout");
  signOut(); // ลบ Session ออกจาก NextAuth
};
