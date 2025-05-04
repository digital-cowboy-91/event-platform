import { Button, Dialog, Flex, IconButton } from "@radix-ui/themes";
import Icon from "../Icon";

interface Props {
  onConfirm: () => void;
  disabled: boolean;
}

export default function DeleteProfileDialog({ onConfirm, disabled }: Props) {
  return (
    <Dialog.Root>
      <Dialog.Trigger>
        <Button variant="outline" color="crimson" disabled={disabled}>
          Delete
        </Button>
      </Dialog.Trigger>
      <Dialog.Content>
        <Flex justify="between" align="center" mb="3">
          <Dialog.Title mb="0">Dangerous operation</Dialog.Title>
          <Dialog.Close>
            <IconButton variant="ghost" mx="3" color="crimson">
              <Icon icon="akar-icons:cross" width="24px" />
            </IconButton>
          </Dialog.Close>
        </Flex>
        <Dialog.Description>
          You are about to delete your profile. This action cannot be undone. Do
          you want to continue?
        </Dialog.Description>
        <Flex justify="end">
          <Dialog.Close>
            <Button color="crimson" onClick={onConfirm}>
              Confirm
            </Button>
          </Dialog.Close>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  );
}
