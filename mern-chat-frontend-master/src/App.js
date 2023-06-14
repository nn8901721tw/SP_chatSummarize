import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Chat from "./pages/Chat";
import Process from "./pages/Process";
import Statistics from "./pages/Statistics";
import AddTopic from "./pages/AddTopic";
import { useSelector } from "react-redux";
import { useState } from "react";
import { AppContext, socket } from "./context/appContext";
import InferenceResult from './pages/InferenceResult';
import WordcloudResult from "./pages/WordcloudResult";
import CombineResult from "./pages/CombineResult";

function App() {
    const [rooms, setRooms] = useState([]);
    const [currentRoom, setCurrentRoom] = useState([]);
    const [members, setMembers] = useState([]);
    const [messages, setMessages] = useState([]);
    const [privateMemberMsg, setPrivateMemberMsg] = useState({});
    const [newMessages, setNewMessages] = useState({});
    const user = useSelector((state) => state.user);
    const [showinferenceData, showInferenceData] = useState([]);
    return (
        <AppContext.Provider value={{ socket, currentRoom, setCurrentRoom, members, setMembers, messages, setMessages, privateMemberMsg, setPrivateMemberMsg, rooms, setRooms, newMessages, setNewMessages, showinferenceData, showInferenceData }}>
            <BrowserRouter>
                <Navigation />
                <Routes>
                    <Route path="/" element={<Home />} />
                    {!user && (
                        <>
                            <Route path="/login" element={<Login />} />
                            <Route path="/signup" element={<Signup />} />
                        </>
                    )}
                    <Route path="/chat" element={<Chat />} />
                    <Route path="/process" element={<Process />} />
                    <Route path="/statistics" element={<Statistics />} />
                    <Route path="/addTopic" element={<AddTopic />} />
                    <Route path="/inferenceResult" props={InferenceResult} element={<InferenceResult />} />
                    <Route path="/wordcloudResult" props={WordcloudResult} element={<WordcloudResult />} />
                    <Route path="/combineResult" props={CombineResult} element={<CombineResult />} />
                </Routes>
            </BrowserRouter>
        </AppContext.Provider>
    );
}

export default App;
