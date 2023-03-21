import { BuilderComponentModel } from "src/@types/builder";

export interface AddComponentRequest {
  pagePath: string;
  component: BuilderComponentModel;
  index: number;
}

export interface EditComponentRequest {
  pagePath: string;
  component: BuilderComponentModel;
  index: number;
}

export interface DeleteComponentRequest {
  pagePath: string;
  index: number;
}
