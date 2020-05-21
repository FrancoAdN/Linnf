import React, {useEffect} from 'react'
import logo from './logo.png'
import useInputLogin from './useInputLogin'
import Cookie from 'js-cookie'



export default function Login(props) {


    const [email, pwd, setValueEmail, setValuePwd, bindEmail, bindPwd, data] = useInputLogin('', '')
    

    useEffect(() => {
        const user = Cookie.get("user")
        console.log(user)
        if(user){
            props.history.push('/home')
        }
    }, [])

    const onSubmit = (e) => {
        e.preventDefault()
       
        const {id_user} = data.login
        if(id_user){
            Cookie.set('user', id_user)
            props.history.push('/home')
        }   
        else{
     
        }

    }

    


    
    return (
        <div className="text-center">
            <form className="form-signin bg-dark mx-auto my-auto text-light" style={{width: '450px', borderRadius: '25px'}} onSubmit={onSubmit}>
                <img className="mb-4" src={logo} alt="" width="250"/>
                <h1 className="h3 mb-3 font-weight-normal">Please sign in</h1>
                <label htmlFor="inputEmail" className="sr-only">Email address</label>

                <input 
                    type="email"
                    id="inputEmail"
                    {...bindEmail}
                    className="form-control"
                    placeholder="Email address"
                    name="email"
                    style={{width:'430px', margin: '10px'}}
                    required autoFocus/>
                
                <label htmlFor="inputPassword" className="sr-only">Password</label>

                <input type="password"
                    id="inputPassword"
                    {...bindPwd}
                    className="form-control"
                    placeholder="Password"
                    name="pwd"
                    style={{width:'430px', margin: '10px'}} 
                    required />
                <div className="checkbox mb-3">
                    <label>
                    <input type="checkbox" value="remember-me" name="remember"/> Remember me
                    </label>
                </div>
                <button className="btn btn-lg btn-info btn-block" type="submit">Sign in</button>
                <p className="mt-5 mb-3 text-muted">&copy; 2017-2019</p>
            </form>
        </div>
        
    )
}
