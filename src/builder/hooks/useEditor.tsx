/** @jsxImportSource @emotion/react */
import React, { useCallback, useContext, useState } from "react";

import editorApi from "@builder/api/editorApi";
import {
  EditorAddComponent,
  EditorRemoveComponent,
  EditorUpdateComponent,
  EditorContext,
  EditorContextProps,
  EditorSwitchComponents,
} from "@builder/context/EditorContext";
import { BuilderComponentModel } from "src/@types/builder";
import EditorLayout from "@builder/base/layout/EditorLayout";
import { registerComponentsList, registerRecord } from "@components/register";
import ComponentEditor from "@builder/base/components/ComponentEditor";
import { Grid } from "@mui/material";
import { arrayMoveElement } from "@builder/lib/arrayMoveElement";

interface EditorProviderProps {
  pagePath: string;
  components: BuilderComponentModel[];
}

export const EditorProvider: React.FC<EditorProviderProps> = ({
  pagePath,
  components,
}) => {
  const [currentHover, setCurrentHover] = useState<string>("");
  const [editorDisabledState, setEditorDisabledState] = useState(false);
  const [editorComponents, setEditorComponents] =
    useState<BuilderComponentModel[]>(components);

  const handleAddComponent = useCallback(
    async ({ registerName, index, pagePath }: EditorAddComponent) => {
      const componentSelected = registerComponentsList.find(
        (el) => el.registerName === registerName
      );

      if (!componentSelected) {
        return;
      }

      const { data } = await editorApi.post("/components", {
        component: {
          registerName,
          col: {
            lg: 12,
            md: 12,
            sm: 12,
            xl: 12,
            xs: 12,
          },
          props: {
            ...componentSelected?.defaultValues,
          },
        },
        index,
        pagePath,
      });

      setEditorComponents(data.components);
    },
    []
  );

  const handleRemoveComponent = useCallback(
    async ({ index, pagePath }: EditorRemoveComponent) => {
      const { data } = await editorApi.delete("/components", {
        data: {
          index,
          pagePath,
        },
      });

      setEditorComponents(data.components);
    },
    []
  );

  const handleUpdateComponent = useCallback(
    async ({ component, index, pagePath }: EditorUpdateComponent) => {
      const { data } = await editorApi.patch("/components", {
        component,
        index,
        pagePath,
      });

      setEditorComponents(data.components);
    },
    []
  );

  const handleSwitchComponents = useCallback(
    async ({ fromId, toId }: EditorSwitchComponents) => {
      const fromIndex = editorComponents.findIndex((el) => el.id === fromId);
      const toIndex = editorComponents.findIndex((el) => el.id === toId);
      if (fromIndex === -1 || toIndex === -1) return;

      const componentList = arrayMoveElement(
        editorComponents,
        fromIndex,
        toIndex
      );

      const { data } = await editorApi.patch("/pages", {
        pagePath,
        components: componentList,
      });

      setEditorComponents(data.components);
    },
    [editorComponents, pagePath]
  );

  const renderReactElement = useCallback(
    (builderComponent: BuilderComponentModel<any>, index: number) => {
      const { id, props, registerName, col } = builderComponent;
      const { component, name } = registerRecord()[registerName];

      const config = {
        col,
        id,
        name,
        props,
        registerName,
      };

      return (
        <ComponentEditor
          key={id}
          config={config}
          index={index}
          changeCurrentHover={setCurrentHover}
          currentHover={currentHover}
        >
          {React.createElement(component, props)}
        </ComponentEditor>
      );
    },
    [currentHover]
  );

  return (
    <EditorContext.Provider
      value={{
        pagePath,
        editorComponents,
        editorDisabled: editorDisabledState,
        switchEditorMode: () => setEditorDisabledState(!editorDisabledState),
        addComponent: handleAddComponent,
        removeComponent: handleRemoveComponent,
        updateComponent: handleUpdateComponent,
        switchComponents: handleSwitchComponents,
        updateEditorComponents: setEditorComponents,
      }}
    >
      <EditorLayout>
        <Grid container className="components">
          {editorComponents.map((el, index) => renderReactElement(el, index))}
        </Grid>
      </EditorLayout>
    </EditorContext.Provider>
  );
};

export const useEditor = (): EditorContextProps => {
  const context = useContext(EditorContext);

  if (!context) {
    throw new Error("Editor provider must be used within EditorProvider");
  }

  return context;
};
