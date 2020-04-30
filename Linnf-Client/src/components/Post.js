import React from 'react'
import './Post.css'

export default function Post({post}) {
    return (
        // bg-white
        <div className="post mx-auto w-75 ">
            
            {/* bg-warning */}
            <div className="post-head d-flex flex-row bg-info" style={{ height: '60px'}}>
                <img src={ post.user.user_avatar } className="rounded-circle post-avatar" alt="..."/>
                <div className="d-flex flex-column my-auto">
                    <span style={{fontSize: '20px'}}> { post.user.username } </span>
                    <span style={{fontSize: '12px'}}> { post.user.user_type } </span>
                </div>
              
            </div>

            {/* bg-success */}
            <div className="post-desc">
              <span> { post.post_desc } </span>
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
