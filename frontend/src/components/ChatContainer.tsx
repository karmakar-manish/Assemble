import { useEffect, useRef } from "react"
import { useGetMessagesHook } from "../hooks/useChatHook"
import { useQueryClient } from "@tanstack/react-query"
import ChatHeader from "./ChatHeader"
import MessageInput from "./MessageInput"
import MessageSkeleton from "./skeletons/MessageSkeleton"
import { useAuthUserHook } from "../hooks/useAuthUserHook"
import { formatMessageTime } from "../lib/utils"
import { socket } from "../lib/socket"

export default function ChatContainer({
    user,
    setUser
}: {
    user: any,
    setUser: React.Dispatch<React.SetStateAction<any>>
}) {
    const queryClient = useQueryClient()

    //fetch the messages of the selected user
    const { data: userMessages, isLoading } = useGetMessagesHook(user.id)
    const { data: authUser } = useAuthUserHook()
    
    //for vertically sliding incase of new message
    const messageEndRef = useRef(null)

    //function to scroll to the bottom of the message
    function scrollToBottom(){
        if(messageEndRef.current)
        {
            (messageEndRef.current as HTMLElement).scrollIntoView({behavior: "smooth"})
        }
    }

    useEffect(()=>{
        scrollToBottom()
    }, [userMessages])

    // fetch the selected user's messages 
    useEffect(() => {
        if (!authUser) return

        //join socket room on mount
        socket.emit("join", authUser.id)

        const handleReceive = (newMessage: any) => {
            queryClient.setQueryData(
                ["userMessages", newMessage.senderId === authUser.id ? newMessage.receiverId : newMessage.senderId],
                (old: any) => {
                    if (!old) return [newMessage];
                    return [...old, newMessage];
                }
            );
        };
        
        //auto scroll on new message
        // scrollToBottom()    
        
        //listen for new messages
        socket.on("receiveMessage", handleReceive)

        return () => {
            socket.off("receiveMessage", handleReceive);
        };
    }, [authUser, user.id, queryClient])

    //whenever there is a new message


    if (isLoading) {
        return (
            <div className="w-full flex flex-col">
                <ChatHeader user={user} setUser={setUser} />

                <div className="flex-1 h-full overflow-y-auto" >
                    <MessageSkeleton />
                </div>
                <div className="">
                    <MessageInput id={user.id} />

                </div>
            </div>
        )
    }

    return (
        <div className="flex-1 flex flex-col">

            <ChatHeader user={user} setUser={setUser} />

            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {userMessages?.map((message: any) => (
                    <div key={message.id} className={`chat ${message.senderId === authUser?.id ? "chat-end" : "chat-start"}`} >
                        <div className="chat-image avatar">
                            <div className="size-10 rounded-full border">
                                {/* displaying the profile pic of the user who sent the message  */}
                                <img src={message.senderId === authUser?.id ? authUser.profilePicture || "/avatar.png" : user.profilePicture || "/avatar.png"} alt="profile pic" />
                            </div>
                        </div>
                        {/* Time  */}
                        <div className="chat-header mb-1">
                            <time className="text-xs opacity-50 ml-1">{formatMessageTime(message.createdAt)}</time>
                        </div>

                        {/* Chat bubble  */}
                        <div className="chat-bubble flex flex-col">
                            {message.image && (
                                <img
                                    src={message.image}
                                    alt="Attachment"
                                    className="sm:max-w-[200px] rounded-md mb-2"
                                />
                            )}
                            {message.text && <p>{message.text}</p>}

                        </div>

                    </div>
                ))}

                {/* Invisible div for auto scroll  */}
                <div ref={messageEndRef}/>

            </div>

            <MessageInput id={user.id} />

        </div>
    )
}
