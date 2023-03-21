/** @jsxImportSource @emotion/react */
import { useEditor } from "@builder/hooks/useEditor";
import { Grid, PopoverOrigin } from "@mui/material";
import { BuilderComponentColumns } from "src/@types/builder";
import React, { useCallback, useState } from "react";
import EditDialog from "./components/EditDialog";
import PopoverMenu from "./components/PopoverMenu";
import { componentName, gridStyles } from "./styles";
import AddDialog from "./components/AddDialog";
import { registerComponentsList } from "@components/register";
import DeleteDialog from "./components/DeleteDialog";
import { DraggableProvided } from "react-beautiful-dnd";

interface ComponentEditorProps {
  config: {
    col: BuilderComponentColumns;
    name: string;
    props: any;
    id: string;
    registerName: string;
  };
  children?: React.ReactNode;
  index: number;
  provided?: DraggableProvided;
}

const ComponentEditor: React.FC<ComponentEditorProps> = ({
  children,
  config,
  index,
  provided,
}) => {
  const {
    pagePath,
    editorDisabled,
    addComponent,
    removeComponent,
    updateComponent,
  } = useEditor();
  const [editDialogState, setEditDialogState] = useState<boolean>(false);
  const [addDialogState, setAddDialogState] = useState<boolean>(false);
  const [deleteDialogState, setDeleteDialogState] = useState<boolean>(false);

  // Popover Anchor
  const [anchorState, setAnchorState] = useState<HTMLElement | null>(null);
  const open = Boolean(anchorState);
  const anchorOrigin: PopoverOrigin = {
    horizontal: "left",
    vertical: "bottom",
  };

  const onEditPopover = useCallback(() => {
    setAnchorState(null);
    setEditDialogState(true);
  }, []);

  const onAddPopover = useCallback(() => {
    setAnchorState(null);
    setAddDialogState(true);
  }, []);

  const onDeletePopover = useCallback(() => {
    setAnchorState(null);
    setDeleteDialogState(true);
  }, []);

  // Edit Dialog
  const handleEdit = useCallback(
    async (data: any) => {
      const { col, ...props } = data;

      await updateComponent({
        component: {
          ...config,
          col,
          props,
        },
        index,
        pagePath,
      });

      setEditDialogState(false);
    },
    [updateComponent, pagePath, config, index]
  );

  //Add Dialog
  const handleAdd = useCallback(
    async (registerName: string) => {
      const componentSelected = registerComponentsList.find(
        (el) => el.registerName === registerName
      );

      if (!componentSelected) {
        return;
      }

      await addComponent({
        index,
        pagePath,
        registerName,
      });
    },
    [addComponent, index, pagePath]
  );

  //Delete Dialog
  const handleDelete = useCallback(async () => {
    await removeComponent({ index, pagePath });
  }, [index, pagePath, removeComponent]);

  return !editorDisabled ? (
    <>
      <Grid
        key={config.id}
        item
        css={gridStyles}
        onClick={(e) => setAnchorState(e.currentTarget)}
        {...config.col}
        ref={provided?.innerRef}
        {...provided?.draggableProps}
        {...provided?.dragHandleProps}
      >
        <div />
        <span className="component-name" css={componentName}>
          {config.name}
        </span>
        {children}
      </Grid>
      <PopoverMenu
        open={open}
        anchorEl={anchorState}
        onClose={() => setAnchorState(null)}
        anchorOrigin={anchorOrigin}
        onEdit={onEditPopover}
        onAdd={onAddPopover}
        onDelete={onDeletePopover}
      />
      <EditDialog
        open={editDialogState}
        componentName={config.name}
        componentProps={config.props}
        registerName={config.registerName}
        col={config.col}
        onSubmit={handleEdit}
        onClose={() => setEditDialogState(false)}
      />
      <AddDialog
        open={addDialogState}
        onAddComponent={handleAdd}
        onClose={() => setAddDialogState(false)}
      />
      <DeleteDialog
        onDeleteComponent={handleDelete}
        open={deleteDialogState}
        onClose={() => setDeleteDialogState(false)}
      />
    </>
  ) : (
    <Grid item {...config.col}>
      {children}
    </Grid>
  );
};

export default ComponentEditor;
