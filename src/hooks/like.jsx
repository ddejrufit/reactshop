import axios from "axios";
import { useEffect, useState } from "react"

export function useLike(){
    let[like, setLike] = useState(0)
    function addLike(){
    setLike(a=>a+1)
    }

    return [like,addLike];

}

export function useUsername(){
     let[username, setUsername] = useState('');
     useEffect(()=>{
      axios.get('/username.json').then((r)=>{
        setUsername(r.data)
      })
    },[])
    return username;
}
