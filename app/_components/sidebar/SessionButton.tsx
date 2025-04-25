"use client";

import signOut from "@/app/_lib/auth/controller/signOut.action";
import { LockClosedIcon, LockOpen2Icon } from "@radix-ui/react-icons";
import { Flex, IconButton, Text } from "@radix-ui/themes";
import { usePathname, useRouter } from "next/navigation";
import { VisuallyHidden } from "radix-ui";
import { useMemo, useState } from "react";

interface Props {
  email: string | undefined;
}

export default function SessionGroup({ email }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(false);

  const config = useMemo(
    () =>
      Boolean(email)
        ? {
            icon: <LockOpen2Icon />,
            label: "Sign Out",
            onClick: async () => {
              setIsLoading(true);
              await signOut()
                .then(() => router.replace("/"))
                .finally(() => {
                  setIsLoading(false);
                });
            },
            disabled: isLoading,
          }
        : {
            icon: <LockClosedIcon />,
            label: "Sign In",
            onClick: () => router.push(`/login?redirect=${pathname}`),
            disabled: pathname === "/login",
          },
    [router, email, pathname, isLoading]
  );

  return (
    <Flex justify={"between"}>
      <Text weight={"bold"}>{email}</Text>
      <IconButton
        variant="soft"
        onClick={config.onClick}
        disabled={config.disabled}
        loading={isLoading}
      >
        <VisuallyHidden.Root>{config.label}</VisuallyHidden.Root>
        {config.icon}
      </IconButton>
    </Flex>
  );
}
