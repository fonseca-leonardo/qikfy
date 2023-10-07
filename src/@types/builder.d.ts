export type QikfyEditorMode = "editor" | "preview";

export type QikfyPropsValueType = "text" | "select";

export type QikfyPropsEditor = {
  name: string;
  defaultValue?: string;
  required?: boolean;
  type: QikfyPropsValueType;
  options?: string[];
};

type QikfySelectedComponent = QikfyComponentModel & { componentPath: string };

export type QikfyComponentExporter = {
  element: React.ForwardRefExoticComponent;
  registerName: string;
  editor: Record<string, QikfyPropsEditor>;
};

export type QikfyColumnValues =
  | 1
  | 2
  | 3
  | 4
  | 5
  | 6
  | 7
  | 8
  | 9
  | 10
  | 11
  | 12;

export type QikfyBreakPointsNames = "xs" | "sm" | "md" | "lg" | "xl";

export type QikfyComponentColumns = Record<
  QikfyBreakPointsNames,
  QikfyColumnValues
>;

export type QikfyComponentModel<T = any> = {
  id: string;
  props?: T;
  col: QikfyComponentColumns;
  registerName: string;
  children?: Record<string, QikfyComponentModel>;
};

export type QikfyComponentModelRecord = Record<string, QikfyComponentModel>;

export type QikfyPageModel = {
  pagePath: string;
  components: QikfyComponentModelRecord;
};
