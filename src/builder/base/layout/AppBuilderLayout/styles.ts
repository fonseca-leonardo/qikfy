import { css } from "@emotion/react";

export const Main = (drawerWidth: number) => css`
  margin-top: 32px;
  margin-left: calc(${drawerWidth}px + 16px);
  padding-right: 32px;
`;
