import React from "react";
import { ScopedCssBaseline } from "@mui/material";

export interface BuilderComponentProps {
  children: React.ReactNode;
}

const BuilderComponent: React.FC<BuilderComponentProps> = ({ children }) => {
  return <ScopedCssBaseline>{children}</ScopedCssBaseline>;
};

export default BuilderComponent;
