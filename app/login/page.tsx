import { Box, Card } from "@radix-ui/themes";
import SignInUp from "../_components/login/SignInUp";

export default function page() {
  return (
    <Box mx="auto" maxWidth="500px">
      <Card style={{ boxShadow: `var(--shadow-4)`, padding: "var(--space-6)" }}>
        <SignInUp />
      </Card>
    </Box>
  );
}
