import React from 'react';
import './App.css';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import Navbar from './components/Navbar'
import Usersposts from './components/Usersposts'

const client = new ApolloClient({
  uri: "http://192.168.0.10:5000/graphql"
})


function App() {
  return (
    <ApolloProvider client={client}>
      <div>

        {/* Main navbar */}
        <Navbar user_avatar={"http://192.168.0.9:4000/user-1.png"} user_id={1}/>
        

        {/* Main container */}
        <div className="container-fluid">
          
          
          <div className="row">


            {/* COL 1 USER INFO AND PROFILE */}
            <div className="col-3">
              <div className="card position-fixed card-row">
                <img src="http://192.168.0.9:4000/user-1.png" className="card-img-top" alt="..."/>
                <div className="card-body">
                  <h5 className="card-title">Profile Name</h5>
                  <p className="card-text">Description Profile</p>
                  <a href="#" className="btn btn-primary">Ver perfil</a>
                </div>
              </div>
            </div>  
          
            {/* COL 2 POSTS */}
            <div className="col-6 d-block" style={{ border: '1px solid black'}}>

              <Usersposts />
              
              {/* <div className="post mx-auto w-75 bg-white">
                <div className="post-head bg-warning">
                  <img src="http://192.168.0.9:4000/user-1.png" className="rounded-circle post-avatar" alt="..."/>
                </div>

                <div className="post-desc bg-success">
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias rem, id corrupti ab aperiam mollitia autem asperiores quis dolores iure, fuga reiciendis distinctio veniam magni sapiente fugit nulla repellendus magnam.
                  </p>
                </div>
                  <img className="post-img" src="http://192.168.0.9:4000/post-1.jpg" alt=""/>
                <div className="post-interaction w-100 bg-dark"></div>
              </div>  */}



              </div>
          
          </div>


        </div>

      </div>

    </ApolloProvider>

  );
}

export default App;
