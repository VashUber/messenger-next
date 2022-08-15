import { Paper, Text } from "@mantine/core";
import { FC, memo } from "react";

const Message: FC<{ text: string; self: boolean }> = memo(({ text, self }) => {
  return (
    <Paper
      shadow="xs"
      radius="lg"
      px="lg"
      py="xs"
      withBorder
      sx={{
        maxWidth: "250px",
        width: "min-content",
        marginLeft: self ? "auto" : "",
      }}
    >
      <Text>{text}</Text>
    </Paper>
  );
});

Message.displayName = "Message";

export default Message;
