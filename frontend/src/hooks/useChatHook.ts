import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../lib/axios";
import { toast } from "react-toastify";
import { useAuthUserHook } from "./useAuthUserHook";


//to fetch all the users
export function useSidebarUserHook() {
    const {data: authUser} = useAuthUserHook()

    return useQuery({
        queryKey: ["sidebarUsers", authUser?.id],
        queryFn: async () => {
            try {
                const res = await axiosInstance.get("/message/users")
                // console.log("sidebar: ", res.data);
                return res.data

            } catch (err: any) {
                toast.error(err.response.data.message || "Something went wrong")
                return null;
            }
        },
        enabled: !!authUser?.id //only run if the authUser is there
    })
}


//hook to fetch all the messages of the selected user
export function useGetMessagesHook(selectedUserId: number) {
    
    return useQuery({
        queryKey: ["userMessages", selectedUserId],
        queryFn: async () => {
            if(!selectedUserId) return null //safeguard

            try {
                const res = await axiosInstance.get(`/message/${selectedUserId}`)

                // console.log("Messages: ", res.data)
                return res.data

            } catch (err: any) {
                toast.error(err.response.data.message || "Something went wrong")
                return null;
            }
        },
        enabled: !!selectedUserId //only run if we have the userId
    })
}