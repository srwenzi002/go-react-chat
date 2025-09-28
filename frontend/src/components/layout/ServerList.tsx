// src/components/layout/ServerList.tsx
import { VStack, Avatar, Tooltip, Box } from "@chakra-ui/react";

const servers = [
  { name: "S1", color: "teal.400" },
  { name: "S2", color: "orange.400" },
  { name: "S3", color: "purple.400" },
  { name: "S4", color: "blue.400" },
];

export default function ServerList() {
  return (
    <VStack
      gap="3"
      bg="gray.900"
      w="64px"
      minH="100dvh"
      py="3"
      align="center"
    >
      {servers.map((server) => (
        <Tooltip.Root
          key={server.name}
          positioning={{ placement: "right" }}
          closeOnEscape
          closeOnPointerDown
        >
          <Tooltip.Trigger asChild>
            <Box
              _hover={{ bg: "gray.700" }}
              rounded="full"
              p="1"
              transitionProperty="background"
              transitionDuration="0.2s"
            >
              <Avatar.Root 
                bg={server.color}
                size="lg"
                cursor="pointer"
              >
                <Avatar.Fallback name = {server.name} />
              </Avatar.Root  >
            </Box>
          </Tooltip.Trigger>
          <Tooltip.Content>{server.name}</Tooltip.Content>
        </Tooltip.Root>
      ))}
    </VStack>
  );
}
