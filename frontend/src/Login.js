import logo from './hero.png';
import './Login.css';
import {Form, Button, FormGroup} from "react-bootstrap";
import Cookies from 'js-cookie';
import { useIsAuthenticated, useMsal } from '@azure/msal-react';
import { SignInButton } from './components/SignInButton';
import { SignOutButton } from './components/SignOutButton';
import { useEffect } from 'react';

const hostname = 'https://poorman-reddit-backend-ejctamgefjf8aeaf.northcentralus-01.azurewebsites.net/';//'http://127.0.0.1:5070'
function Authenticate(e)
{
    
    
    fetch(hostname+'/login',
        {
            method: "POST",
            headers: 
            {
                "Content-type" : "application/json",
                "Authorization": "Basic " + btoa(e.target.elements.username.value + ":" + e.target.elements.password.value)

            },
            body: JSON.stringify(
                {
                    username: e.target.elements.username.value,
                    password: e.target.elements.password.value
                }
            )
        }
    )
    .then(response => {
        
            if (response.ok) { // Check if response went through
                return response.text();
            } else {
                throw new Error('Network response was not ok.');
            }
        })
    .then(data => { 
        
            console.log(data);
            let dataObj = JSON.parse(data);
            console.log(dataObj)
            Cookies.set('auth', data, { expires: 7 }); // The cookie will expire after 7 days
            Cookies.set('base64', btoa(dataObj.username+":"+dataObj.password), { expires: 7 });
        })
    .catch(error => {
        console.log('There has been a problem with your fetch operation: ', error.message);
        })
}


function NewUser(e){

    fetch(hostname+'/newUser',{
            method: "POST",
            headers: {
                "Content-type" : "application/json",

            },
            body: JSON.stringify(
                {
                    username: e.target.elements.new_username.value,
                    password: e.target.elements.new_password.value,
                }
            )
        })
        .then(response => response.text())
        .then(data => { 
            console.log(data);
    })
}

function Login() {
    const isAuthenticated = useIsAuthenticated();
    const { instance } = useMsal();

  useEffect(() => {
    instance.handleRedirectPromise().then((response) => {
      if (response) {
        console.log('Authentication successful:', response);
        // Update authentication state here if needed
      }
    }).catch((error) => {
      console.error('Error handling redirect:', error);
    });
  }, [instance]);
  return (
    <div className="hero">
        <img src={logo} alt="Hero Image" />
        <div className="hero-content">
            <h1>Login</h1>.
            <Form onSubmit={(e) =>{
                e.preventDefault();
                Authenticate(e);
                e.target.reset();
            }}>
                <FormGroup className='mb-3'>
                    <Form.Label>Username</Form.Label>
                    <Form.Control type="text" name="username" required/>

                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" name="password" required/>
                </FormGroup>
                <Button variant='primary' type="submit" className="w-100">Login</Button>
            </Form>
            <br/>
            <h1>New User</h1>.
            <Form onSubmit={(e) =>{
                e.preventDefault();
                NewUser(e);
                e.target.reset();
            }}>
                <FormGroup className='mb-3'>
                    <Form.Label>Username</Form.Label>
                    <Form.Control type="text" name="new_username" required/>

                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" name="new_password" required/>
                </FormGroup>
                <Button variant='primary' type="submit" className="w-100">Create User</Button>
            </Form>

            <div >
                    {isAuthenticated ? <SignOutButton /> : <SignInButton />}
            </div>
        </div>

    </div>
  );
}

export default Login;