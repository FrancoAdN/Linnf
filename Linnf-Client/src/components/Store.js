import React, {createContext, useState} from 'react'
import io from 'socket.io-client'

export const SockContext = createContext()
let socket;



export default function Store(props) {

    const [message, setMessage] = useState({msg: ''})

    if(!socket) {
        socket = io('http://192.168.0.9:4000')
        change()
        socket.on('msg',  (data) => {
            change()
            console.log(message)
        })
    }
    
    

    
    function change(){
        setMessage({msg:'test'})
        console.log(message)
    }

    function Connect(id){
        socket.emit('init', id)
    }

    return (
        <SockContext.Provider value={{Connect, message}}>
            {props.children}
        </SockContext.Provider>
    )
}
