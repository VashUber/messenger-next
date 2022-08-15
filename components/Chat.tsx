import { Box, Button, Container, Stack, Textarea } from "@mantine/core";
import { ChangeEvent, FC, useLayoutEffect, useRef, useState } from "react";
import Message from "./Message";
import { messageT } from "../types";
import { useGetUserQuery } from "../store/api";

interface ChatPropsI {
  messages: messageT[];
  onSend: (message: string) => void;
}

const Chat: FC<ChatPropsI> = ({ messages, onSend }) => {
  const { data: user } = useGetUserQuery();
  const [message, setMessage] = useState("");
  const onInput = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
  };

  const chat = useRef<HTMLDivElement>(null!);

  const handleClick = () => {
    onSend(message);
    setMessage("");
  };

  useLayoutEffect(() => {
    chat.current.scrollTo({
      top: chat.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages]);

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
          sx={(theme) => ({
            height: "100%",
            overflowY: "scroll",
            "::-webkit-scrollbar": {
              width: "3px",
              background: theme.colors.gray[9],
            },
            "::-webkit-scrollbar-thumb": {
              background: theme.colors.gray[7],
            },
          })}
          ref={chat}
        >
          {messages.map((message) => (
            <Message
              text={message.text}
              key={message.id}
              self={message.sender.email === user?.email}
            />
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
