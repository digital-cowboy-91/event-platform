import { Button, VisuallyHidden } from "@radix-ui/themes";
import { Dialog } from "radix-ui";

export default function Sidebar() {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <Button>Sidebar</Button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50" />
        <Dialog.Content
          className="fixed right-0 inset-y-0 w-1/3 bg-white"
          asChild
        >
          <aside>
            <VisuallyHidden>
              <Dialog.Title>User Menu</Dialog.Title>
            </VisuallyHidden>
          </aside>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
