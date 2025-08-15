import { PrismaClient } from "@prisma/client"
import cloudinary from "../lib/cloudinary"
const client = new PrismaClient()


export async function getUsersForSidebar(req: any, res: any) {
    try {
        //set by the middleware
        const loggedInUserId = req.user.id

        //get all the user's from the database except for the current user
        const currentUser = await client.userSchema.findMany({
            where: {
                id: { not: loggedInUserId }
            },
            select: {
                id: true,
                email: true,
                fullname: true,
                profilePicture: true,
                createdAt: true,
                updatedAt: true
            }
        })

        return res.status(200).json(currentUser)
    }
    catch (err) {
        console.log(`Error from getUsersForSidebar route ${err}`);
        return res.status(500).json({ message: "Internal Server Error" })
    }
}

//function to get the messages between 2 users
export async function getMessages(req: any, res: any) {
    try {
        //get the id from the params with whom you want to chat
        const userToChatId  = parseInt(req.params.id)
        const myId = parseInt(req.user.id)

        //get all the messages that the current user sent or recieved or vice-versa
        const messages = await client.messageSchema.findMany({
            where: {
                OR: [
                    {
                        AND: [
                            { senderId: myId },
                            { receiverId: userToChatId }
                        ],
                    },
                    {
                        AND: [
                            { senderId: userToChatId },
                            { receiverId: myId }
                        ],
                    }
                ]
            }
        })

        //return all the messages
        return res.status(200).json(messages)

    } catch (err) {
        console.log(`Error from getMessages route ${err}`);
        return res.status(500).json({ message: "Internal Server Error" })
    }
}

//route to send messages
export async function sendMessages(req: any, res: any) {
    try {
        const { text, image } = req.body  //the text and image sent in the body
        const { id: receiverId } = req.params
        const myId = req.user.id
        
        let imageUrl=""
        //incase image is uploaded
        if (image) {
            const result = await cloudinary.uploader.upload(image)
            imageUrl = result.secure_url
            // console.log("imageUrl : ", imageUrl);
        }

        //create a new entry in the messageSchema table
        const newMessage = await client.messageSchema.create({
            data: {
                senderId: myId,
                receiverId: parseInt(receiverId),
                text: text,
                image: imageUrl || ""
            }
        })

        // console.log("New message: ", newMessage);

        //todo: realtime functionality
        
        res.status(200).json(newMessage)


    } catch (err) {
        console.log(`Error from sendMessages route ${err}`);
        return res.status(500).json({ message: "Internal Server Error" })
    }

}