"use client";

import {
  QikfyBreakPointsNames,
  QikfyComponentColumns,
  QikfyComponentModel,
  QikfyComponentModelRecord,
  QikfyEditorMode,
  QikfyPageModel,
  QikfySelectedComponent,
} from "@/@types/builder";
import { registerComponents } from "@/presentation/components";
import React, { createContext, useCallback, useContext, useState } from "react";
import ComponentEditor from "../components/ComponentEditor";
import updateNested from "../utils/updateNested";
import _ from "lodash";
import { updatePage } from "../frontend/services/pages";

interface RenderEditorContextData {
  pageModel?: QikfyPageModel;
  editorMode: QikfyEditorMode;
  setEditorMode: (mode: QikfyEditorMode) => void;
  renderPageModel: () => React.DetailedReactHTMLElement<
    {
      id: string;
    },
    HTMLElement
  >;
  selectedComponent: QikfySelectedComponent | null;
  addSelectedComponent: QikfySelectedComponent | null;
  deleteComponent: QikfySelectedComponent | null;
  onConfirmDeleteComponent: (selectedComponent: QikfySelectedComponent) => void;
  onSelectComponent: (component: QikfySelectedComponent | null) => void;
  onAddComponent: (
    selectedComponent: Record<string, QikfyComponentModel>,
    pathToInsert: string
  ) => void;
  onAddSelectedComponent: (component: QikfySelectedComponent | null) => void;
  onDeleteSelectedComponent: (component: QikfySelectedComponent | null) => void;
  onComponentEdition: (selectedComponent: QikfySelectedComponent) => void;
}

const RenderEditorContext = createContext<RenderEditorContextData>(
  {} as RenderEditorContextData
);

export const RenderEditorProvider: React.FC<{
  children: React.ReactNode;
  page: QikfyPageModel;
  editorModeDefault: QikfyEditorMode;
}> = ({ children, editorModeDefault, page }) => {
  const [hoverElement, setHoverElement] = useState("");
  const [pageModelState, setPageModelState] = useState<QikfyPageModel>(page);
  const [selectedComponent, setSelectedComponent] =
    useState<QikfySelectedComponent | null>(null);
  const [addSelectedComponent, setAddSelectedComponent] =
    useState<QikfySelectedComponent | null>(null);
  const [deleteComponent, setDeleteComponent] =
    useState<QikfySelectedComponent | null>(null);
  const [editorMode, setEditorMode] =
    useState<QikfyEditorMode>(editorModeDefault);

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

      if (editorMode !== "editor")
        return React.createElement(
          reactElement.element,
          {
            key: component.id,
            className,
            ...component.props,
          },
          children
        );

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
    [parseColumnsToClassName, hoverElement, editorMode]
  );

  const prepareRender = useCallback(
    (components: QikfyComponentModelRecord) => {
      const rootElements: React.ReactElement[] = [];

      for (const key in components) {
        const rootElement = renderElements(components[key], key);

        rootElements.push(rootElement);
      }

      const mainElement = React.createElement(
        "div",
        {
          id: "root",
          className: "qik-container",
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
    async (selectedComponent: QikfySelectedComponent) => {
      const { componentPath, ...rest } = selectedComponent;

      const newComponentsPage = updateNested(
        pageModelState?.components,
        selectedComponent.componentPath,
        rest
      );

      setPageModelState((prev) => ({ ...prev, components: newComponentsPage }));

      setSelectedComponent(null);

      await updatePage({ ...pageModelState, components: newComponentsPage });
    },
    [pageModelState]
  );

  const handleAddComponent = useCallback(
    async (
      selectedComponent: Record<string, QikfyComponentModel>,
      pathToInsert: string
    ) => {
      let clonePageComponents = _.cloneDeep(pageModelState.components);

      if (!pathToInsert) {
        setPageModelState((prev) => ({
          ...prev,
          components: selectedComponent,
        }));
      } else {
        const newComponents = _.set(
          clonePageComponents,
          `${pathToInsert}`,
          selectedComponent
        );

        const page: QikfyPageModel = {
          ...pageModelState,
          components: newComponents,
        };

        setPageModelState((prev) => ({
          ...prev,
          components: newComponents,
        }));

        await updatePage(page);
      }

      setAddSelectedComponent(null);
    },
    [pageModelState]
  );

  const handleConfirmDeleteComponent = useCallback(
    async (selectedComponent: QikfySelectedComponent) => {
      const { componentPath, ...rest } = selectedComponent;
      const page = _.cloneDeep(pageModelState);

      _.unset(page, `components.${componentPath}`);

      setPageModelState(page);

      setDeleteComponent(null);

      await updatePage(page);
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
        onAddComponent: handleAddComponent,
        addSelectedComponent,
        onAddSelectedComponent: setAddSelectedComponent,
        onComponentEdition: handleComponentEdition,
        onDeleteSelectedComponent: setDeleteComponent,
        onConfirmDeleteComponent: handleConfirmDeleteComponent,
        editorMode,
        setEditorMode,
        deleteComponent,
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
