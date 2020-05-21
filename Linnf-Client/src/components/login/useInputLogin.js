import {useState} from 'react'
import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'

const LOGIN_QUERY = gql`
    query Log($email: String!, $pwd: String!) {
        login(email: $email, pwd: $pwd) {
            id_user
        }
    }
  
`

function useInputLogin(initE, initP) {
    const [email, setValueEmail] = useState(initE)
    const [pwd, setValuePwd] = useState(initP)


    const bindEmail = {
        email,
        onChange: (e) => {
            setValueEmail(e.target.value)
        }
    }

    const bindPwd = {
        pwd,
        onChange: (e) => {
            setValuePwd(e.target.value)
        }
    }
    

    const {loading, err, data} = useQuery(LOGIN_QUERY, {variables: {email, pwd}})
    
    return [email, pwd, setValueEmail, setValuePwd, bindEmail, bindPwd, data]
    //return [value, bind, reset, data]
}

export default useInputLogin
