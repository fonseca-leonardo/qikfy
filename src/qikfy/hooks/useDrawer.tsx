"use client";

import { createContext, useContext, useState } from "react";

interface DrawerContexData {
  drawerState: boolean;
  changeDrawerState: (state: boolean) => void;
}
const DrawerContext = createContext<DrawerContexData>({
  drawerState: true,
} as DrawerContexData);

export const DrawerProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [drawerState, setDrawerState] = useState(false);

  return (
    <DrawerContext.Provider
      value={{
        drawerState,
        changeDrawerState: setDrawerState,
      }}
    >
      {children}
    </DrawerContext.Provider>
  );
};

export const useDrawer = () => {
  const context = useContext(DrawerContext);

  if (!context) {
    throw new Error("useRenderEditor must be used within AuthProvider");
  }

  return context;
};
