import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Routes, Route } from 'react-router-dom'
import { Login, Register } from './components/page/user'

function Home() {
  const [count, setCount] = useState(0)
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col items-center justify-center p-4">
      <div className="flex items-center justify-center space-x-6 mb-8">
        <a href="https://vite.dev" target="_blank" className="hover:opacity-80 transition-opacity">
          <img src={viteLogo} className="h-16 w-16" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank" className="hover:opacity-80 transition-opacity">
          <img src={reactLogo} className="h-16 w-16 animate-spin-slow" alt="React logo" />
        </a>
      </div>
      
      <h1 className="text-4xl font-bold text-gray-800 mb-6">Vite + React + Tailwind CSS</h1>
      
      <div className="bg-white rounded-xl shadow-lg p-6 mb-6 max-w-md w-full">
        <div className="text-center mb-4">
          <button
            onClick={() => setCount((count) => count + 1)}
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-6 rounded-lg transition-colors duration-300 shadow-md hover:shadow-lg"
          >
            count is {count}
          </button>
        </div>
        <p className="text-gray-600 text-center">
          Edit <code className="bg-gray-100 text-indigo-600 px-1 py-0.5 rounded">src/App.tsx</code> and save to test HMR
        </p>
      </div>
      
      <div className="bg-white rounded-xl shadow-lg p-6 max-w-md w-full">
        <h2 className="text-xl font-semibold text-gray-800 mb-3">Tailwind CSS 测试</h2>
        <div className="space-y-3">
          <div className="p-3 bg-red-100 text-red-800 rounded-lg">红色背景</div>
          <div className="p-3 bg-green-100 text-green-800 rounded-lg">绿色背景</div>
          <div className="p-3 bg-blue-100 text-blue-800 rounded-lg">蓝色背景</div>
          <div className="p-3 bg-yellow-100 text-yellow-800 rounded-lg">黄色背景</div>
        </div>
      </div>
      
      <p className="mt-8 text-gray-600 text-center">
        点击 Vite 和 React 徽标了解更多信息
      </p>
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
