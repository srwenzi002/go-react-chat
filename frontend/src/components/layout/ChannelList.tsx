import {
  Box,
  Text,
  List, // 复合组件模式
  Stack, // 用于布局和间距
} from "@chakra-ui/react";

// 模拟频道数据
const channels = ["general", "random", "dev", "music"];
// 模拟当前的活动频道
const activeChannel = "general";

export default function ChannelList() {
  const sidebarBg = "gray.800";
  const hoverBg = "gray.700";
  const activeBg = "purple.600";
  const activeColor = "white";

  return (
    <Stack
      w="220px"
      bg={sidebarBg}
      color="gray.200"
      p="4"
      minH="100dvh"
      gap="4" // 标题、列表和底部区域之间的间距
    >
      {/* 标题部分 */}
      <Text fontSize="md" color="gray.400" fontWeight="bold">
        频道
      </Text>

      {/* 频道列表 - 使用 List.Root 和 List.Item */}
      {/* 1. 移除 align="start"，因为对齐由外部 Stack 控制。 */}
      {/* 2. List.Root 内部的间距（如果 List 组件支持）通常是 `gap` 或 `spacing`。
             此处我们假设 `gap` 是正确的，如果遇到问题可以检查 List 组件的 API。*/}
      <List.Root gap="1" variant="plain" flex={1}>
        {channels.map((ch) => {
          const isActive = ch === activeChannel;

          return (
            <List.Item
              key={ch}
              px="3"
              py="2"
              rounded="md"
              cursor="pointer"
              // 样式保持不变
              bg={isActive ? activeBg : "transparent"}
              color={isActive ? activeColor : "gray.300"}
              _hover={
                !isActive
                  ? { bg: hoverBg, color: "white" }
                  : { opacity: 0.9 }
              }
              fontWeight={isActive ? "extrabold" : "semibold"}
              transition="all 0.2s ease-in-out"
              fontSize="sm"
            >
              <Text as="span" mr="2" color={isActive ? activeColor : "gray.500"}>
                #
              </Text>
              {ch}
            </List.Item>
          );
        })}
      </List.Root>

      {/* 底部信息区 */}
      <Box p="3" bg="gray.700" rounded="md">
        <Text fontSize="sm" fontWeight="bold">用户</Text>
        <Text fontSize="xs" color="gray.400">@CurrentUser</Text>
      </Box>
    </Stack>
  );
}