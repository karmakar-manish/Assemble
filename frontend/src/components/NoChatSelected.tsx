import { MessageSquare } from "lucide-react";

export default function NoChatSelected()
{
    return <div className="w-full flex justify-center items-center flex-1 flex-col p-16 bg-base-100/50">
        <div className="max-w-md text-center space-y-6">
            {/* Icon Display  */}
            <div className="flex justify-center gap-4 mb-4">
                <div className="relative">
                    <div className="size-16 rounded-2xl bg-primary/10 flex items-center justify-center animate-bounce"> 
                        <MessageSquare className="size-8 text-primary"/>
                    </div>
                </div>
            </div>

            {/* Welcome Text  */}
            <h2 className="text-2xl font-bold">Welcome to Assemble</h2>
            <p className="text-base-content/60">Select a conversation from the sidebar to start chatting</p>
        </div>
    </div>
}
