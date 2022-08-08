import { Box, Button, Container, Stack, Textarea } from "@mantine/core";
import { ChangeEvent, FC, useState } from "react";
import Message from "./Message";
import { messageT } from "../types";

interface ChatPropsI {
  messages: messageT[];
  onSend: (message: string) => void;
}

const Chat: FC<ChatPropsI> = ({ messages, onSend }) => {
  const [message, setMessage] = useState("");
  const onInput = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
  };

  const handleClick = () => {
    onSend(message);
    setMessage("");
  };

  return (
    <Container
      sx={{
        height: "100%",
      }}
    >
      <Stack
        justify="flex-end"
        sx={{
          height: "100%",
        }}
      >
        <Stack
          px={15}
          sx={{
            height: "100%",
          }}
        >
          {messages.map((message) => (
            <Message text={message.text} key={message.id} />
          ))}
        </Stack>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            flexDirection: "row",
            gap: "20px",
          }}
        >
          <Textarea
            placeholder="Message..."
            value={message}
            onChange={onInput}
            sx={{
              flexGrow: 1,
            }}
            autosize
            minRows={2}
            maxRows={4}
          />
          <Button onClick={handleClick}>send</Button>
        </Box>
      </Stack>
    </Container>
  );
};

export default Chat;
