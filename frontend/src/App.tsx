import './App.css'
import { Routes, Route } from 'react-router-dom'
import { Login, Register } from './components/page/user'
import ChannelList from './components/layout/ChannelList'
import ServerList from './components/layout/ServerList'
import ChatWindow from './components/layout/ChatWindow'

function Home() {
  return (
    <div className="flex h-screen">
      <ServerList />
      <ChannelList />
      <ChatWindow />
    </div>

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
