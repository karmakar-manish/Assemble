import { useMutation, useQueryClient } from "@tanstack/react-query"
import { axiosInstance } from "../lib/axios"
import { toast } from "react-toastify"
import { useAuthUserHook } from "../hooks/useAuthUserHook"
import { Camera, Mail, User } from "lucide-react"
import { useState } from "react"

export default function ProfilePage() {
    const [selectedImg, setSelectedImg] = useState<string | null>(null)

    const { data: authUser } = useAuthUserHook()

    const queryClient = useQueryClient()

    const { mutate: updateProfileMutation, isPending } = useMutation({
        mutationFn: async ({ profilePicture }: { profilePicture: string }) => {
            console.log(profilePicture)
            const res = await axiosInstance.put("/user/update-profile", { profilePic: profilePicture })
            return res.data
        },
        onSuccess: () => {
            //again fetch user information
            queryClient.invalidateQueries({ queryKey: ["authUser"] })
            toast.success("Image uploaded successfully!")
        },
        onError: (err: any) => {
            toast.error(err.response.data.message || "Error while updating profile!")
        }
    })

    async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0] || null

        if (!file) return

        readFileAsDataURL(file).then((base64Image) => {
            setSelectedImg(base64Image as string) //stores base64 encoded string
            updateProfileMutation({ profilePicture: base64Image as string })    //call the mutation to update profile picture
        })
    }

    function readFileAsDataURL(file: File): Promise<string | ArrayBuffer | null> {
        return new Promise((resolve, reject) => {
            const reader = new FileReader()
            reader.onloadend = () => resolve(reader.result)
            reader.onerror = reject
            reader.readAsDataURL(file)
        })
    }


    return <div className="py-25 lg:px-30 bg-[#96a5c548]">
        <div className="bg-gray-900 max-w-xl mx-auto rounded-lg">
            <div className="mx-auto p-4 py-8">
                <div className="text-base-300">
                    <div className="text-center">
                        <h1 className="text-2xl font-semibold">Profile</h1>
                        <p className="mt-2 mb-5">Your profile information</p>
                    </div>

                    {/* avatar upload section  */}
                    <div className="flex flex-col items-center gap-4">
                        <div className="relative">
                            <img src={selectedImg || authUser.profilePicture || "/avatar.png"} alt="Profile" className="size-32 rounded-full border-4 object-cover" />

                            <label htmlFor="avatar-upload" className={`absolute bottom-0 right-0 bg-gray-300 p-1.5 hover:scale-105 cursor-pointer rounded-full transition-all duration-200 ${isPending ? "animate-pulse pointer-events-none" : ""}`}>
                                <Camera className="size-5 text-gray-800" />
                                <input type="file" id="avatar-upload" className="hidden" accept="image/*" onChange={handleImageUpload} disabled={isPending} />
                            </label>
                        </div>

                        <p className="text-sm text-zinc-400">
                            {isPending ? "Uploading..." : "Click the camera icon to update your photo"}
                        </p>
                    </div>

                    {/* User information */}
                    <div className="mt-10 px-20">
                        <div className="">
                            <div className="flex gap-2 items-center text-sm text-zinc-400">
                                <User className="size-4" />
                                Full Name
                            </div>
                            <p className="px-4 py-2.5 bg-base-200 rounded-lg border text-gray-700">{authUser.fullname}</p>
                        </div>

                        <div className="mt-3">
                            <div className="flex gap-2 items-center text-sm text-zinc-400">
                                <Mail className="size-4" />
                                Email Address
                            </div>
                            <p className="px-4 py-2.5 bg-base-200 rounded-lg border text-gray-700">{authUser.email}</p>
                        </div>
                    </div>

                    <div className="mt-6 px-20 rounded-xl p-6">
                        <h2 className="text-lg font-medium mb-4">Account Information </h2>
                        <div className="space-y-3 text-sm">
                            <div className="flex items-center justify-between py-2 border-b border-zinc-700">
                                <span>Member Since</span>
                                <span >{authUser.createdAt?.split("T")[0]}</span>
                            </div>
                            <div className="flex items-center justify-between py-2">
                                <span>Account Status</span>
                                <span className="text-green-500">Active</span>
                            </div>
                        </div>
                    </div>


                </div>
            </div>
        </div>
    </div>
}