import { Box, Text, List } from "@chakra-ui/react";

const channels = ["general", "random", "dev", "music"];

export default function ChannelList() {
  return (
    <Box
      w="220px"
      bg="gray.800"
      color="gray.200"
      p="4"
      minH="100dvh"
      display="flex"
      flexDirection="column"
    >
      <Text fontSize="sm" color="gray.400" mb="2" fontWeight="bold">
        频道
      </Text>

      <List.Root gap="1" variant="plain" align="start" flex={1}>
        {channels.map((ch) => (
          <List.Item
            key={ch}
            px="3"
            py="2"
            rounded="md"
            cursor="pointer"
            _hover={{ bg: "gray.700", color: "white" }}
            fontWeight="semibold"
            transition="all 0.2s"
          >
            # {ch}
          </List.Item>
        ))}
      </List.Root>
    </Box>
  );
}
