import { useQuery } from "@tanstack/react-query"
import { axiosInstance } from "../lib/axios"
import { toast } from "react-toastify";

//to check if the user is authenticated after every page refresh
export function useAuthUserHook() {
    return useQuery({
        queryKey: ["authUser"],
        queryFn: async () => {
            try {
                const res = await axiosInstance.get("/auth/check")
                // console.log(res.data);
                return res.data     //return the current User details

            } catch (err: any) {
                //for preventing popup for the first time
                if (err.response && err.response.status === 401)
                    return null;
                toast.error(err.response.data.message || "Something went wrong")
                
            }
        }
    })
}