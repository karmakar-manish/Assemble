import jwt from "jsonwebtoken"

export default function generateToken_Cookie({userId, res}: {
    userId: number,
    res: any
})
{
    //create jwt token
    const JWT_SECRET = process.env.JWT_SECRET || ""
    const token = jwt.sign({id: userId}, JWT_SECRET, {expiresIn: "3d"})

    //create a cookie
    res.cookie("token", token,{
        httpOnly: true, //cannot access with javascript (prevent XSS attack)
        path:"/",
        maxAge: 86400,
        sameSite: "none",   //allows cross-site
        secure: true 
    })

    return token;
}