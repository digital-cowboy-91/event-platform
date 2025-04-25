"use client";

import signInWithEmail from "@/app/_lib/auth/controller/signInWithEmail.action";
import { SignInWithEmailSchema } from "@/app/_lib/auth/controller/signInWithEmail.schema";
import signUpWithEmail from "@/app/_lib/auth/controller/signUpWithEmail.action";
import { SignUpWithEmailSchema } from "@/app/_lib/auth/controller/signUpWithEmail.schema";
import { Button, Flex, Heading, TextField } from "@radix-ui/themes";
import { useForm } from "@tanstack/react-form";
import { useRouter, useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import InputError from "../form/InputError";

export default function SignInUp() {
  const [newUser, setNewUser] = useState(false);
  const router = useRouter();
  const redirect = useSearchParams().get("redirect");

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
        console.log("SignInUp", "onSubmit", { value, success });

        if (!success) {
          return;
        }

        router.replace(redirect ? redirect : "/my");
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
        <form.Field
          name="email"
          children={(field) => (
            <>
              <TextField.Root
                placeholder="Email"
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
              />
              <InputError error={field.state.meta.errors[0]} />
            </>
          )}
        />
        <form.Field
          name="password"
          children={(field) => (
            <>
              <TextField.Root
                placeholder="Password"
                type="password"
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
              />
              <InputError error={field.state.meta.errors[0]} />
            </>
          )}
        />
        {config.isNew && (
          <form.Field
            name="confirmPassword"
            children={(field) => (
              <>
                <TextField.Root
                  placeholder="Confirm Password"
                  type="password"
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                />
                <InputError error={field.state.meta.errors[0]} />
              </>
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
