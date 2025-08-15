import { X } from "lucide-react";

export default function ChatHeader({ user, setUser }:
    {
        user: any,
        setUser: (user: any) => void
    }) {

    return (
        <div className="p-2.5 border-b shadow-lg border-base-300">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    {/* Avatar  */}
                    <div className="avatar">
                        <div className="size-10 rounded-full relative">
                            <img src={user.profilePicture || "/avatar.png"} alt={user.fullname} />
                        </div>
                    </div>

                    {/* User information  */}
                    <div>
                        <h3 className="font-medium ">{user.fullname}</h3>
                        <p className="text-sm text-base-content/70">Online</p>
                    </div>
                </div>

                {/* Close button  */}
                <button className="text-red-400 hover:scale-105 hover:text-red-500 transition-all duration-200 cursor-pointer" onClick={() => setUser(null)}>
                    <X />
                </button>
            </div>
        </div>
    )
}