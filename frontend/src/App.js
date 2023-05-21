import { BrowserRouter, Routes, Route } from "react-router-dom"
import Auth from "./components/auth"
import Scan from "./components/scan"
import History from "./components/history"
import Result from "./components/result"
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Auth />}></Route>
        <Route path='/nmaper' element={<Scan />}></Route>
        <Route path='/history' element={<History />}></Route>
        <Route path='/result' element={<Result />}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
