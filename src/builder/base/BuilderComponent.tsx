import React from "react";
import { createTheme, ScopedCssBaseline, ThemeProvider } from "@mui/material";
import { brown, yellow } from "@mui/material/colors";

export interface BuilderComponentProps {
  children: React.ReactNode;
}

const appBuilderTheme = createTheme({
  palette: {
    primary: brown,
    secondary: yellow,
  },
});

const BuilderComponent: React.FC<BuilderComponentProps> = ({ children }) => {
  return (
    <ScopedCssBaseline>
      <ThemeProvider theme={appBuilderTheme}>{children}</ThemeProvider>
    </ScopedCssBaseline>
  );
};

export default BuilderComponent;
