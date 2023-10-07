"use client";
import React, { MouseEvent, useEffect, useRef, useState } from "react";
import { Popover } from "react-tiny-popover";

import useRenderEditor from "../../hooks/useRenderEditor";
import accessNested from "../../utils/accessNested";
import PopoverOptions from "./components/PopoverOptions";

type ChildComponentProps = {
  className: string;
  onClick: (event: MouseEvent) => void;
  onMouseOver: (event: MouseEvent<HTMLDivElement, Element>) => void;
  onMouseLeave: () => void;
  onFocus: (e: React.FocusEvent<HTMLDivElement, Element>) => void;
};

interface ComponentEditorProps {
  children: React.ReactNode;
  key: string | number;
  componentKeyPath: string;
  currentHover: string;
  onCurrentHoverChange: (element: string) => void;
  className: string;
}

function ComponentEditor({
  componentKeyPath,
  children,
  currentHover,
  className,
  onCurrentHoverChange,
}: ComponentEditorProps) {
  const [popoverState, setpopoverState] = useState(false);
  const clickMeButtonRef = useRef<HTMLDivElement | null>(null);
  const {
    onSelectComponent,
    pageModel,
    selectedComponent,
    addSelectedComponent,
    deleteComponent,
    onAddSelectedComponent,
    onDeleteSelectedComponent,
  } = useRenderEditor();

  const handleChildClick = (e: MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    e.persist();

    setpopoverState(true);
  };

  const handleOpenEdit = () => {
    const component = accessNested(pageModel?.components, componentKeyPath);

    onSelectComponent({ ...component, componentPath: componentKeyPath });
    setpopoverState(false);
  };

  const handleOpenAdd = () => {
    const component = accessNested(pageModel?.components, componentKeyPath);

    onAddSelectedComponent({ ...component, componentPath: componentKeyPath });
    setpopoverState(false);
  };

  const handleDelete = () => {
    const component = accessNested(pageModel?.components, componentKeyPath);

    onDeleteSelectedComponent({
      ...component,
      componentPath: componentKeyPath,
    });

    setpopoverState(false);
  };

  const editorClassName =
    (currentHover === componentKeyPath || popoverState) &&
    !selectedComponent &&
    !addSelectedComponent &&
    !deleteComponent
      ? `qik-element-editor ${className}`
      : className;

  useEffect(() => {
    function handleClickOutside(event: any) {
      if (clickMeButtonRef.current?.contains(event.target)) {
        return;
      }

      setpopoverState(false);
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [clickMeButtonRef]);

  return (
    <Popover
      isOpen={popoverState}
      content={
        <PopoverOptions
          ref={clickMeButtonRef}
          onOpenEdit={handleOpenEdit}
          onOpenAdd={handleOpenAdd}
          onDelete={handleDelete}
        />
      }
      onClickOutside={() => setpopoverState(false)}
      positions={["bottom", "right"]}
      align="end"
    >
      {React.cloneElement(children as React.ReactElement<ChildComponentProps>, {
        onClick: handleChildClick,
        onMouseOver: (e: MouseEvent<HTMLDivElement, Element>) => {
          e.stopPropagation();
          onCurrentHoverChange(componentKeyPath);
        },
        onMouseLeave: () => {
          onCurrentHoverChange("");
        },

        className: editorClassName,
        onFocus: (e: React.FocusEvent<HTMLDivElement, Element>) => {
          e?.target?.blur();
        },
      })}
    </Popover>
  );
}

export default ComponentEditor;
