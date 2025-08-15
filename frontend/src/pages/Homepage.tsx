import SidebarComponent from "../components/SidebarComponent"
import NoChatSelected from "../components/NoChatSelected"
import ChatContainer from "../components/ChatContainer"
import { useState } from "react"


export default function Homepage() {

    //the user selected from the sidebar
    const [selectedUser, setSelectedUser] = useState<any>(null)

    return (
        <div className="bg-[#96a5c548] py-20 px-1 md:px-5 h-screen">
            <div className="flex bg-white items-center justify-center py-2 px-4 w-full rounded-lg">
                <div className="rounded-lg bg-base-100 w-full h-[calc(100vh-7rem)]">
                    <div className="border flex h-full rounded-lg overflow-hidden ">
                        <SidebarComponent onSelectedUser={setSelectedUser}/>
                        {!selectedUser ? <NoChatSelected/> : <ChatContainer user={selectedUser} setUser={setSelectedUser}/>}
                    </div>
                </div>
            </div>
        </div>
    )
}