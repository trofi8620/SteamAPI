import Login from "./api/Login"
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import HomePage from "./HomePage"
import NotFound from "./NotFound"
import { SteamProvider } from "./api/SteamContext.jsx";
/* import CSS from "./App.css"; */


function App(){
  return (
    <>
    <SteamProvider>
      <BrowserRouter>
      <Routes>
        <Route path ="/HomePage" element = {<HomePage/>}/>
        <Route path="/login" element={<Login/>} />
        <Route path ="*" element = {<NotFound/>}/>
      </Routes>
      </BrowserRouter>
      </SteamProvider>
    </>
  )
}
export default App
