import { useMutation } from "@tanstack/react-query"
import { axiosInstance } from "../lib/axios"
import { toast } from "react-toastify"
import { useRef, useState } from "react"
import { Image, Send, X } from "lucide-react"
import { socket } from "../lib/socket"


export default function MessageInput({ id }: { id: number }) {
    // const [messageData, setMessageData] = useState<string[]>([])
    const [newMessage, setNewMessage] = useState("")
    const [imagePreview, setImagePreview] = useState<string | null>(null)

    // console.log(messageData)
    
    // React will store a reference to this DOM element in fileInputRef.current.
    const fileInputRef = useRef<HTMLInputElement | null>(null)

    const { mutate: sendMessage } = useMutation({
        mutationFn: async ({
            text,
            image
        }: {
            text: string,
            image: string
        }) => {
            const res = await axiosInstance.post(`/message/send/${id}`, {
                text,
                image
            })
            // setMessageData(prev => [...prev, text])
            socket.emit("sendMessage", res.data)
            // return res.data
        },
        onError: (err: any) => {
            toast.error(err.response.data.message || "Error sending message!")
        }
    })


    async function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0] || null

        if (!file)
            return
        readFileAsDataURL(file).then((base64Image) => {
            setImagePreview(base64Image as string)  //stores base64 encoded string
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
    function removeImage() {
        //remove the selected image
        setImagePreview(null)
    }

    //will call the mutation function to send message to backend
    async function handleSendMessage(e: any) {
        e.preventDefault()

        //don't do anything incase of no input message or image upload
        if (!newMessage.trim() && !imagePreview) return

        try {
            sendMessage({
                text: newMessage.trim(),
                image: imagePreview ?? ""
            })

            //clear form 
            setNewMessage("")
            setImagePreview(null)
            // clears the input field values 
            if (fileInputRef.current) fileInputRef.current.value = ""

        } catch (err) {
            console.log("error while sending message : ", err)
        }

    }


    return (
        <div className="p-4 w-full">
            {imagePreview && (
                <div className="mb-3 flex items-center gap-2">
                    <div className="relative">

                        <img src={imagePreview} alt="Preview" className="size-20 object-cover rounded-lg border border-zinc-700" />

                        <button onClick={removeImage} className="absolute top-1.5 right-1.5 size-5 rounded-full bg-base-300 flex items-center justify-center cursor-pointer hover:scale-105 transition duration-200">
                            <X className="size-3" />
                        </button>

                    </div>

                </div>
            )}

            <form onSubmit={handleSendMessage} >
                <div className="flex gap-2 justify-center items-center">
                    <input
                        type="text"
                        className="w-full input input-bordered rounded-lg input-sm sm:input-md "
                        placeholder="Type a message..."
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                    />
                    <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        ref={fileInputRef}
                        onChange={handleImageChange}
                    />
                    {/* This opens the file picker dialog without the user ever touching the actual <input type="file">. */}
                    <button type="button" className={`p-1 btn btn-circle ${imagePreview ? "text-emerald-500" : "text-zinc-400"}`} onClick={() => fileInputRef.current?.click()}>
                        <Image className="size-20" />
                    </button>
                    <button type="submit" className="btn btn-sm btn-circle"
                        disabled={!newMessage.trim() && !imagePreview}>
                        <Send size={22} />
                    </button>
                </div>
            </form>
        </div>
    )
}