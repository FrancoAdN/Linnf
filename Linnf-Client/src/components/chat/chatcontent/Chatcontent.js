import React, { useState, useEffect, useContext } from 'react'
import '../chat.css'
import emoji from './emoticonos.svg'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import Cookie from 'js-cookie'
import {SockContext} from '../../Store'
import { parse } from 'graphql'

const CHATCONTENT_QUERY = gql`
query Chat($from: Int, $to: Int){
    conversation(from: $from, to:$to){
      id_msg
      to_id
      from_id
      date_time
      message
    }
}
`


export default function Chatcontent({conversation}) {
    const user = parseInt(Cookie.get('user'))
    const to = parseInt(conversation)
    const {Connect, message} = useContext(SockContext)
    
    Connect(user)

    useEffect(() => {
        console.log(message)
    }, [message])

    
    return ( 
        <Query query={CHATCONTENT_QUERY} variables={{ from: user, to}}>
            {
                ({loading, error, data}) => {
                    if (loading) return <h4>Loading..</h4>
                    if (error) console.log(error)
                    let content = data.conversation.reverse()
                    return <MainContent content={content} user={user} to={to}/>
                }
            }
        </Query>
    )
}


function Message({msg}){

    const user = parseInt(Cookie.get('user'))

    if(user == msg.from_id){
        return (<div style={{margin: '15px'}}>
            <span  className="d-inline float-right" style={{background: '#9ddfe2', padding: '10px', paddingLeft:'20px', paddingRight:'20px', borderRadius: '30px', maxWidth: '70%'}}>{msg.message}</span>
        </div>)
    } else {
        return (<div style={{margin: '15px', maxWidth: '70%'}}>
            <span  className="d-inline" style={{background: '#e3e3e3', padding: '10px', paddingLeft:'20px', paddingRight:'20px', borderRadius: '30px' , maxWidth: '70%'}}>{msg.message}</span>
        </div>)
    }
}


function MainContent({content, user, to}) {

    const [chatmsg, setChat] = useState([])
    useEffect(() => {
        setChat(content)
    }, [content])

    const handleOnclick = () => {
        let msgin = document.getElementById('msgin').value

        if (msgin != '') {
            const msg = {
                from_id: user,
                to_id: to,
                message: msgin
            }
    
            setChat([...chatmsg, msg])
    
            document.getElementById('msgin').value = ''
            let div = document.getElementById('content-div')
            div.scrollTop = div.scrollHeight
            
        }

    }
    const handleKeyPress = (e) => {
        
        if(e.key === 'Enter')
            handleOnclick()
    }

    return (
        <div className="row h-100">
            <div className="w-100 toprow" align="center">
                <h4 className="mx-auto my-auto"></h4>
            </div>
        
            <div className="w-100 mainrow">
                <div className="content d-flex flex-column overflow-auto" id="content-div">
                    
                    {
                        chatmsg.map((msg, i) => (
                            <Message key={i} msg={msg}/>
                        ))
                        
                    }

                </div>
                            
                <div className="send-div">
                    <div className="in-msg d-flex justify-content-around">
                        <img src={emoji} width="20"/>
                        <input type="text" id="msgin" onKeyPress={handleKeyPress}/>
                        <span className="text-primary" onClick={handleOnclick}>Send</span>
                    </div>
                </div>
            </div>
        </div>
    )
}



