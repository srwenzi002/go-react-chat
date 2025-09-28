// src/components/layout/MainLayout.tsx
import ServerList from "./ServerList";
import ChannelList from "./ChannelList";
import ChatWindow from "./ChatWindow";

export default function MainLayout() {
  return (
    <div className="flex h-screen">
      <ServerList />
      <ChannelList />
      <ChatWindow />
    </div>
  );
}
