"use client";

import React, { useCallback } from "react";
import styles from "./styles.module.css";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import TextInput from "@/qikfy/components/base/TextInput";
import { debounce } from "debounce";

function SearchForm() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const { register, handleSubmit, trigger } = useForm({
    defaultValues: {
      pagePath: searchParams.get("pagePath"),
    },
  });

  const onSearchSubmit = useCallback(
    (data: any) => {
      const params = new URLSearchParams(searchParams);
      params.set("pagePath", data);

      router.push(pathname + "?" + params.toString());
    },
    [pathname, router, searchParams]
  );

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSearchSubmit)}>
      <TextInput
        variant="underlined"
        label="Buscar página"
        {...register("pagePath")}
        onChange={debounce(async (e: React.ChangeEvent<HTMLInputElement>) => {
          await trigger("pagePath");
          onSearchSubmit(e.target.value);
        }, 500)}
      />
    </form>
  );
}

export default SearchForm;
