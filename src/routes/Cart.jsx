import {Form, Table} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { changeName,increase } from "./../store/userSlice.jsx"
import { addCount } from '../store.jsx'
import { formToJSON } from 'axios'
import { memo,useState } from 'react'

// // memo = props가 변할때만 재랜더링 해줌
// // 기존props와 신규 props를 비교하기 떄문에
// // props가 길고 복잡하면 손해일수도 있다
// let Child = memo( function(){
//   console.log('dddd');
//   return  <div>자식임</div>
// })

// // 컴포넌트 렌더링시 1회만 실행
// //useEffect랑 유사함,실행 시점의 차이
// function 함수(){
//   return 반복문10억번 돌린결과
// }

function Cart(){

  // let result = 함수();
  // useMemo(()=>{return 함수()},[state])

  let state = useSelector((state)=> state)
  let dispatch = useDispatch()
  // let [count, setCount] = useState(0) 
  

    return(
        <div>
          {/* <Child count={count}></Child> */}
          {/* <button onClick={()=>{ setCount(count+1)}}>+</button> */}
          <h6>{state.user.name} {state.user.age}의 장바구니</h6>
          <button onClick={()=>{
            dispatch(increase(1))
            
          }}>버튼</button>
            <Table>
  <thead>
    <tr>
      <th>#</th>
      <th>상품명</th>
      <th>수량</th>
      <th>변경하기</th>
    </tr>
  </thead>
  <tbody>
  {
    state.cart.map(function(a,i){
    return <List state={state} i={i} dispatch={dispatch}/>
    })}

  </tbody>
</Table> 
        </div>
    )
}

function List(props){
  return(
  <tr>
      <td>{props.state.cart[props.i].id}</td>
      <td>{props.state.cart[props.i].name}</td>
      <td>{props.state.cart[props.i].count}</td>
      <td>
        <button onClick={()=>{
          props.dispatch(addCount(props.state.cart[props.i].id))
        }}>+</button>
      </td>
    </tr>
  )
}

export default Cart