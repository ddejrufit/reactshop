
import {Container,Nav,Navbar} from 'react-bootstrap';
import './App.css'
import bg from './img/bg.png';
import {createContext,lazy,Suspense,useEffect,useState} from "react";
import data from './data.js'
import {Routes, Route, useNavigate, Outlet} from 'react-router-dom'
// import Detail  from './routes/Detail.jsx';
import axios from 'axios';
import Cart from './routes/Cart.jsx'
import { useQuery } from 'react-query';


  // 메인페이지 접속시 로딩할게 많아 느릴때 임포트 
const Detail = lazy (() => import('./routes/Detail.jsx'));


export let Context1 = createContext()

let a = 0;

function App() {
  
  useEffect(()=>{
    localStorage.setItem('watched', JSON.stringify([]))
  },[])
  




  let obj = {name : 'kim'}
  JSON.stringify(obj)
  localStorage.setItem('data',JSON.stringify(obj))
  
  // let 꺼낸거 = localStorage.getItem('data')
  // JSON.parse(꺼낸거)
  // console.log(JSON.parse(꺼낸거).name);
  

  
  // sync,async
  let [count, setCount] = useState(0);
  let [age, setAge] = useState(20);
  // useEffect사용해서 sync순서로 실행 되게
  useEffect(()=>{
    if( count != 0 && count < 3 ){
      setAge(age+1)
    }
  }, [count])



  let [shoes,setShoes] = useState(data)
  let navigate = useNavigate();
  let [재고] = useState([10,11,12]);

  let result = useQuery('작명',()=> axios.get('https://codingapple1.github.io/userdata.json')
  .then((a)=>{return a.data})
  )

  


  return (
    <div className='App'>
      
  



        <Navbar bg="dark" data-bs-theme="dark" >
        <Container>
          
          <Navbar.Brand onClick={()=>{navigate('/')}}>쇼핑몰</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link onClick={()=>{navigate('/')}}>Home</Nav.Link>
            <Nav.Link onClick={()=>{navigate('/detail/0')}}>Detail</Nav.Link>
            <Nav.Link onClick={()=>{navigate('/cart')}}>Cart</Nav.Link>
          
          </Nav>
          <Nav className='ms-auto' color='white' >
            { result.isLoading && '로딩중'}
            { result.error && '에러남'}
            { result.data && result.data.name}
            </Nav>

        </Container>
      </Navbar>

      <Suspense fallback={<div>로딩중</div>}>
      <Routes>
      <Route path='/' element={
        <div>
         <div className='main-bg' style={{ backgroundImage : 'url(' + bg + ')'}}></div>
      <div className="container">
      <div>

        
      {/* <div>안녕하십니까 전 {age}</div> */}
      {/* <button onClick={()=>{

        setCount(count+1);
        // if(count < 3) {
        //   setAge(age+1);
        // }

      }}>누르면한살먹기</button> */}
      </div>
        <div className="row">
      {
      shoes.map(function(a,i){
        return <Card shoes={shoes} i={i} navigate={navigate} key={i}/>
       })}
        </div>
        <button onClick={()=>{
        
        if (a == 0) {
          axios.get('https://codingapple1.github.io/shop/data2.json')
        .then((결과)=>{ 
          let copy=[
            ...shoes,
            ...결과.data
           ]
           setShoes(copy)
           a++;
        })
        }else if (a == 1) {
          axios.get('https://codingapple1.github.io/shop/data3.json')
        .then((결과)=>{ 
          let copy=[
            ...shoes,
            ...결과.data
           ]
           a++;
           setShoes(copy)
        })
        document.querySelector('#asd').innerHTML = ''

        }
        
        

        // json을 array 또는 object로 고치기 어려움
        // fetch('https://codingapple1.github.io/shop/data2.json')
        // .then(결과=>결과.json())
        // .then(data=>{})

        // 둘다 성공하면 ㄱㄱ
        // Promise.all([axios.get('/url1'),axios.get('/url2') ])
        // .then(()=>{

        // })
 

       }} id='asd'>더보기</button>

      </div> 
      </div>}/>
      <Route path='/detail/:id' element={
        
        <Context1.Provider value={{ 재고 , shoes }}>
        <Detail  shoes={shoes}/> 
         </Context1.Provider>
        }/>

      <Route path='/cart' element={<Cart/>}></Route>

      <Route path='/about' element={<About />}>
        <Route path='member' element={<>멤버임</>}/>
        <Route path='location' element={<>위치임</> }/>  
      </Route>

      <Route path='/event' element={<Event />}>
        <Route path='one' element={<p>첫 주문시 양배추즙 서비스</p>}/>
        <Route path='two' element={<>생일기념 쿠폰받기</> }/>  
      </Route>

      </Routes>
      </Suspense>
       
       
     

        
    


      </div>
  );
}

function About(){
  return(
    <div>
      <h4>회사정보임</h4>
      <Outlet></Outlet>
    </div>
  )
}

function Event(){
  return(
  <div>
    <h4>오늘의 이벤트</h4>
    <Outlet></Outlet>

  </div>
  )
}



function Card(props){
  return(
    <div className="col-md-4">
    <img src={`https://codingapple1.github.io/shop/shoes${props.i + 1}.jpg`} width={"80%"} onClick={()=>{props.navigate(`/detail/${props.i}`)}}/>
      <h4>{props.shoes[props.i].title}</h4>
      <p>{props.shoes[props.i].price}</p>
    </div>
    
  
  )
}
// // if 문(컴포넌트에만)
// function Component() {
//   if ( true ) {
//     return <p>참이면 보여줄 HTML</p>;
//   } //else{} 생략가능
//   return null;
// } 

// // 삼항연산자 중첩가능
// function Component() {
//   return (
//     <div>
//       {
//         1 === 1
//         ? <p>참이면 보여줄 HTML</p>
//         : ( 2 === 2 
//             ? <p>안녕</p> 
//             : <p>반갑</p> 
//           )
//       }
//     </div>
//   )
// } 

// // &&연산자
// true && false; //false
// true && true; //true

// true && '안녕'; // '안녕'
// false && '안녕';// 'false'
// true && false && '안녕';//false

// //switch / case 조건문
// function Component2(){
//   var user = 'seller';
//   switch (user){
//     case 'seller' :
//       return <h4>판매자 로그인</h4>
//     case 'customer' :
//       return <h4>구매자 로그인</h4>
//     default : 
//       return <h4>그냥 로그인</h4>
//   }
// }
// //object/array 자료형 응용 
// function Component() {
//   var 현재상태 = 'info';
//   return (
//     <div>
//       {
//         { 
//            info : <p>상품정보</p>,
//            shipping : <p>배송관련</p>,
//            refund : <p>환불약관</p>
//         }[현재상태]
//       }

//     </div>
//   )
// } 
export default App
