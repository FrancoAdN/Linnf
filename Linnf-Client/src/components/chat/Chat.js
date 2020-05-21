import React, { Component, useState } from 'react'
import Navbar from '../navbar/Navbar'
import Chatcontent from './chatcontent/Chatcontent'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import Cookie from 'js-cookie'
import io from 'socket.io-client'
import classNames from 'classnames'
import './chat.css'

const RECENT_CHATS_QUERY = gql`
query Recent($user: ID) {
    recent_chats(user: $user){
      id_user
      username
      user_avatar
    }
}
`


export default function Chat() {
    const [chat, setChat] = useState(0)

    const handleOnClick = (e) => {
        setChat(e.target.id)
    }
    return (
        <div>

            <Navbar />

            <div className="container chat">
                <div className="row h-100">
                    <div className="col-4 h-100 w-100">
                        <div className="row toprow">
                            <h4 className="mx-auto my-auto">Direct</h4>
                        </div>
                        <div className="row mainrow d-flex flex-column">
                             <Query query={RECENT_CHATS_QUERY} variables={{user: Cookie.get('user')}}>
                                {
                                    ({loading, error, data}) => {
                                        if (loading) return <h1>loading..</h1>
                                        if (error) console.log(error)

                                        return data.recent_chats.map(chat => (
                                            <div key={chat.id_user} id={chat.id_user} className="d-flex flex-row w-100" style={{height:'60px', borderBottom: '1px solid lightgrey'}} onClick={handleOnClick}>
                                                <img src={chat.user_avatar} className="rounded-circle post-avatar" alt="..." style={{width: '40px', margin: '10px', marginRight: '20px'}}/>
                                                <div className="d-flex flex-column my-auto">
                                                    <span style={{fontSize: '20px'}}>{chat.username}</span>
                                                    {/* <span style={{fontSize: '12px'}}> Test </span> */}
                                                </div>
                                            </div> 
                                        ))

                                    }
                                }
                            </Query> 
                                
                        </div>
                    </div>

                    <div className="col h-100">
                        <Chatcontent conversation={chat} />
                    </div>
                </div>
            </div>
        </div>

    )
}
