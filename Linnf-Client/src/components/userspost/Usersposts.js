import React, { Component, Fragment } from 'react'
import Post from '../post/Post'


export class Usersposts extends Component {
    render(props) {
        return (
            <Fragment>
                {
                    this.props.posts.map(post => (
                        <Post key={post.id_post} post={post} user={post.user}/>
                    ))
                }
            </Fragment>
        )
    }
}

export default Usersposts
