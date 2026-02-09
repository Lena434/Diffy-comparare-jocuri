import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import NavigationBar from './components/NavigationBar'

function App() {
  return (
    <>
      <NavigationBar />

      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>
    </>
  )
}

export default App
