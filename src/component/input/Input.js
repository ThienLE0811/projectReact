import React,{useEffect, useRef} from 'react';

const Input = () => {
    
    const divRef = useRef();
    const inputRef = useRef();

    useEffect(()=>{
        if(inputRef.current) inputRef.current.focus()
        
    },[])

    return <div className='input-ref' ref={divRef}>
            <input 
                ref={inputRef}
                type="text" 
                placeholder="Auto focus input" 
                className='inline-block p-5 border border-gray-200 focus:border-blue-400 outline-none' 

            />
        </div>
    
};

export default Input;