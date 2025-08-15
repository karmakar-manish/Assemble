import cloudinary from "../lib/cloudinary";
import { PrismaClient } from "@prisma/client";
const client = new PrismaClient()


export async function updateProfile(req:any, res:any)
{
    try{
        const {profilePic} = req.body
        if(!profilePic)
            return res.status(400).json({message: "Profile pic is required"})

        const userId = req.user?.id;    ///set by the middleware

        //upload profile picture
        const result = await cloudinary.uploader.upload(profilePic)
        
        const updatedUser = await client.userSchema.update({
            where: {id: userId},
            data: {
                profilePicture: result.secure_url
            }
        })

        return res.json(updatedUser)

    }catch(err)
    {
        console.log("Error from updateProfile route");
        return res.status(500).json({message: "Internal Server Error!"})
    }
}