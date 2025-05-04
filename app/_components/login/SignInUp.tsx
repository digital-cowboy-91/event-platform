"use client";

import signInWithEmail from "@/app/_lib/auth/controller/signInWithEmail.action";
import { SignInWithEmailSchema } from "@/app/_lib/auth/controller/signInWithEmail.schema";
import signUpWithEmail from "@/app/_lib/auth/controller/signUpWithEmail.action";
import { SignUpWithEmailSchema } from "@/app/_lib/auth/controller/signUpWithEmail.schema";
import { Button, Flex, Heading, Text, TextField } from "@radix-ui/themes";
import { useForm } from "@tanstack/react-form";
import { useRouter, useSearchParams } from "next/navigation";
import { Label } from "radix-ui";
import { useMemo, useState } from "react";
import InputError from "../form/InputError";

export default function SignInUp() {
  const [newUser, setNewUser] = useState(false);
  const router = useRouter();
  const redirect = useSearchParams().get("redirect");

  console.log("rerender");

  const config = useMemo(
    () =>
      newUser
        ? {
            isNew: true,
            title: "Sign Up",
            modeLabel: "I already have an account",
            submitLabel: "Sign Up",
            form: {
              defaultValues: {
                firstName: "",
                lastName: "",
                email: "",
                password: "",
                confirmPassword: "",
              },
              validator: SignUpWithEmailSchema,
              submitFn: signUpWithEmail,
            },
          }
        : {
            isNew: false,
            title: "Sign In",
            modeLabel: "I am new here",
            submitLabel: "Sign In",
            form: {
              defaultValues: {
                email: "",
                password: "",
              },
              validator: SignInWithEmailSchema,
              submitFn: signInWithEmail,
            },
          },
    [newUser]
  );

  const form = useForm({
    defaultValues: config.form.defaultValues,
    validators: { onSubmit: config.form.validator },
    onSubmit: async ({ value }) => {
      config.form.submitFn(value).then(({ success }) => {
        if (!success) {
          return;
        }

        router.replace(redirect ? redirect : "/my/profile");
      });
    },
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        form.handleSubmit();
      }}
    >
      <Flex gap={"3"} direction={"column"}>
        <Heading mb="6">{config.title}</Heading>
        {config.isNew && (
          <>
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
          </>
        )}
        <form.Field
          name="email"
          children={(field) => (
            <Label.Root>
              <Text>Email</Text>
              <TextField.Root
                type="email"
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
              />
              <InputError error={field.state.meta.errors[0]} />
            </Label.Root>
          )}
        />
        <form.Field
          name="password"
          children={(field) => (
            <Label.Root>
              <Text>Password</Text>
              <TextField.Root
                type="password"
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
              />
              <InputError error={field.state.meta.errors[0]} />
            </Label.Root>
          )}
        />
        {config.isNew && (
          <form.Field
            name="confirmPassword"
            children={(field) => (
              <Label.Root>
                <Text>Confirm Password</Text>
                <TextField.Root
                  type="password"
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                />
                <InputError error={field.state.meta.errors[0]} />
              </Label.Root>
            )}
          />
        )}
        <Flex justify={"end"} gap="3" mt={"6"}>
          <Button
            variant="soft"
            onClick={() => setNewUser(!newUser)}
            type="button"
          >
            {config.modeLabel}
          </Button>
          <Button>{config.submitLabel}</Button>
        </Flex>
      </Flex>
    </form>
  );
}
