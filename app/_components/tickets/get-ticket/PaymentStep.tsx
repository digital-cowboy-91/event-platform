import { Button, Flex, Text } from "@radix-ui/themes";

interface Props {
  onSuccess: () => void;
}

export default function PaymentStep({ onSuccess }: Props) {
  return (
    <Flex direction="column" gap="3">
      <Text>TODO: Payment Step</Text>
      <Button onClick={onSuccess}>Next</Button>
    </Flex>
  );
}
