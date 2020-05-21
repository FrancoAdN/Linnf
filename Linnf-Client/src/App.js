import React, {useContext, useState, useMemo} from 'react';
import './App.css';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import Home from './components/home/Home'
import Profile from './components/profile/Profile'
import Chat from './components/chat/Chat'
import Login from './components/login/Login'
import Store from './components/Store'


const client = new ApolloClient({
  uri: "http://localhost:5000/graphql"
})


// const socket = io('http://192.168.0.9:4000')

function App() {
  
  return (
    <ApolloProvider client={client}>
      <BrowserRouter>
        <Switch>

          <Route component={Login} path="/" exact/>
          <Route component={Login} path="/login" exact />
          <Route component={Home} path="/home" exact />
          <Route component={Profile} path="/profile/:id_user"/>
          
          {/* <SockContext.Provider value={socket, conn}>
            <Route component={Chat} path="/chat" exact />
          </SockContext.Provider> */}

        
        <Store>
          <Route component={Chat} path="/chat" exact />
        </Store>
          

        </Switch>      
      </BrowserRouter>
    </ApolloProvider>

  );
}

export default App;
