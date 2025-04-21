"use client";

import { Button, Flex, Heading, TextField } from "@radix-ui/themes";
import { useState } from "react";

export default function SignInUp() {
  const [newUser, setNewUser] = useState(false);

  const config = newUser
    ? {
        isNew: true,
        title: "Sign Up",
        modeLabel: "I already have an account",
        submitLabel: "Sign Up",
      }
    : {
        isNew: false,
        title: "Sign In",
        modeLabel: "I am new here",
        submitLabel: "Sign In",
      };

  return (
    <form>
      <Flex gap={"3"} direction={"column"}>
        <Heading mb="6">{config.title}</Heading>

        <TextField.Root placeholder="Email" />
        <TextField.Root placeholder="Password" type="password" />
        {config.isNew && (
          <TextField.Root placeholder="Confirm Password" type="password" />
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
