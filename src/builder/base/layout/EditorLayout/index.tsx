/** @jsxImportSource @emotion/react */
import AddDialog from "@builder/base/components/ComponentEditor/components/AddDialog";
import { useEditor } from "@builder/hooks/useEditor";
import { Add } from "@mui/icons-material";
import { Button, Grid } from "@mui/material";
import React, { useCallback, useState } from "react";
import Topbar from "../../components/Topbar";
import { Main } from "./styles";

interface EditorLayoutProps {
  children: React.ReactNode;
}

function EditorLayout({ children }: EditorLayoutProps) {
  const { editorComponents, editorDisabled, pagePath, addComponent } =
    useEditor();
  const [addDialogState, setAddDialogState] = useState(false);

  const handleAdd = useCallback(
    async (registerName: string) => {
      addComponent({
        registerName,
        index: editorComponents.length,
        pagePath,
      });
    },
    [addComponent, editorComponents.length, pagePath]
  );

  return (
    <>
      <Topbar />
      <main css={Main}>
        <Grid container>
          {children}
          {!editorDisabled && (
            <Grid item xs={12} mt={2}>
              <Button
                variant="outlined"
                fullWidth
                startIcon={<Add />}
                onClick={() => setAddDialogState(true)}
              >
                Novo componente
              </Button>
            </Grid>
          )}
        </Grid>
        <AddDialog
          open={addDialogState}
          onAddComponent={handleAdd}
          onClose={() => setAddDialogState(false)}
        />
      </main>
    </>
  );
}

export default EditorLayout;
