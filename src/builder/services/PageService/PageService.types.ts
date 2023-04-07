import { BuilderComponentModel } from "src/@types/builder";

export interface UpdatePageComponentsRequest {
  pagePath: string;
  title?: string;
  components: BuilderComponentModel[];
}

export interface ListPageRequest {
  search?: string;
}

export interface CreatePageRequest {
  pagePath: string;
  title: string;
}
