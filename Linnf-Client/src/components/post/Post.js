import React from 'react'
import './Post.css'
import { Link } from 'react-router-dom'

export default function Post({post, user}) {
    return (
        // bg-white
        <div className="post mx-auto w-75 ">
            
            {/* bg-warning */}
            <div className="post-head d-flex flex-row bg-info" style={{ height: '60px'}}>
                <Link to={`/profile/${user.id_user}`}>
                    <img src={ user.user_avatar } className="rounded-circle post-avatar" alt="..."/>
                </Link>
                
                <div className="d-flex flex-column my-auto">
                    <span style={{fontSize: '20px'}}> { user.username } </span>
                    <span style={{fontSize: '12px'}}> { user.user_type } </span>
                </div>
              
            </div>

            {/* bg-success */}
            <div className="post-desc">
              <span className="d-block"style={{margin:'20px'}}> { post.post_desc } </span>
            </div>
        
            <img className="post-img" src={post.post_img} alt=""/>
            
            

            {/* bg-dark */}
            <div className="post-interaction w-100 bg-white container" style={{borderTop: '1px solid black'}}>
                <div className="row h-100">
                    <div className="col my-auto" align="center">
                        <div style={{borderRadius: '25px', backgroundColor:'#e8ebed'}}>
                            <img src="https://img.icons8.com/ios/24/000000/like.png" alt=".." />
                            <span> Me gusta </span>
                        </div>
                    </div>
                    <div className="col my-auto" align="center">
                        <div style={{borderRadius: '25px', backgroundColor:'#e8ebed'}}>
                            <img src="https://img.icons8.com/ios/24/000000/reply-all-arrow.png" alt=".." />
                            <span> Comentar </span>
                        </div>
                    </div>
                    <div className="col my-auto" align="center">
                        <div style={{borderRadius: '25px', backgroundColor:'#e8ebed'}}>
                            <img src="https://img.icons8.com/windows/24/000000/share-rounded.png" alt=".." />
                            <span> Compartir </span>
                        </div>
                    </div>
                </div>
            </div>


        </div>
    )
}
