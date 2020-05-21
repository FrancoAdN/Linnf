import React, {useEffect} from 'react'
import Usersposts from '../userspost/Usersposts'
import Navbar from '../navbar/Navbar'
import {Link} from 'react-router-dom'
import gql from 'graphql-tag'
import {Query} from 'react-apollo'
import Cookie from 'js-cookie'
import io from 'socket.io-client'


const HOME_QUERY = gql`
query Home($id_user:ID){
    users_post(id_user: $id_user){
      user{
        id_user
        username
        user_type
        user_avatar
      }
      posts{
        id_post
        post_desc
        post_date
        post_img
        user {
            id_user
            username
            user_type
            user_avatar
        }
      }
    }
}
`


function HomeBody(props){
    const {user, posts} = props
    return (
        <div>
            <Navbar user_avatar={user.user_avatar} user_id={user.id_user}/>
            <div className="container-fluid">
            
            
                <div className="row">

                    <div className="col-3">

                        <div className="card position-fixed card-row">
                            <img src={user.user_avatar} className="card-img-top" alt="..."/>
                            <div className="card-body">
                            <h5 className="card-title">{user.username}</h5>
                            <p className="card-text">{user.user_type}</p>
                            <Link className="btn btn-primary" to={`/profile/${user.id_user}`}>Ver perfil</Link>
                        </div>
                    </div>
                    </div>  
                
                    <div className="col-6 d-block" style={{ border: '1px solid black'}}>
                        <Usersposts posts={posts}/>
                    </div>
                
                </div>


            </div>
        </div>
    )

}

export default function Home() {
    const user = parseInt(Cookie.get("user"))

    /*let socket;

    useEffect(() => {
        console.log('connect to socket')
        socket = io('http://192.168.0.9:4000')
        socket.emit('init', user)
    }, [])*/


    return (
        <Query query={HOME_QUERY} variables={{id_user: user}}>
            {
                ({loading, error, data}) => {
                    if(loading) return <h4>loading...</h4>
                    if(error) console.log(error)

                    const { user, posts } = data.users_post
                    return <HomeBody user={user} posts={posts}/>
                }
            }
        </Query>
    
    )
}
