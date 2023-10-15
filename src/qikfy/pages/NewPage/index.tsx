"use client";

import React, { useCallback } from "react";
import styles from "./styles.module.css";
import Typography from "@/qikfy/components/base/Typography";
import TextInput from "@/qikfy/components/base/TextInput";
import { useForm } from "react-hook-form";
import Button from "@/qikfy/components/base/Button";
import { createPage } from "@/qikfy/frontend/services/pages";
import { useRouter } from "next/navigation";
import pageListRouter from "../PageListPage/router";

interface FormProps {
  pagePath: string;
  name: string;
}

function NewPagePage() {
  const { register, formState, handleSubmit } = useForm<FormProps>({});
  const router = useRouter();

  const onCreateFormSubmit = useCallback(
    async (data: FormProps) => {
      let { name, pagePath } = data;
      const isSlashLastChar =
        data.pagePath.lastIndexOf("/") === data.pagePath.length - 1;
      if (isSlashLastChar) pagePath = pagePath.slice(0, -1);

      await createPage({
        components: {},
        name,
        pagePath,
      });

      router.push(pageListRouter.router, { scroll: false });
    },
    [router]
  );

  return (
    <div className={styles.container}>
      <Typography type="h2">Nova página</Typography>
      <form className={styles.form} onSubmit={handleSubmit(onCreateFormSubmit)}>
        <TextInput
          required
          label="Nome da página"
          {...register("name", {
            required: { value: true, message: "Campo obrigatório" },
          })}
          error={formState.errors.name?.message}
        />
        <TextInput
          required
          label="Caminho da página"
          placeholder="Ex: /home, /produto/cadastrar"
          error={formState.errors.pagePath?.message}
          {...register("pagePath", {
            pattern: {
              value: /^\/(?:[a-zA-Z0-9-]+\/?)*$/,
              message: "Caminho de url inválido",
            },
            required: { value: true, message: "Campo obrigatório" },
          })}
        />
        <Button className={styles.button}>Criar página</Button>
      </form>
    </div>
  );
}

export default NewPagePage;
