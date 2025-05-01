import { Text } from "@radix-ui/themes";

interface Props {
  error: { message: string } | undefined | null;
}

export default function InputError({ error }: Props) {
  if (!error) return null;
  return <Text color="red">{error.message ?? "Unexpected error"}</Text>;
}
