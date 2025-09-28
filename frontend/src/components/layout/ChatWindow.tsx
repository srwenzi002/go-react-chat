import { Box, VStack, HStack, Input, Button, Text } from "@chakra-ui/react";
import { useColorModeValue } from "@chakra-ui/system";
import { useState, useEffect, useRef } from "react";

const initialMessages = [
  { id: 1, user: "Alice", text: "Hello!" },
  { id: 2, user: "Bob", text: "Hi Alice!" },
];

export default function ChatWindow() {
  const [messages, setMessages] = useState(initialMessages);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const bg = useColorModeValue("gray.100", "gray.700");
  const inputBg = useColorModeValue("gray.200", "gray.600");

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages([...messages, { id: Date.now(), user: "You", text: input }]);
    setInput("");
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <VStack align="stretch" gap={0} flex={1} h="100dvh" bg={bg}>
      {/* 消息列表 */}
      <Box flex={1} overflowY="auto" p="4">
        {messages.map((msg) => (
          <HStack key={msg.id} align="start" gap="2" mb="2">
            <Text fontWeight="bold" color="blue.400">
              {msg.user}:
            </Text>
            <Text>{msg.text}</Text>
          </HStack>
        ))}
        <div ref={messagesEndRef} />
      </Box>

      {/* 输入框 */}
      <HStack p="3" borderTop="1px" borderColor="gray.300" bg={inputBg}>
        <Input
          placeholder="输入消息..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          bg={inputBg}
          rounded="md"
        />
        <Button colorScheme="blue" onClick={handleSend} px="6" rounded="md">
          发送
        </Button>
      </HStack>
    </VStack>
  );
}
