import { NextPage } from "next";
import { AppProps } from "next/app";
import { ReactElement, ReactNode } from "react";

export type messageT = {
  text: string;
  id: string;
};

export type userT = {
  name: string;
  email: string;
};

export type tokenPayloadT = {
  email: string;
  iat: number;
  exp: number;
};

export type chatMenuT = {
  id: number;
  users: { name: string }[];
};

export type serveMessageT = {
  message: string;
};

export type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

export type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};
