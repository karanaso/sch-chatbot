import "./index.css";
import PinComponent from "./container/PIN";
import { AppBar } from "./container/AppBar";
import { Routes, Route, BrowserRouter, Outlet } from 'react-router-dom';
import { ChatBot } from "./container/Chat";
import { DialogWarningNoAPIKey } from "./components/DialogWarningNoAPIKey";
import { SetAPIKey } from "./container/SetAPIKey";
import { ChatType } from "./lib/store";

function Layout() {
  return (
    <div className="flex flex-col w-full h-screen">
      <DialogWarningNoAPIKey />     
      <AppBar />
      <div className="flex flex-row w-full max-h-full p-4 flex-1 items-center justify-center overflow-hidden">
        <Outlet />
      </div>
    </div> 
  );
}
export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/chat" element={<ChatBot type={ChatType.Chat} />} />
          <Route path="/image" element={<ChatBot type={ChatType.Image} />} />
          <Route path="/explain" element={<ChatBot type={ChatType.Explain} />} />
          <Route path="/pin" element={<PinComponent />} />
          <Route path='/set-api-key' element={<SetAPIKey />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;