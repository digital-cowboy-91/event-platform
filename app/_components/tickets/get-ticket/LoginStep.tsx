import getAuthedPermission from "@/app/_lib/auth/controller/getAuthedPermission.action";
import { Button, Flex, Spinner, Text } from "@radix-ui/themes";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

interface Props {
  onRetrieveUser: (userId: string) => void;
}

export default function LoginStep({ onRetrieveUser }: Props) {
  const [auth, setAuth] = useState<Awaited<
    ReturnType<typeof getAuthedPermission>
  > | null>(null);
  const path = usePathname();

  console.log(path);

  useEffect(() => {
    const startTime = Date.now();

    getAuthedPermission()
      .then((res) => {
        const duration = Date.now() - startTime;

        return new Promise((resolve) =>
          setTimeout(() => resolve(res), 2000 - duration)
        ) as Promise<typeof res>;
      })
      .then((res) => {
        if (res.user) {
          onRetrieveUser(res.user.id);
        }

        setAuth(res);
      });
  }, [onRetrieveUser]);

  if (!auth) return <Spinner className="mx-auto" my="3" />;
  if (!auth.user)
    return (
      <Flex direction="column" gap="3">
        <Text>Please, login first to continue</Text>
        <Button>
          <Link href={`/login?redirect=${path}`}>Login</Link>
        </Button>
      </Flex>
    );

  return null;
}
