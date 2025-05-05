"use client";

import deleteCurrentProfile from "@/app/_lib/db/controller/profile/deleteCurrentProfile";
import patchCurrentProfile from "@/app/_lib/db/controller/profile/patchCurrentProfile";
import {
  ProfileFormDefaultSchema,
  ProfileFormValidationSchema,
  ProfileRecord,
} from "@/app/_lib/db/schema/profile.schema";
import { Button, Flex, Text, TextField } from "@radix-ui/themes";
import { useForm } from "@tanstack/react-form";
import { useRouter } from "next/navigation";
import { Label } from "radix-ui";
import InputError from "../form/InputError";
import DeleteProfileDialog from "./DeleteProfileDialog";

type SubmitMeta = {
  action: "update" | "delete" | null;
};

interface Props {
  profileData: ProfileRecord;
}

export default function ProfileForm({ profileData }: Props) {
  const router = useRouter();

  const form = useForm({
    defaultValues: ProfileFormDefaultSchema.safeParse(profileData).data,
    validators: {
      onSubmit: ProfileFormValidationSchema,
    },
    onSubmitMeta: { action: "update" } as SubmitMeta,
    onSubmit: async ({ value, meta }) => {
      if (meta.action === "update") return patchCurrentProfile(value);
      if (meta.action === "delete")
        return deleteCurrentProfile().then((res) => {
          if (res.success) {
            router.replace("/login");
          }
        });
    },
  });

  return (
    <Flex direction="column" gap="3" asChild>
      <form onSubmit={(e) => e.preventDefault()}>
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
          <DeleteProfileDialog
            onConfirm={() => form.handleSubmit({ action: "delete" })}
            disabled={form.state.isSubmitting}
          />

          <Button
            disabled={form.state.isSubmitting}
            onClick={() => form.handleSubmit({ action: "update" })}
            loading={form.state.isSubmitting}
          >
            Save
          </Button>
        </Flex>
      </form>
    </Flex>
  );
}
