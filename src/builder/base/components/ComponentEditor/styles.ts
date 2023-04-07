import styled, { css } from "@emotion/react";

interface GridStyleProps {
  isHover: boolean;
}

export const gridStyles = ({ isHover }: GridStyleProps) => css`
  &:hover {
    margin: 4px 0px;
    padding: 2px;
    border: 1px solid #2a84de;

    cursor: pointer;

    .component-name {
      display: block;
    }
  }

  .block-click {
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: 5;
  }

  position: relative;

  ${isHover &&
  css`
    margin: 4px 0px;
    padding: 2px;
    border: 4px solid orange;
  `}
`;
