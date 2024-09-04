
import { Link } from 'react-router-dom';
import './register.css';
import { useState } from 'react';

export default function Register(){
    
    // eslint-disable-next-line
    const[flag,setFlag] =useState(0);
    const [userDetails,setuserDetails] = useState({
        name: '',
        email:'',
        password:'',
        contact:'',
        cart:[],
    })
                

    const updateFunction = async() =>{
        // console.log('User Details:', userDetails);
            const temp = {
                users:[],
                userLogins:[],
            }
            // eslint-disable-next-line
        const modelPost = {
            ...temp,
            userLogins: [userDetails],
        };
    
        // console.log('debug',userDetails);
        try{
            const updateUser = await fetch(process.env.REACT_APP_API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userDetails),
            });
            // console.log('debug',userDetails);
            if (!updateUser.ok) {
                throw new Error(`HTTP error! Status: ${updateUser.status}`);
            }
            // eslint-disable-next-line
            const resultPost = await updateUser.json();
            // console.log('Result post:', resultPost);
    
        } catch (e) {
            console.error('Error during POST request:', e);
        }
    }

const handleSubmit = async (e) => {
    e.preventDefault();
    const fetchData = async () =>{
        try{
            let flag=0;
        const data= await fetch(process.env.REACT_APP_API_URL);
        const dataJson= await data.json();
        const len = dataJson.userLogins.length;
        for(let i=0;i<len;i++){
            if(dataJson.userLogins[i].email === userDetails.email){
                flag=1;
                break;
            }
        }

        if(flag===0) {
            updateFunction();
            console.log('new account created');
        }
        if(flag === 1){
            console.log('already have an account');
        }
        }
        catch(e){
            console.error(e);
          }
      }                

    fetchData(); 

}

    const handleFunction = (e) => {
        const {name , value} = e.target;
        setuserDetails((prevstate) =>({
            ...prevstate,
            [name]:value,
    }))
    }

    return(

        
        <div style={{backgroundImage:'linear-gradient(140deg, rgb(168, 235, 247) 45%, rgb(55, 222, 75) 75%)',display:'flex',justifyContent:'center',width:'100%',height:'100vh'}}>
            <div style={{boxShadow:'5px 5px 5px 5px black',display:'flex',borderRadius:'10px',width:'fit-content',height:'fit-content',padding:'40px',marginTop:'5vh'}}>
            <form onSubmit={handleSubmit} className='rbox'>

        <h2 style={{textAlign:'center'}}>Sign up</h2>
        <label>Name:</label>
        <div style={{display:'flex',gap:30}}>
        <input onChange = {handleFunction} name ='name'  value={userDetails.name} className='flname' placeholder='first name' type='text' required/>
        <input className='flname'  placeholder='second name' type='text'/>
        </div>
        <label>email</label>
        <div style={{display:'flex',gap:10}}>
        <input onChange = {handleFunction}  name='email' value={userDetails.email} style={{width:'250px'}} placeholder='email' type='email'/>
        <p className='otp' style={{width:'50px',height:'25px'}}>OTP</p>
        </div>
        <label>password</label>
        <input onChange = {handleFunction} name='password' style={{width:'250px'}} type='password'placeholder='password'/>
        <label>confirm password</label>
        <input style={{width:'250px'}} type='password' placeholder='confirm password'/>
        <label>Phone</label>
        <input onChange = {handleFunction}  name='contact' value={userDetails.contact} style={{width:'250px'}} placeholder='phone' type='text'/>
        <label>city</label>
        <input style={{width:'250px'}} placeholder='city' type='text'/>
        <label>country</label>
        <input style={{width:'250px',marginBottom:'10px'}} placeholder='country' type='text'/>
        <p style={{textAlign:'center',marginBottom:'10px'}}><button type='submit'  style={{backgroundColor:'rgb(116, 237, 148)',width:'200px',borderRadius:'5px',border:'none',textAlign:'center'}}>Create account</button></p>
        <hr style={{marginBottom:'5px'}}/>
        <p>already have an account? <Link className='signin' to='/Login'>sign in</Link></p>

        </form>
        </div>
        </div>
    )
}
