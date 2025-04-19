import { Container } from "@radix-ui/themes";
import { PropsWithChildren } from "react";

export default function layout({ children }: PropsWithChildren) {
  console.log("TODO: Protect admin");
  return <Container>{children}</Container>;
}
