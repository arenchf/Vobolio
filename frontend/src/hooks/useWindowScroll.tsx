import { useEffect, useState } from "react";

export type WindowScrollProps = {
    x:number,
    y:number,
  }
  
export default function useWindowScroll(){
  const [windowScrollPos,setWindowScrollPos] = useState<WindowScrollProps>({x:0,y:0})

  useEffect(()=>{
    const onScroll = (e: Event) => {
      const window = e.currentTarget as Window
      setWindowScrollPos({x:window.scrollX,y:window.scrollY})
    };
      
    window.addEventListener('scroll', onScroll);
    
    return () => {
      window.removeEventListener('scroll', onScroll);
    }
  },[])

  return windowScrollPos
}