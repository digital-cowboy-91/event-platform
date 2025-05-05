"use client";

import { Button, Dialog, Flex, IconButton } from "@radix-ui/themes";
import { useMemo, useState } from "react";
import Icon from "../../Icon";
import LoginStep from "./LoginStep";
import OptionsStep from "./OptionsStep";
import PaymentStep from "./PaymentStep";
import SuccessStep from "./SuccessStep";

interface Props {
  eventId: string;
  price: number | null;
}

export default function GetTicketDialog({ eventId, price }: Props) {
  const [activeIdx, setActiveIdx] = useState(0);
  const [userId, setUserId] = useState("");

  const label = price ? "Get Tickets from £" + price : "Get Tickets for Free";

  const currentStep = useMemo(
    () => [
      {
        title: "Step 1 - Authentication",
        Component: (
          <LoginStep
            onRetrieveUser={(userId) => {
              setUserId(userId);
              setActiveIdx(1);
            }}
          />
        ),
      },
      {
        title: "Step 2 - Select Option",
        Component: (
          <OptionsStep
            {...{
              eventId,
              userId,
              onSuccess: () => setActiveIdx(price ? 2 : 3),
            }}
          />
        ),
      },
      {
        title: "Step 3 - Payment",
        Component: <PaymentStep onSuccess={() => setActiveIdx(3)} />,
      },
      {
        title: "See You There!",
        Component: <SuccessStep {...{ eventId }} />,
      },
    ],
    [eventId, userId, price]
  )[activeIdx];

  return (
    <Dialog.Root onOpenChange={(open) => (open ? null : setActiveIdx(0))}>
      <Dialog.Trigger>
        <Button>{label}</Button>
      </Dialog.Trigger>
      <Dialog.Content aria-describedby={undefined}>
        <Flex justify="between" align="center" mb="3">
          <Dialog.Title mb="0">{currentStep.title}</Dialog.Title>
          <Dialog.Close>
            <IconButton variant="ghost" mx="3" color="crimson">
              <Icon icon="akar-icons:cross" width="24px" />
            </IconButton>
          </Dialog.Close>
        </Flex>
        {currentStep.Component}
      </Dialog.Content>
    </Dialog.Root>
  );
}
