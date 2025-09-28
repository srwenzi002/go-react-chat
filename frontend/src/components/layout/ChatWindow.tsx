import {
  Box,
  VStack,
  HStack,
  Input,
  Button,
  Text,
} from "@chakra-ui/react";
import { useState, useEffect, useRef } from "react";
import { useTheme } from "next-themes"; 

const initialMessages = [
  { id: 1, user: "Alice", text: "Hello! This is a longer test message from Alice." },
  { id: 2, user: "You", text: "I'm testing the new color mode implementation." },
];

export default function ChatWindow() {
  const [messages, setMessages] = useState(initialMessages);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // ✅ 使用 next-themes 的 useTheme 获取当前主题
  const { theme } = useTheme(); 
  const isDark = theme === 'dark';

  // --- 颜色变量定义：手动根据 isDark 选择颜色 ---
  const chatBg = isDark ? "gray.800" : "white"; // 聊天背景
  const inputContainerBg = isDark ? "gray.700" : "gray.50"; // 输入框容器背景
  const dividerColor = isDark ? "gray.700" : "gray.200"; // 分隔线颜色

  // 消息气泡颜色
  const otherMsgBg = isDark ? "gray.700" : "gray.200"; // 对方消息气泡
  const myMsgBg = isDark ? "blue.600" : "blue.500"; // 我的消息气泡
  const myMsgColor = "white"; // 我的消息字体颜色

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages([...messages, { id: Date.now(), user: "You", text: input }]);
    setInput("");
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <VStack align="stretch" gap={0} flex={1} h="100dvh" bg={chatBg}>
      {/* 消息列表 */}
      <VStack
        flex={1}
        overflowY="auto"
        p="4"
        gap="4"
        align="stretch"
      >
        {messages.map((msg) => {
          const isMe = msg.user === "You";
          
          return (
            <HStack 
              key={msg.id} 
              justify={isMe ? "flex-end" : "flex-start"} 
              align="start" 
            >
              <VStack align={isMe ? "flex-end" : "flex-start"} gap={0} maxW="70%"> 
                {/* 用户名 */}
                <Text 
                    fontSize="xs" 
                    color="gray.500" 
                    mb="1"
                    fontWeight="semibold"
                >
                    {isMe ? "你" : msg.user}
                </Text>

                {/* 消息气泡 */}
                <Box
                  bg={isMe ? myMsgBg : otherMsgBg}
                  color={isMe ? myMsgColor : "inherit"}
                  p="3"
                  rounded="xl"
                  borderTopLeftRadius={isMe ? "xl" : "sm"}
                  borderTopRightRadius={isMe ? "sm" : "xl"}
                  shadow="sm"
                >
                  <Text whiteSpace="pre-wrap">{msg.text}</Text>
                </Box>
              </VStack>
            </HStack>
          );
        })}
        <div ref={messagesEndRef} />
      </VStack>

      {/* 输入框区域 */}
      <HStack 
        p="3" 
        borderTop="1px" 
        borderColor={dividerColor} 
        bg={inputContainerBg}
      >
        <Input
          placeholder="输入消息..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          // 输入框背景根据主题手动设置
          bg={isDark ? "gray.600" : "white"} 
          rounded="lg" 
        />
        <Button 
          colorScheme="blue" 
          onClick={handleSend} 
          px="6" 
          rounded="lg"
          disabled={!input.trim()}
        >
          发送
        </Button>
      </HStack>
    </VStack>
  );
}