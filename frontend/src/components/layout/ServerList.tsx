// src/components/layout/ServerList.tsx
import { VStack, Avatar, Tooltip, Box } from "@chakra-ui/react";
import { useState } from "react";

// 模拟服务器数据
const servers = [
  { name: "Home", color: "gray.500", icon: "🏠" },
  { name: "S1 Dev", color: "teal.400" },
  { name: "S2 Design", color: "orange.400" },
  { name: "S3 Music", color: "purple.400" },
  { name: "S4 Gaming", color: "blue.400" },
];

export default function ServerList() {
  const [activeServer, setActiveServer] = useState("Home");
  const avatarSize = "48px";

  return (
    <VStack
      gap="2"
      bg="gray.900"
      w="64px"
      py="4"
      align="center"
    >
      {servers.map((server) => {
        const isActive = server.name === activeServer;
        const isHome = server.name === "Home";

        return (
          <Tooltip.Root
            key={server.name}
            // ✅ 使用 positioning 属性来定义 placement（符合 v3 规范）
            positioning={{ placement: "right", gutter: 12 }}

          // ❌ 移除已被 Tooltip.Root 内部逻辑取代的属性
          // closeOnEscape, closeOnPointerDown 等通常不再需要显式设置
          >
            <Tooltip.Trigger asChild>
              <Box
                w={avatarSize}
                h={avatarSize}
                _hover={{ bg: "gray.700", rounded: "2xl" }}
                onClick={() => setActiveServer(server.name)}
                cursor="pointer"
                rounded={isActive ? "2xl" : "full"}
                transition="all 0.3s ease-in-out"
                position="relative"
              >
                {/* 1. 活动指示器（左侧长条） */}
                <Box
                  position="absolute"
                  left="-14px"
                  top="50%"
                  transform="translateY(-50%)"
                  w="4px"
                  h={isActive ? "28px" : "8px"}
                  bg="white"
                  rounded="full"
                  opacity={isActive ? 1 : 0}
                  transition="all 0.2s"
                />

                {/* 2. 服务器图标/头像 */}
                <Avatar.Root
                  bg={isHome ? "gray.700" : server.color}
                  fontSize={isHome ? "xl" : "md"}
                  w="full"
                  h="full"
                >
                  {/* ✅ 将 name 属性添加到 Avatar.Fallback */}
                  <Avatar.Fallback name={server.name}>
                    {isHome ? server.icon : server.name.charAt(0)}
                  </Avatar.Fallback>
                </Avatar.Root>
              </Box>
            </Tooltip.Trigger>

            {/* 提示内容（Tooltip.Content） */}
            <Tooltip.Content>{server.name}</Tooltip.Content>
          </Tooltip.Root>
        );
      })}
    </VStack>
  );
}