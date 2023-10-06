"use client";

import {
  QikfyBreakPointsNames,
  QikfyComponentColumns,
  QikfyComponentModel,
  QikfyComponentModelRecord,
  QikfyPageModel,
  QikfySelectedComponent,
} from "@/@types/builder";
import { registerComponents } from "@/presentation/components";
import React, { createContext, useCallback, useContext, useState } from "react";
import ComponentEditor from "../components/ComponentEditor";
import updateNested from "../utils/updateNested";

interface RenderEditorContextData {
  pageModel?: QikfyPageModel;
  renderPageModel: () => React.DetailedReactHTMLElement<
    {
      id: string;
    },
    HTMLElement
  >;
  selectedComponent: QikfySelectedComponent | null;
  onSelectComponent: (component: QikfySelectedComponent | null) => void;

  onComponentEdition: (selectedComponent: QikfySelectedComponent) => void;
}

const RenderEditorContext = createContext<RenderEditorContextData>(
  {} as RenderEditorContextData
);

export const RenderEditorProvider: React.FC<{
  children: React.ReactNode;
  page: QikfyPageModel;
}> = ({ children, page }) => {
  const [hoverElement, setHoverElement] = useState("");
  const [pageModelState, setPageModelState] = useState<QikfyPageModel>(page);
  const [selectedComponent, setSelectedComponent] =
    useState<QikfySelectedComponent | null>(null);

  const parseColumnsToClassName = useCallback(
    (columns: QikfyComponentColumns) => {
      let classColumns = "";
      for (const key in columns) {
        classColumns = classColumns.concat(
          `qik-col-${columns[key as QikfyBreakPointsNames]}-${key} `
        );
      }
      return classColumns;
    },
    []
  );

  const renderElements = useCallback(
    (
      component: QikfyComponentModel,
      componentKeyPath: string
    ): React.ReactElement => {
      const children = [];
      let newPath = componentKeyPath;

      if (component.children) {
        for (const key in component.children) {
          const child = component.children[key];
          newPath = newPath.concat(`.children.${key}`);

          children.push(renderElements(child, newPath));
          newPath = componentKeyPath;
        }
      }

      const reactElement = registerComponents()[component.registerName];

      const containerClass = !!component.children ? "qik-container " : "";

      const className = `${containerClass}qik-element ${parseColumnsToClassName(
        component.col
      )}`;

      return (
        <ComponentEditor
          currentHover={hoverElement}
          onCurrentHoverChange={(el) => setHoverElement(el)}
          componentKeyPath={newPath}
          key={componentKeyPath}
          className={className}
        >
          {React.createElement(
            reactElement.element,
            {
              key: component.id,
              className,
              ...component.props,
            },
            children
          )}
        </ComponentEditor>
      );
    },
    [parseColumnsToClassName, hoverElement]
  );

  const prepareRender = useCallback(
    (components: QikfyComponentModelRecord) => {
      const rootElements: React.ReactElement[] = [];

      for (const key in components) {
        const rootElement = React.createElement(
          "div",
          { key: key, className: "qik-element qik-col-12" },
          renderElements(components[key], key)
        );

        rootElements.push(rootElement);
      }

      const mainElement = React.createElement(
        "div",
        {
          id: "root",
        },
        rootElements
      );

      return mainElement;
    },
    [renderElements]
  );

  const renderPageModel = useCallback(() => {
    return prepareRender(pageModelState.components);
  }, [pageModelState.components, prepareRender]);

  const handleSelectComponent = useCallback(
    (component: QikfySelectedComponent | null) => {
      setSelectedComponent(component);
    },
    []
  );

  const handleComponentEdition = useCallback(
    (selectedComponent: QikfySelectedComponent) => {
      // console.log(selectedComponent);
      const { componentPath, ...rest } = selectedComponent;

      const newComponentsPage = updateNested(
        pageModelState?.components,
        selectedComponent.componentPath,
        rest
      );

      console.log(newComponentsPage);

      setPageModelState((prev) => ({ ...prev, components: newComponentsPage }));

      setSelectedComponent(null);
    },
    [pageModelState]
  );

  return (
    <RenderEditorContext.Provider
      value={{
        pageModel: pageModelState,
        renderPageModel,
        selectedComponent,
        onSelectComponent: handleSelectComponent,
        onComponentEdition: handleComponentEdition,
      }}
    >
      {children}
    </RenderEditorContext.Provider>
  );
};

const useRenderEditor = () => {
  const context = useContext(RenderEditorContext);

  if (!context) {
    throw new Error("useRenderEditor must be used within AuthProvider");
  }

  return context;
};

export default useRenderEditor;
