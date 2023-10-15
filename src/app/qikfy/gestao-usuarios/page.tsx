import React from "react";
import { Metadata } from "next";
import UserPage from "@/qikfy/pages/UserPage";

export const metadata: Metadata = {
  title: "Qikfy - Gestão de usuários",
};

async function Users() {
  return <UserPage />;
}

export default Users;
