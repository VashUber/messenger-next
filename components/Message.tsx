import { Paper, Text } from "@mantine/core";
import type { FC } from "react";

const Message: FC<{ text: string }> = ({ text }) => {
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
      }}
    >
      <Text>{text}</Text>
    </Paper>
  );
};

export default Message;
