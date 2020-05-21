import React, { Component, useContext } from 'react'
import logo from './logo-nav.png'
import { Query } from 'react-apollo';
import gql from 'graphql-tag'
import { Link } from 'react-router-dom'
import messageicon from './message.svg'


const SEARCH_QUERY = gql`
query Search ($user: String){
    search(user:$user){
      id_user
      user_avatar
      username
      user_type
    }
}
`


function ListUser (props){
    const { user } = props
    return(
        <Link to={`/profile/${user.id_user}`}>
            <li className="list-group-item">
            <div className="d-flex flex-row " style={{ height: '60px'}}>
                <Link to={`/profile/${user.id_user}`}>
                    <img src={ user.user_avatar } className="rounded-circle" alt="..." style={{width: '40px', margin: '10px', marginRight: '20px'}}/>
                </Link>
                
                <div className="d-flex flex-column my-auto text-body">
                    <span style={{fontSize: '20px'}}> { user.username } </span>
                    <span style={{fontSize: '12px'}}> { user.user_type } </span>
                </div>
              
            </div>
            </li>
        </Link>
    )
}

export class Navbar extends Component {
    constructor(props){
        super(props);
        this.state = { search: '' }
        this.handleKey = this.handleKey.bind(this)
    }

    handleKey(e){
        this.setState({ search: e.target.value})
    }

    render() {
        
        return (
            <nav className="fixed-top bg-dark main-hd">
                <div className="container my-1">
                    <div className="row d-flex justify-content-between">
                        <div className="col-1">
                            <img src={logo} style={{width: '40px'}}/>
                        </div>
                        <div className="col-5">
                            <input className="" style={{ width: '400px', borderRadius: '5px'}} onKeyUp={this.handleKey}/>
                            <ul className="list-group overflow-auto" style={{width:'400px', maxHeight:'300px', listStyle:'none'}}>
                                <Query query={SEARCH_QUERY} variables={{user:this.state.search}}>
                                    {
                                        ({loading, error, data}) => {
                                            if (loading) return <h1>loading..</h1>
                                            if (error) console.log(error)
                                            return data.search.map(user => (
                                                <ListUser key={user.id_user} user={user}/>
                                            ))
                                        }
                                    }
                                </Query>

                            </ul>
                        </div>
                        <div className="col-3">
                            <div className="container">
                                <div className="row">
                                    <div className="col">
                                        <Link to='/home'><img src="https://img.icons8.com/material-outlined/30/000000/home--v2.png" alt=".."/></Link>
                                    </div>
                                    <div className="col">
                                        {/* <img src="https://img.icons8.com/material-outlined/30/000000/chat.png" alt=".."/> */}
                                        <Link to="/chat"><img src={messageicon} alt=".." style={{width: '40px'}}/></Link>
                                    </div>
                                    <div className="col">
                                        <img src="https://img.icons8.com/material-outlined/30/000000/alarm.png" alt=".."/>
                                    </div>
                                    <div className="col">
                                        <img src={this.props.user_avatar} className="rounded-circle" style={{width: '30px'}} alt=".."/>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                    </div> 


                </div>
            </nav>
        )
    }
}

export default Navbar

