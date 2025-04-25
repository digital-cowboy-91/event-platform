import { Flex, Text } from "@radix-ui/themes";
import { Suspense } from "react";
import Sidebar from "./sidebar/Sidebar";

export default function Header() {
  return (
    <header>
      <Flex justify={"between"}>
        <Text>TODO: Header</Text>
        <Suspense>
          <Sidebar />
        </Suspense>
      </Flex>
    </header>
  );
}
