import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled  from "styled-components";
import { Nav } from "react-bootstrap";
import {Context1} from "./../App.jsx";
import { addItem } from "../store.jsx";
import { useDispatch } from "react-redux";
import { useLike, useUsername } from "../hooks/like.jsx";
import axios from "axios";

let YellowBtn = styled.button`
  background : ${props => props.bg };
  color : ${ props => props.bg == 'blue' ? 'white' : 'black'};
  padding : 10px;
`
let Box  = styled.div`
  background : grey;
  padding : 20px;
`



function Detail(props){

 let [like, addLike]=useLike()
 let username = useUsername()




  useEffect(()=>{
  let asd = localStorage.getItem('watched')
  asd = JSON.parse(asd)
  asd.push(props.shoes[id].id)
  asd = new Set(asd)
  asd = Array.from(asd)
  localStorage.setItem('watched',JSON.stringify( asd ))

  },[])


  

  let {재고} = useContext(Context1)
  let [count , setCount] = useState(0)
  let [sale , setSale] = useState(true)
  let [type, setType] = useState('')
  let [탭, 탭변경] =useState(0)
  let {id} = useParams();
  let [open, setOpen] = useState('')
  let dispatch = useDispatch()
  useEffect(()=>{
   let a = setTimeout(()=>{ setSale(false)},2000)
    // console.log(2)

    return ()=>{
      // console.log(1)
      clearTimeout(a)
    }
  },[])


  useEffect(()=>{     
    if (isNaN(type) == true ) {
      alert('그러지마세요.');
      
    }
   
   }, [type])

    useEffect(()=>{  
     
        setOpen('end') 
    return()=>{
    setOpen('')
    }}, [])
    // useEffect(()=>{ }) 재랜더링마다 코드 실행
    // useEffect(()=>{ }, []) mount시 1회 코드 실행
    // useEffect(()=>{ }, [a]) a 변경시 코드 실행

    // useEffect(()=>{
    //  return ()=>{

    //  }
    //  }, []) unmount시 1회 코드 실행

 
    const onChangeType =(e)=>{
      setType(e.target.value) 
    }







    return(
      <div className={"container start "+ open}>
        <Box>
        <YellowBtn bg="blue" onClick={()=>{setCount(count+1)}}>버튼</YellowBtn>
        <YellowBtn bg="orange">버튼</YellowBtn>
        </Box>{
          sale == true
        ? <div className="alert alert-warning" id="sale">
            2초 이내 구매시 할인
          </div> 
        : null
        }

        <input type="text" value={type} onChange={onChangeType}/>
      <div className="row">
        {재고}
        <div className="col-md-6">
          <img src={`https://codingapple1.github.io/shop/shoes${props.shoes[id].id + 1}.jpg`} width="100%" />
        </div>
        <div className="col-md-6 mt-4">

          {like} <span onClick={()=>{ addLike() }}>❤</span>
          {username} 
          <h4 className="pt-5">{props.shoes[id].title}</h4>
          <p>{props.shoes[id].content}</p>
          <p>{props.shoes[id].price}원</p>
          <button className="btn btn-danger" onClick={()=>{
            dispatch(addItem( {id : 1, name : 'Red Knit', count : 1} ))
          }}>주문하기</button> 
        </div>
      </div>


      <Nav variant="tabs"  defaultActiveKey="link0">
    <Nav.Item>
      <Nav.Link eventKey="link0" onClick={()=>{탭변경(0)}}>버튼0</Nav.Link>
    </Nav.Item>
    <Nav.Item>
      <Nav.Link eventKey="link1" onClick={()=>{탭변경(1)}}>버튼1</Nav.Link>
    </Nav.Item>
    <Nav.Item>
      <Nav.Link eventKey="link2" onClick={()=>{탭변경(2)}}>버튼2</Nav.Link>
    </Nav.Item>
</Nav>
<TabContent shoes ={props.shoes} 탭={탭}></TabContent>




    </div> 
    )
  }

  function TabContent({탭, shoes}){
    let [fade, setFade] = useState('')
    useEffect(()=>{
      setTimeout(()=>{ setFade('end') },100)

      return()=>{
      setFade('')
      }
    }, [탭])

    return(<div className={`start ${fade}`}>
 {[<>{shoes[0].title}</>, <>내용1</>, <>내용2</>][탭]}
 </div>)
}
  export default Detail;