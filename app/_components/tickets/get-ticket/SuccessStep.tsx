import { Button, Flex } from "@radix-ui/themes";
import Link from "next/link";
import IcsDownloadButton from "../../event/IcsDownloadButton";

interface Props {
  eventId: string;
}

export default function SuccessStep({ eventId }: Props) {
  return (
    <Flex direction="column" gap="3">
      <IcsDownloadButton {...{ eventId }} />
      <Button variant="outline">
        <Link href="/my/tickets">See My Tickets</Link>
      </Button>
    </Flex>
  );
}
