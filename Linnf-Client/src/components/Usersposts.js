import React, { Component, Fragment } from 'react'
import gql from 'graphql-tag'
import {Query} from 'react-apollo'
import Post from './Post'


const UP_QUERY = gql`
    query PostQuery {
        posts{
            user{
                id_user
                username
                user_type
                user_avatar
            }
            id_post
            post_date
            post_desc
            post_img
        }
    }
`

export class Usersposts extends Component {
    render() {
        return (
            <Fragment>
                <Query query={UP_QUERY}>
                    {
                        ({loading, error, data}) => {
                            if(loading) return <h4>loading...</h4>
                            if(error) console.log(error)
                        
                            return <Fragment>
                                {
                                    data.posts.map(post => (
                                        <Post key={post.id_post} post={post} />
                                    ))
                                }
                            </Fragment>
                        }
                    }
                </Query>
            </Fragment>
        )
    }
}

export default Usersposts
