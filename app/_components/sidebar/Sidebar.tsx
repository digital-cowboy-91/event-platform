import getAuthedPermission from "@/app/_lib/auth/controller/getAuthedPermission.action";
import { PersonIcon } from "@radix-ui/react-icons";
import { Avatar, VisuallyHidden } from "@radix-ui/themes";
import Link from "next/link";
import { Dialog } from "radix-ui";
import CMSMenu from "./CMSMenu";
import SessionButton from "./SessionButton";
import UserMenu from "./UserMenu";

export default async function Sidebar() {
  const { isAuthenticated, isAdmin, user } = await getAuthedPermission();

  if (!isAuthenticated)
    return (
      <Link href="/login">
        <Avatar fallback={<PersonIcon />} />
      </Link>
    );

  return (
    <Dialog.Root>
      <Dialog.Trigger>
        <Avatar fallback={user.email?.[0] || "U"} />
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50" />
        <Dialog.Content
          className="fixed right-0 inset-y-0 min-w-80 bg-white"
          asChild
          aria-describedby={undefined}
        >
          <aside style={{ padding: "var(--space-3)" }}>
            <VisuallyHidden>
              <Dialog.Title>User Menu</Dialog.Title>
            </VisuallyHidden>
            <SessionButton email={user?.email} />
            <UserMenu />
            {isAdmin && <CMSMenu />}
          </aside>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
