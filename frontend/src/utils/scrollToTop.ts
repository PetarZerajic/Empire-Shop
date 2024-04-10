import { useEffect } from 'react'
import { useLocation } from 'react-router-dom';

export const ScrollToTop = () => {
    const { pathname } = useLocation();
    
    useEffect(()=>{
        setTimeout(()=>{
         window.scrollTo({top:0})
        },200)
    },[pathname])

  return null
}
