import { Users} from "lucide-react"
import { useSidebarUserHook } from "../hooks/useChatHook"
import SidebarSkeleton from "./skeletons/SidebarSkeleton"

export default function SidebarComponent({onSelectedUser}: {
    onSelectedUser: (user:any) => void
}) {
    const { data: sidebarUsers, isLoading: isSidebarLoading} = useSidebarUserHook()

    // console.log("Sidebar : ", sidebarUsers)

    // const onlineUsers = []

    if (isSidebarLoading || !sidebarUsers)
        return <SidebarSkeleton />
    // return  <SidebarSkeleton/>

    return (
        <aside className="h-full w-20 lg:w-72 border-r border-slate-400 flex flex-col transition-all duration-200">
            <div className="border-b border-slate-400 w-full p-5">
                <div className="flex items-center gap-2">
                    <Users className="size-6" />
                    <span className="font-medium hidden lg:block">Contacts</span>
                </div>
                {/* TODO : Online filter  */}
            </div>
            <div className="overflow-y-auto w-full py-3">
                {sidebarUsers.length>0 ? ( sidebarUsers.map((user: any) => (
                    <button key={user.id} onClick={() => onSelectedUser(user)}
                        className="w-full p-3 flex items-center gap-3 hover:bg-base-300 cursor-pointer transition-colors ">
                        <div className="relative mx-auto lg:mx-0">
                            <img src={user.profilePicture || "/avatar.png"} alt={user.fullname} className="size-12 object-cover rounded-full" />
                            {/* online users  */}
                            { }
                        </div>
                        {/* </div> */}

                        {/* User info - only visible on larger screens  */}
                        <div className="hidden lg:block text-left min-w-0">
                            <div className="font-medium truncate">{user.fullname}</div>
                            <div className="text-sm text-zinc-400">
                                Online
                            </div>
                        </div>
                    </button>
                ))): (
                    <div className="p-5 text-gray-500">No contacts available</div>
                )}

                {/* filtered users  */}
                { }

            </div>
            {/* </div> */}
        </aside >
    )
}
