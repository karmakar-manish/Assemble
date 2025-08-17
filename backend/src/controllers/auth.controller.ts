import bcrypt from "bcryptjs"
import { PrismaClient } from "@prisma/client"
import generateToken_Cookie from "../lib/utils"
const client = new PrismaClient()

//signup function 
export async function signup(req:any, res:any)
{

    const {fullname, email, password, uid} = req.body
    if(!fullname || !email || !password || !uid)
        return res.status(400).json({message: "All fields are required!"})

    try{
        //check if the email is already taken
        const existingEmail = await client.userSchema.findFirst({
            where: {
                email: email
            }
        })
        
        //incase email is already there
        if(existingEmail)
            return res.status(400).json({message: "Email already taken"})


        //check the password length
        if(password.length < 6)
            return res.status(400).json({message:"Password must be atleast 6 characters"})

        //hash the password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password,salt)

        //create a new User
        const newUser = await client.userSchema.create({
            data: {
                fullname: fullname, 
                email: email,
                uid: uid,
                password: hashedPassword
            }
        })

        //generate the token and get the cookie
        const token = generateToken_Cookie({userId: newUser.id, res})

        return res.status(200).json({
            message: "User registered successfully!",
            token: token
        })

    }catch(err)
    {
        console.log("Error from signup route: ", err);
        return res.status(500).json({message: "Internal server error"})
    }
}

//login function 
export async function login(req:any, res:any)
{
    const {email, password} = req.body;
    if(!email || !password)
        return res.status(400).json({message:"All fields are required!"})

    try{
        //check if user exists with given email
        const user = await client.userSchema.findFirst({
            where: {
                email: email
            }
        })

        if(!user)
            return res.status(400).json({message:"Invalid credentials!"})
        
        const isMatch = await bcrypt.compare(password, user.password)
        //incase password doesnot match
        if(!isMatch)
            return res.status(400).json({message:"Invalid credentials!"})

        const token = generateToken_Cookie({userId: user.id, res})

        //return the token
        return res.json({
            message: "Logged in successfully!"
        })

    }catch(err)
    {
        console.log("Error from login route: ", err);
        return res.status(500).json({message: "Internal server error"})
    }
}

//login with google provider
export async function providerLogin(req:any, res:any)
{
    //get the uid from the body
    const uid = req.body.uid 

    if(!uid)
        return res.status(400).json({message:"Invalid email"})

    //find the user with the given uid in database
    const user = await client.userSchema.findFirst({
        where: {
            uid: uid
        }
    })

    //incase no user is found
    if(!user)
        return res.status(400).json({message:"No account found. Signup instead!"})

    //create jwt token and store in cookie
    const token = generateToken_Cookie({userId: user.id, res})

    //return
    return res.json({
        message: "Logged in successfully!"
    })
}

//logout function 
export async function logout(req:any, res:any)
{
    //clear the cookies
    res.clearCookie("token")

    return res.json({message: "Logged out successfully!"})
}
