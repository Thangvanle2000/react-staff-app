import React from "react";
import { useRouter } from "next/router";
import Error from "../src/components/error";

export default function ErrorPage({ error }: any) {
  const router = useRouter();

  const onReset = () => router.push("/");

  return <Error error={error} resetErrorBoundary={onReset} />;
}

ErrorPage.getInitialProps = ({ err }: any) => ({ error: err });
