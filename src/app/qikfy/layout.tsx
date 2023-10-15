import { DrawerProvider } from "@/qikfy/hooks/useDrawer";
import React from "react";

export const dynamic = "force-dynamic";
export const revalidate = false;

function QikfyBaseLayout({ children }: { children: React.ReactNode }) {
  return <DrawerProvider>{children}</DrawerProvider>;
}

export default QikfyBaseLayout;
