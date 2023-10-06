import type { Metadata } from "next";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import "./global.editor.css";
import { RenderEditorProvider } from "@/qikfy/hooks/useRenderEditor";
import { QikfyPageModel } from "@/@types/builder";

export const metadata: Metadata = {
  title: "Qikfy - Editor",
};

const componentToRender: QikfyPageModel = {
  components: {
    form: {
      id: "form_123",
      col: {
        lg: 12,
        md: 12,
        sm: 12,
        xl: 12,
        xs: 12,
      },
      registerName: "form",
      props: {},
      children: {
        name: {
          id: "input1",
          col: {
            lg: 8,
            md: 6,
            sm: 12,
            xl: 8,
            xs: 12,
          },
          registerName: "textInput",
          props: {
            name: "name",
            placeholder: "Ryan",
          },
        },
        lastName: {
          id: "input2",
          col: {
            lg: 4,
            md: 4,
            sm: 4,
            xl: 4,
            xs: 4,
          },
          registerName: "textInput",
          props: {
            name: "lastName",
            placeholder: "Sobrenome",
          },
        },
        submit: {
          id: "button",
          col: {
            lg: 12,
            md: 12,
            sm: 12,
            xl: 12,
            xs: 12,
          },
          registerName: "button",
          props: {
            title: "Enviar",
          },
        },
        link: {
          id: "link",
          col: {
            lg: 12,
            md: 12,
            sm: 12,
            xl: 12,
            xs: 12,
          },
          registerName: "link",
          props: {
            title: "AQUI",
            href: "https://google.com.br",
          },
        },
        container1: {
          id: "container1",
          registerName: "container",
          col: {
            lg: 12,
            md: 12,
            sm: 12,
            xl: 12,
            xs: 12,
          },
          props: {
            title: "container1",
          },
          children: {
            container2: {
              id: "container2",
              registerName: "container",
              col: {
                lg: 12,
                md: 12,
                sm: 12,
                xl: 12,
                xs: 12,
              },
              props: {
                title: "container2",
              },
            },
          },
        },
      },
    },
    button: {
      id: "button",
      col: {
        lg: 12,
        md: 12,
        sm: 12,
        xl: 12,
        xs: 12,
      },
      registerName: "button",
      props: {
        title: "Outro",
      },
    },
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <RenderEditorProvider page={componentToRender}>
      <header></header>
      {children}
    </RenderEditorProvider>
  );
}
