import React, { useCallback } from "react";
import useRenderEditor from "@/qikfy/hooks/useRenderEditor";
import Typography from "../Typography";
import styles from "./styles.module.css";
import _ from "lodash";

interface ChildrenContainerProps
  extends React.BaseHTMLAttributes<HTMLDivElement> {
  componentPath: string | null;
  children?: React.ReactNode;
}

function ChildrenContainer({
  children,
  componentPath,
  ...props
}: ChildrenContainerProps) {
  const { editorMode, onAddSelectedComponentChildren } = useRenderEditor();
  const isEditorMode = editorMode === "editor";
  const hasComponentPath = _.isString("");

  const handleAddComponent = useCallback(
    (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
      e.stopPropagation();
      e.preventDefault();
      e.persist();

      const path = componentPath ? `.${componentPath}.children` : "";

      onAddSelectedComponentChildren({
        componentPath: path,
      });
    },
    [componentPath, onAddSelectedComponentChildren]
  );

  if (!hasComponentPath) return null;

  return (
    <div className="qik-container" {...props}>
      {children}
      {isEditorMode && (
        <div className={styles.addChildrenContainer}>
          <Typography
            className={styles.addBox}
            type="span"
            onClick={handleAddComponent}
          >
            Adicionar componente
          </Typography>
        </div>
      )}
    </div>
  );
}

export default ChildrenContainer;
