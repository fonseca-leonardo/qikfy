import { BuilderComponentModel } from "src/@types/builder";
import { createContext } from "react";

export type EditorAddComponent = {
  pagePath: string;
  registerName: string;
  index: number;
};
export type EditorRemoveComponent = {
  index: number;
  pagePath: string;
};

export type EditorUpdateComponent = {
  pagePath: string;
  component: BuilderComponentModel;
  index: number;
};

export type EditorSwitchComponents = {
  fromId: string;
  toId: string;
};

export interface EditorContextProps {
  pagePath: string;
  editorDisabled: boolean;
  editorComponents: BuilderComponentModel<any>[];
  switchEditorMode: () => void;
  addComponent: (values: EditorAddComponent) => Promise<void>;
  switchComponents: (values: EditorSwitchComponents) => Promise<void>;
  removeComponent: (values: EditorRemoveComponent) => Promise<void>;
  updateComponent: (values: EditorUpdateComponent) => Promise<void>;
  updateEditorComponents: (components: BuilderComponentModel[]) => void;
}

export const EditorContext = createContext<EditorContextProps>(
  {} as EditorContextProps
);
