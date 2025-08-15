import jwt from "jsonwebtoken"
import { PrismaClient } from "@prisma/client"

const client = new PrismaClient()

export async function protectRoute(req:any, res:any, next:any)
{
    //get the token from the cookie
    const token = req.cookies?.token 

    if(!token)
        return res.status(401).json({message: "Unauthorized - No token provided!"})

    try{
        //decode the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as {id: number}

        //find the user from the database using the decoded token
        const user = await client.userSchema.findFirst({
            where: {
                id: decoded.id
            }
        })

        if(!user)
            return res.status(401).json({message: "User not found!"})
        
        //put the user in the request body and send to frontend
        req.user = user;
        next(); //call the next function
        
    }catch(err)
    {
        console.log("Error from auth middleware: ", err)
        return res.status(500).json({message: "Invalid token!"})
    }
}

//function to get the current user details set by the middleware
export function getCurrentUser(req:any, res:any)
{
    try{
        return res.json(req.user)
    }
    catch(err)
    {
        console.log("Error from getCurrentUser from auth middleware");
        return res.status(500).json({message: "Server error"})
    }
}