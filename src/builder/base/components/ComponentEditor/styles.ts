import { css } from "@emotion/react";

export const componentName = css`
  position: absolute;
  bottom: -10px;
  display: none;
  left: 20px;
  background-color: #2a84de;

  color: white;
  padding: 2px 16px;
  border-radius: 4px;
  font-size: 14px;

  z-index: 99;
`;

export const gridStyles = css`
  &:hover {
    margin: 4px 0px;
    padding: 2px;
    border: 1px solid #2a84de;

    cursor: pointer;

    .component-name {
      display: block;
    }
  }

  div {
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: 5;
  }

  position: relative;
`;
