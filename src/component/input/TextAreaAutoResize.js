import React, { useEffect, useRef, useState } from 'react';

const TextAreaAutoResize = () => {

    const [text,setText] = useState("tester")
    const textareaRef = useRef(null)
    
    const [textareaHeight, setTextareaHeight] = useState("auto")
    const [parentHeight, setparentHeight] = useState("auto")

    const handleChange = (event)=>{
        setTextareaHeight("auto")
        setText(event.target.value)
    }

    useEffect(()=>{
        setTextareaHeight(`${textareaRef.current.scrollHeight}px`)
    },[text])

    return (
        <div 
            className='p-5'
            style={{
                minHeight: parentHeight
            }}
        >
            <textarea 
                className='transition-all overflow-hidden w-full max-w-[400px] p-5 rounded-lg 
                border border-gray-300 focus:border-blue-400 outline-none resize-none'
                placeholder='Please enter your content'
                value={text}
                ref={textareaRef}
                style={{
                    height: textareaHeight
                }}
                onChange={handleChange}
                >
            </textarea>
        </div>
    );
};

export default TextAreaAutoResize;