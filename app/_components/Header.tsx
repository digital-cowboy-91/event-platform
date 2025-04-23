import { Flex, Text } from "@radix-ui/themes";
import Sidebar from "./sidebar/Sidebar";

export default function Header() {
  return (
    <header>
      <Flex justify={"between"}>
        <Text>TODO: Header</Text>
        <Sidebar />
      </Flex>
    </header>
  );
}
