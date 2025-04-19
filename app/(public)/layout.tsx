import { Container } from "@radix-ui/themes";
import { PropsWithChildren } from "react";

export default function layout({ children }: PropsWithChildren) {
  return <Container>{children}</Container>;
}
