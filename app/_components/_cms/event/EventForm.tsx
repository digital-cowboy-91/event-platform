"use client";

import postEvent from "@/app/_lib/db/controller/events/postEvent.action";
import { EventInsertSchema } from "@/app/_lib/db/schema/events.schema";
import { Button, Flex, Text, TextArea, TextField } from "@radix-ui/themes";
import { useForm } from "@tanstack/react-form";
import { useRouter } from "next/navigation";
import { Label } from "radix-ui";
import InputError from "../../form/InputError";

export default function EventForm() {
  const router = useRouter();
  const form = useForm({
    defaultValues: {
      title: "",
      description: "",
      location: "",
      startTime: "",
      duration: 60,
      capacity: 0,
      price: 0,
      coverImage: {} as File,
    },
    validators: {
      onSubmit: EventInsertSchema,
    },
    onSubmit: async ({ value }) => {
      const res = await postEvent(value);

      if (res.success) {
        router.replace(`/cms/events/${res.event.id}`);
      }
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
          name="title"
          children={(field) => (
            <>
              <Label.Root>
                <Text>Title</Text>
                <TextField.Root
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                />
              </Label.Root>
              <InputError error={field.state.meta.errors[0]} />
            </>
          )}
        />
        <form.Field
          name="description"
          children={(field) => (
            <>
              <Label.Root>
                <Text>Description</Text>
                <TextArea
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                />
              </Label.Root>
              <InputError error={field.state.meta.errors[0]} />
            </>
          )}
        />
        <form.Field
          name="location"
          children={(field) => (
            <>
              <Label.Root>
                <Text>Location</Text>
                <TextField.Root
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                />
              </Label.Root>
              <InputError error={field.state.meta.errors[0]} />
            </>
          )}
        />
        <form.Field
          name="startTime"
          children={(field) => (
            <>
              <Label.Root>
                <Text>Date & Time</Text>
                <TextField.Root
                  type="datetime-local"
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                />
              </Label.Root>
              <InputError error={field.state.meta.errors[0]} />
            </>
          )}
        />
        <form.Field
          name="duration"
          children={(field) => (
            <>
              <Label.Root>
                <Text>Duration</Text>
                <TextField.Root
                  type="number"
                  value={field.state.value}
                  onChange={(e) => field.handleChange(Number(e.target.value))}
                />
              </Label.Root>
              <InputError error={field.state.meta.errors[0]} />
            </>
          )}
        />
        <form.Field
          name="capacity"
          children={(field) => (
            <>
              <Label.Root>
                <Text>Capacity</Text>
                <TextField.Root
                  type="number"
                  value={field.state.value}
                  onChange={(e) => field.handleChange(Number(e.target.value))}
                />
              </Label.Root>
              <InputError error={field.state.meta.errors[0]} />
            </>
          )}
        />
        <form.Field
          name="price"
          children={(field) => (
            <>
              <Label.Root>
                <Text>Price</Text>
                <TextField.Root
                  type="number"
                  value={field.state.value}
                  onChange={(e) => field.handleChange(Number(e.target.value))}
                />
              </Label.Root>
              <InputError error={field.state.meta.errors[0]} />
            </>
          )}
        />
        <form.Field
          name="coverImage"
          children={(field) => (
            <>
              <Label.Root>
                <Text>Cover Image</Text>
                <input
                  type="file"
                  onChange={(e) =>
                    field.handleChange(e.target.files?.[0] ?? ({} as File))
                  }
                />
              </Label.Root>
              <InputError error={field.state.meta.errors[0]} />
            </>
          )}
        />
        <Flex>
          <Button disabled={form.state.isSubmitting}>Save</Button>
        </Flex>
      </form>
    </Flex>
  );
}
