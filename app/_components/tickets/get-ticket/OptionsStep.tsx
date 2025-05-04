"use client";

import createTicketBulk from "@/app/_lib/db/controller/tickets/createTicketBulk.action";
import { Box, Button, Flex, Grid, Text, TextField } from "@radix-ui/themes";
import { useForm } from "@tanstack/react-form";
import { Label } from "radix-ui";
import InputError from "../../form/InputError";

interface Props {
  eventId: string;
  userId: string;
  onSuccess: () => void;
}

export default function OptionsStep({ eventId, userId, onSuccess }: Props) {
  const form = useForm({
    defaultValues: {
      quantity: 1,
    },
    onSubmit: async ({ value }) => {
      try {
        const res = await createTicketBulk(eventId, userId, value.quantity);

        if (res.success) return onSuccess();
      } catch {}
    },
  });

  return (
    <Grid asChild columns="max-content 1fr" gap="3">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
      >
        <form.Field
          name="quantity"
          children={(field) => (
            <Label.Root className="grid grid-cols-subgrid col-span-2">
              <Text>Quantity</Text>
              <Box>
                <TextField.Root
                  value={field.state.value}
                  type="number"
                  onChange={(e) => field.handleChange(parseInt(e.target.value))}
                />
                <InputError error={field.state.meta.errors[0]} />
              </Box>
            </Label.Root>
          )}
        />
        <Flex className="col-span-2" justify="end" gap="3">
          <Button>Get</Button>
        </Flex>
      </form>
    </Grid>
  );
}
