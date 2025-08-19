import {io} from "socket.io-client"
import { BACKEND_URL } from "../config"

export const socket = io(`${BACKEND_URL}`, {
    withCredentials: true,   //for cookies
    autoConnect: false      //connect manually after login
})