"use client";

import {
  ProfileFormDefaultSchema,
  ProfileFormValidationSchema,
} from "@/app/_lib/db/schema/profile.schema";
import { Button, Flex, Text, TextField } from "@radix-ui/themes";
import { useForm } from "@tanstack/react-form";
import { Label } from "radix-ui";
import InputError from "../form/InputError";

export default function ProfileForm() {
  const form = useForm({
    defaultValues: ProfileFormDefaultSchema.safeParse({}).data,
    validators: {
      onSubmit: ProfileFormValidationSchema,
    },
    onSubmit: ({ value }) => {
      console.log({ value });
    },
  });

  return (
    <Flex direction="column" gap="3" asChild>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
      >
        <form.Field
          name="firstName"
          children={(field) => (
            <Label.Root>
              <Text>First Name</Text>
              <TextField.Root
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
              />
              <InputError error={field.state.meta.errors[0]} />
            </Label.Root>
          )}
        />
        <form.Field
          name="lastName"
          children={(field) => (
            <Label.Root>
              <Text>Last Name</Text>
              <TextField.Root
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
              />
              <InputError error={field.state.meta.errors[0]} />
            </Label.Root>
          )}
        />
        <Flex justify="between">
          <Button>Delete</Button>
          <Button>Save</Button>
        </Flex>
      </form>
    </Flex>
  );
}
