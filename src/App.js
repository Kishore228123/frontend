import React,{useState,useEffect} from 'react';
import './index.css';
import searchbar from './components/search.png';
import { Link } from 'react-router-dom';
import { FaInstagram } from "react-icons/fa";
import { FaSpotify } from "react-icons/fa6";
import { FaChrome } from "react-icons/fa";
import { SiFirefoxbrowser } from "react-icons/si";
import { FaFacebook } from "react-icons/fa";
import { imgs,imgss } from './prodDesc';
import { emailOver } from './login';
export let dd1=1;

export  let imgs1=JSON.parse(JSON.stringify(imgs));


// -->

export let arr=[];


console.log('email',emailOver);

const AddCart = async (idd) => {
  // Prevent adding duplicate items
  if (!arr.includes(idd)) {
    arr.push(idd); // Add item to cart array

    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:8000');
        const dataJson = await response.json();

        const user = dataJson.userLogins.find(user => user.email === emailOver);

        if (user) {
          const userMail = emailOver;
          const encodedMail = encodeURIComponent(userMail);

          const updateUser = await fetch(`http://localhost:8000/${encodedMail}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ cart: arr }), // Send the updated cart
          });

          if (!updateUser.ok) {
            throw new Error(`HTTP error! Status: ${updateUser.status}`);
          }

          const resultPost = await updateUser.json();
          console.log('Updated user:', resultPost);
        } else {
          console.log('User not found');
        }
      } catch (e) {
        console.error('Error:', e);
      }
    };

    fetchData(); // Execute the fetchData function
  }
};


// -->
export let buyid;
// -->
export let selectp;



// --->
export function Catalog(){
  

  let catalogarray=[0,1,2,3,4,5,6,7];
let i=catalogarray.map((e )=> 
    

<div className='pc1'> 
<img className='pci' src={imgs1[e].imgl} alt={imgs1[e].name}/>
<h3 className='pcd1'>{imgs1[e].name}</h3>
<div className='pc2'>
<p style={{fontSize:15,fontFamily:'Poppins, sans-serif'}}>quantity:</p>   
<p style={{marginRight:'30px',fontSize:15,fontFamily:'Poppins, sans-serif'}}>{imgs1[e].quantity}kg</p>
<p>|</p>
<p style={{fontSize:15,marginLeft:'auto',fontFamily:'Poppins, sans-serif'}}>price:</p>
 <p style={{fontSize:15,fontFamily:'Poppins, sans-serif'}} >&#8377;{imgs1[e].price}</p>
</div>
<Link style={{color:"black",textDecorationLine:"none",fontFamily:'Poppins, sans-serif'}} to="/Buynow" ><p className='pcd3' onClick={()=>{buyid=imgs1[e].id; selectp=(imgs1[e].id)-1}}>Buy now</p></Link>
<p className='pcd3' onClick={()=>AddCart(imgs1[e].id)}>add to cart</p>
</div>

);
return (
<div className="catalog" style={{display:'flex',flexWrap:'wrap',flexGrow:"3",flexShrink:"3",justifyContent:"space-around"}}>{i}</div>
);
}

// export let Appcontext=createContext(null);


// ------------------------------------------------------------
export default function App() {

  let len=imgss.length;
  let count=0;
  // eslint-disable-next-line
  let imgname=imgss[count].name;
  let [cnt,setCnt]=useState(count);
  const [Dashh,sDashh]=useState(0);
  // eslint-disable-next-line
  const [obj,setObj] = useState([]);


  function AAr(){
    
    let narr1=[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19];  
   
    let dashvar=narr1.map((e)=><p style={{paddingLeft:"30px",paddingBottom:"20px"}} onClick={()=>{selectp=e}}><Link style={{fontSize:"20px",color:"white",textDecorationLine:"none"}} to="/Prod" >{imgs[e].name}</Link></p>);
    return(dashvar);
  }

  function DashBoard(){
    return(
      <div className='Dash1'>
        <div className='Dash2'>
          <AAr/>
       </div>
      </div>
    );
  }

  function Ar(){
    let narr=[0,1,2,3,4,5,6];  
    let ii=narr.map((e)=><p onClick={()=>{selectp=e}}><Link style={{color:"white",textDecorationLine:"none"}} to="/Prod" >{imgs[e].name}</Link></p>);

    return(
    <>
    <div  className='flex3'>
      <button className='sh1' onClick={()=>{Dashh===1 ? sDashh(0) : sDashh(1)} }> all</button>
      
         {ii}
    </div>
  
    </>);
  }


//  --> slide img

function Fnright(){
      if(cnt<len-1)
        setCnt(cnt=>cnt+1);
}
 function Fnleft(){
    if(cnt>0)
      setCnt(cnt=>cnt-1);
 }

// --> end slide img

  function Points(){
    function Fnchange(id){
        setCnt(id);
        // Setsrcimg(imgss[id-1].name);
    }
    let p=imgss.map((e)=>{
      if(cnt===e.id-1)
      return <p className='p1 blk'></p>
      else
      return <p onClick={()=>Fnchange(e.id-1)} className='p1'></p>
    })
    return p;
  }
//
// axios.post('http://localhost:8000/api', {
//   name: 'Item Name',
//   quantity: 10
// })
// .then(response => {
//   console.log('Item saved:', response.data);
// })
// .catch(error => {
//   console.error('Error saving item:', error);
// });

  useEffect( () =>{
      const fetchData = async () =>{
        try{
        const data= await fetch(process.env.REACT_APP_API_URL);
        const dataJson= await data.json();
        setObj(dataJson);
        arr=dataJson.userLogins[0].cart;
        // dataJson.userLogins
        }
        catch(e){
          console.error(e);
        }
      }
      fetchData();
  },[])
//   return (
//     <div className="App">
//       <p> {obj.length}</p>
//       {obj.length > 0 ? 
//        obj.map((e) => {
//         return <p>{e.id}</p>
//        }) 
//        :
//        <p>no data is available</p>
// }
//     </div>
//   );


return (
  <div className='maindiv'>
      <div className='fdiv'>
      <nav className="nav1"> 
       <div className='flex1'>
    <p className="h1" >KRShop.in</p>
    <input  className="h2" placeholder="Search" type="text" />
   
    <img className="h3"  src={searchbar} alt="search"/>
     </div>
     <div className='flex2'> 
     <button className="h4" ><Link  className="LINK" to="Login"> Sign in</Link></button>
     <button className="h5" ><Link to="Cart" style={{textDecoration:"none"}}> cart </Link></button>
     <p style={{color:"white"}}className="h6">returns & order</p>
</div>
     </nav>

     
     <nav className='nav2'>
      
      <Ar/>

     </nav>
     </div>
     <div className='ldiv'>
     <div className='scrolld'>
      <img  className='img1' alt='rice' src={imgss[cnt].name}/>
      <button className='lnext' style={{opacity: cnt===0 && 0.5}} onClick={Fnleft}>&#10094;</button>
      <button className='rnext' style={ {opacity:cnt===imgss.length-1 && 0.5}} onClick={Fnright}>&#10095;</button>
     </div>
   
     <div className='pdiv' >
       <Points/>
       </div>

{/* --> catalog */}
<div className='trenddiv'>
  <p className='trend'>Trending Sale Products:</p>
</div>
<Catalog/>
<footer className='foot'>

<div className='fd1'>
  <h3 className='fabt'>About</h3>
  <p className='fabtp'>Our vision is to deliver quality beyond question and convenience that adds something great to your day & to develop a short supply chain so you can experience fresh rice at its finest.</p>
  <p className='fabtc'>©KRShop.com - 2018 | All Rights Reserved</p>
</div>


<div className='fd2'>
<ul className='fdul1'>
  <h3>Menu</h3>
  <li>Home</li>
  <li>Services</li>
  <li>Features</li>
  <li>Pricing</li>
  <li>Blog</li>
</ul>

<ul className='fdul1'>
<h3>social media</h3>
<li><FaInstagram/></li>
<li><FaFacebook/></li>
<li><FaChrome/></li>
<li><FaSpotify/></li>
<li><SiFirefoxbrowser/></li>
</ul>

<ul className='fdul2'>
<h3>Information</h3>
<li>terms & conditions</li>
<li>conditions</li>
<li>privacy</li>
<li>security</li>
</ul>

</div>

</footer>
</div>
     {Dashh===1 && <DashBoard/>}
    </div>
  );
};















//addCart old code

// const AddCart = async (idd) => {
//   // e.preventDefault();
//   let flag1=0;
//   for(let i=0;i<arr.length;i++){
//     if(arr[i]==idd){
//       flag1=1;
//       break;
//     }
//   }

//   if(flag1==0){
//     arr.push(idd);
//   const fetchData = async () =>{
//       try{

//       const data= await fetch('http://localhost:8000');
//       const dataJson= await data.json();
//       const len = dataJson.userLogins.length;
//       let flag=0;
//       for(let i=0;i<len;i++){
//         if(dataJson.userLogins[i].email === emailOver){
//           flag=1;
//           break;
//         }
//     }
//     if(flag==1){
//       const userMail=emailOver;
//       const encodedMail=encodeURIComponent(userMail);
//       const updateUser = await fetch(`http://localhost:8000/${encodedMail}`, {
//           method: 'PUT',
//           headers: {
//               'Content-Type': 'application/json',
//           },
//           body: JSON.stringify({cart:arr}),
//       });
//       if (!updateUser.ok) {
//           throw new Error(`HTTP error! Status: ${updateUser.status}`);
//       }

//       const resultPost = await updateUser.json();
//       console.log('updated user',updateUser);
//     }
//     }

      
      
//       catch(e){
//           console.error(e);
//         }
//     }                

//   fetchData(); 

//   }
// }