import { Link } from "react-router-dom"
import { useAuthUserHook } from "../hooks/useAuthUserHook"
import { LogOut, MessageSquare, Settings, User } from "lucide-react"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { axiosInstance } from "../lib/axios"
import { toast } from "react-toastify"
import { socket } from "../lib/socket"

export default function Navbar() {
    const { data: authUser } = useAuthUserHook()

    const queryClient = useQueryClient()

    //function to logout
    const {mutate: logout} = useMutation({
        mutationFn: async()=>{
            await axiosInstance.post("/auth/logout")
        },
        onSuccess: ()=>{
            queryClient.invalidateQueries({queryKey: ["authUser"]})
            toast.success("Logged out successfully!")
            //disconnect the socket
            socket.disconnect();
        }
    })

    return (
        <header className="border border-b-gray-200 bg-gray-300 fixed w-full top-0 z-40 backdrop-blur-lg ">
            <div className="container mx-auto px-4 h-16">
                <div className="flex items-center justify-between h-full">
                    <div className="flex items-center gap-8">
                        <Link to="/" className="flex items-center gap-2.5 hover:opacity-80 transition-all">
                            <div className="size-9 rounded-lg bg-primary/10 flex items-center justify-center">
                                <MessageSquare className="w-5 h-5 text-primary" />
                            </div>
                            <h1 className="text-lg font-bold">Assemble</h1>
                        </Link>
                    </div>

                    <div className="flex items-center gap-2">
                        <Link to={"/settings"} className="btn btn-sm gap-2 transition-colors">
                            <Settings className="w-4 h-4" />
                            <span className="hidden sm:inline">Settings</span>
                        </Link>

                        {/* show them only if the user is authenticated */}

                        {authUser && (
                            <div className="flex gap-2">
                                <Link to={"/profile"} className="btn btn-sm gap-2">
                                    <User className="size-5" />
                                    <span className="hidden sm:inline">Profile</span>
                                </Link>

                                <button className="flex gap-2 items-center text-sm cursor-pointer bg-red-400 px-2 rounded-md hover:bg-red-300" onClick={()=>{logout()}}>
                                    <LogOut className="size-5"/>
                                    <span className="hidden sm:inline">Logout</span>
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </header>
    )
}