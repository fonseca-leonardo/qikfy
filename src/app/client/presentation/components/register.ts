import { BuilderRegisterList, BuilderRegisterRecord } from "src/@types/builder";
import { ButtonRegister } from "./Button";

export const registerComponentsList: BuilderRegisterList = [ButtonRegister];

export const registerRecord = (): BuilderRegisterRecord => {
  const record: BuilderRegisterRecord = {};

  registerComponentsList.forEach((component) => {
    record[component.registerName] = {
      ...component,
    };
  });

  return record;
};
