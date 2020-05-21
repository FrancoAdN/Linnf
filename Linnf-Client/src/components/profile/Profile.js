import React from 'react'
import { Query } from 'react-apollo'
import Post from '../post/Post'
import gql from 'graphql-tag'
import Cookie from 'js-cookie'

const PROFILE_QUERY = gql`
query Profile($user: ID, $profile: ID) {
  profile(user: $user, profile: $profile){
    
    users_post{
      user{
        id_user
        username
        user_avatar
        user_type
      }
      posts{
        id_post
        post_img
        post_date
        post_desc
      }
    }
    
    following
    followers
    is_following

    
  }
}
`


function CheckFollow({is_following}){
  let r = null

  if (is_following) r = <span className="badge badge-light">Following</span>
  else if (is_following == null) r = null
  else r = <button className="btn btn-primary">Follow</button>
  
  return r
} 


function ProfileBody({user, posts, info}){
  console.log(info)
  return (
    <div className="container">
      <div className="row">
        <div className="col-3">
          <img src={user.user_avatar} alt=".." className="rounded-circle" style={{width:'220px', display: 'block', margin: 'auto'}} />
        </div>
        <div className="col">
          <div className="d-flex flex-column my-auto" style={{marginLeft: '30px'}}>
            <span style={{fontSize: '35px'}}> { user.username } </span>
            <span style={{fontSize: '20px'}}> { user.user_type } </span>
           
            <div className="d-flex flex-row justify-content-around" style={{marginTop: '30px'}}>
              <span><b>{posts.length}</b> Posts</span>
              <span><b>{info.followers}</b> Followers</span>
              <span><b>{info.following}</b> Following</span>
              <CheckFollow is_following={info.is_following}/>
              {/* {
              
              }
              <button className="btn btn-primary">Follow</button> */}
            </div>
          </div>
        </div>
      </div>

      <div className="row" style={{height:'200px', marginTop:'100px'}}>
        <div className="col">
          {
            posts.map(post => (
              <Post key={post.id_post} post={post} user={user}/>
            ))
          }
        </div>
      </div>
    </div>
  )
}

export default function Profile(props) {
    let { id_user } = props.match.params
    const user = parseInt(Cookie.get("user"))

    return (
        <Query query={PROFILE_QUERY} variables={{profile: id_user, user}}>
            {
                ({loading, error, data}) => {
                  if (loading) return <h1>Loading..</h1>
                  if (error) console.log(error)

                  const {user, posts} = data.profile.users_post
                  const {is_following, followers, following} = data.profile
                  const info = { is_following, followers, following }
                  return <ProfileBody user={user} posts={posts} info={info}/>
                }
            }
        </Query>
    )
}
