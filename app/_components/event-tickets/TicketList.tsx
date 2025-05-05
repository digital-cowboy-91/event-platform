import { EventTicket } from "@/app/_lib/db/controller/event-tickets/getEventsTickets";
import { Box, Flex } from "@radix-ui/themes";
import QRCode from "react-qr-code";

interface Props {
  tickets: EventTicket["tickets"];
}

export default function TicketList({ tickets }: Props) {
  return (
    <Flex
      direction="column"
      gap="3"
      mt="3"
      p="3"
      style={{
        borderRadius: "var(--radius-3)",
        backgroundColor: "var(--accent-2)",
      }}
    >
      {tickets.map(({ id }) => (
        <Flex key={id}>
          <Box p="3" className="bg-white">
            <QRCode value={id} size={100} />
          </Box>
        </Flex>
      ))}
    </Flex>
  );
}
