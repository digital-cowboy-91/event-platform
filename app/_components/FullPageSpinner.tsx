import { Flex, Spinner } from "@radix-ui/themes";

export default function FullPageSpinner() {
  return (
    <Flex width="100%" height="100%" justify="center" align="center">
      <Spinner />
    </Flex>
  );
}
