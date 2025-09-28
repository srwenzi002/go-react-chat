import './App.css'
import { Routes, Route } from 'react-router-dom'
import { Login, Register } from './components/page/user'
import ChannelList from './components/layout/ChannelList'
import ServerList from './components/layout/ServerList'
import ChatWindow from './components/layout/ChatWindow'
import { HStack  } from '@chakra-ui/react'

function Home() {
  return (
    <HStack gap={0}
      w="100%"
      h="100%"
      overflow="hidden" // 防止浏览器出现滚动条
      bg="gray.800"
      alignItems="stretch"
    >
      <ServerList />
      <ChannelList />
      <ChatWindow />
    </HStack>

  )
}

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/" element={<Home />} />
    </Routes>
  )
}

export default App
