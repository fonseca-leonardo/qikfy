import { QikfyComponentExporter } from "@/@types/builder";
import { buttonExporter } from "./Button";
import { formExporter } from "./Form";
import { textInputExporter } from "./TextInput";
import { linkExporter } from "./Link";
import { containerExporter } from "./Container";

export const registerComponentList: QikfyComponentExporter[] = [
  buttonExporter,
  formExporter,
  textInputExporter,
  linkExporter,
  containerExporter,
];

export const registerComponents = () => {
  const record: Record<string, QikfyComponentExporter> = {};

  registerComponentList.forEach((el) => {
    record[el.registerName] = { ...el };
  });

  return record;
};
