import React from "react";

export type BuilderInputOption = {
  label: string;
  value: string;
};

export type BuilderInputProps = {
  name: string;
  control: any;
  label?: string;
  options?: BuilderInputOption[];
  required?: boolean;
  placeholder?: string;
};

export type BuilderEditorComponent = {
  name: string;
  Input: React.FC<BuilderInputProps>;
  label?: string;
  options?: BuilderInputOption[];
  required?: boolean;
};

export type BuilderChildrenComponent<T> = React.FC<T> & {
  childrenComponent?: React.FC<any>;
};

export type BuilderRegisterComponent<T = any> = {
  component: React.FC<T>;
  name: string;
  registerName: string;
  editor: BuilderEditorComponent[];
  options?: BuilderInputOption[];
  defaultValues?: { [K in keyof T]?: T[K] };
};

export type BuilderRegisterRecord = Record<string, BuilderRegisterComponent>;

export type BuilderRegisterList = Array<BuilderRegisterComponent>;

export type BuilderComponentColumns = {
  sm: number;
  md: number;
  lg: number;
  xl: number;
  xs: number;
};

export type BuilderComponentModel<T = any> = {
  id: string;
  props: T;
  col: BuilderComponentColumns;
  registerName: string;
  children?: BuilderComponentModel[];
};

export type BuilderPageModel = {
  id: string;
  title: string;
  pagePath: string;
  components: BuilderComponentModel[];
};
