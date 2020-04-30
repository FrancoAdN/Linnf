

import React, { Component } from 'react'
import logo from './logo.png'

export class Navbar extends Component {
    constructor(props){
        super(props);
        //console.log(this.props.user_id)
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
                            <input className="" style={{ width: '400px', borderRadius: '15px'}}/>
                        </div>
                        <div className="col-3">
                            <div className="container">
                                <div className="row">
                                    <div className="col">
                                        <img src="https://img.icons8.com/material-outlined/30/000000/home--v2.png" alt=".."/>
                                    </div>
                                    <div className="col">
                                        <img src="https://img.icons8.com/material-outlined/30/000000/chat.png" alt=".."/>
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

