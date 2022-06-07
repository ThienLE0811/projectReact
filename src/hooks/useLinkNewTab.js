import {useEffect ,useRef} from "react";


export default function useLinkNewTab(){
    const contentRef = useRef(null);

    useEffect(()=>{
      if(contentRef)
      {
        const links = contentRef.current.querySelectorAll("a")// contentRef.current => current có giá trị là entry-content
        
        links.length > 0 &&
        links.forEach(item => {
          item.setAttribute("target", "__blank")
        });
      }
    },[])
    return{ 
        contentRef
    }
    

}