import React from "react";
import { Metadata } from "next";
import ConfigurationPage from "@/qikfy/pages/Configuration";

export const metadata: Metadata = {
  title: "Qikfy - Listar páginas",
};

async function Configuration() {
  return <ConfigurationPage />;
}

export default Configuration;
