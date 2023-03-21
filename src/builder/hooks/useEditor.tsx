/** @jsxImportSource @emotion/react */
import React, { useCallback, useContext, useState } from "react";
import {
  DragDropContext,
  Draggable,
  Droppable,
  DroppableProvided,
  DropResult,
  ResponderProvided,
} from "react-beautiful-dnd";

import editorApi from "@builder/api/editorApi";
import {
  EditorAddComponent,
  EditorRemoveComponent,
  EditorUpdateComponent,
  EditorContext,
  EditorContextProps,
} from "@builder/context/EditorContext";
import { BuilderComponentModel } from "src/@types/builder";
import EditorLayout from "@builder/base/layout/EditorLayout";
import { registerComponentsList, registerRecord } from "@components/register";
import ComponentEditor from "@builder/base/components/ComponentEditor";
import { Grid } from "@mui/material";

interface EditorProviderProps {
  pagePath: string;
  components: BuilderComponentModel[];
}

export const EditorProvider: React.FC<EditorProviderProps> = ({
  pagePath,
  components,
}) => {
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

  const handleDragEnd = useCallback(
    (result: DropResult, provided: ResponderProvided) => {
      console.log({ result, provided });
    },
    []
  );

  const renderReactElement = useCallback(
    (
      builderComponent: BuilderComponentModel<any>,
      index: number,
      provided: DroppableProvided
    ) => {
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
        <Draggable
          key={id}
          draggableId={id}
          index={index}
          shouldRespectForcePress
          disableInteractiveElementBlocking
        >
          {(provided, snapshot) => (
            <>
              <ComponentEditor
                config={config}
                index={index}
                provided={provided}
              >
                {React.createElement(component, props)}
              </ComponentEditor>
              {snapshot.isDragging && (
                <Grid {...config.col} className="dnd-copy">
                  {React.createElement(component, props)}
                </Grid>
              )}
            </>
          )}
        </Draggable>
      );
    },
    []
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
        updateEditorComponents: setEditorComponents,
      }}
    >
      <EditorLayout>
        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="components">
            {(provided, snapshot) => (
              <Grid
                container
                className="components"
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {editorComponents.map((el, index) =>
                  renderReactElement(el, index, provided)
                )}
                {provided.placeholder}
              </Grid>
            )}
          </Droppable>
        </DragDropContext>
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
