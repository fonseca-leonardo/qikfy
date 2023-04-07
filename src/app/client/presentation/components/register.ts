import { BuilderRegisterList, BuilderRegisterRecord } from "src/@types/builder";
import { ButtonRegister } from "./Button";
import { InputRegister } from "./Input";

export const registerComponentsList: BuilderRegisterList = [
  ButtonRegister,
  InputRegister,
];

export const registerRecord = (): BuilderRegisterRecord => {
  const record: BuilderRegisterRecord = {};

  registerComponentsList.forEach((component) => {
    record[component.registerName] = {
      ...component,
    };
  });

  return record;
};
