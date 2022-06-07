import React, { useRef, useState, useEffect } from 'react';
import axios from 'axios';
//import lodash from 'lodash';

//http://hn.algolia.com/api/v1/search?query=react
const HackerkNews = () => {
    const [hits, setHits] = useState([]);
    const [query, setQuery] = useState("");
    const [loading, setLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState("");
    const [url, setUrl] = useState(
        `http://hn.algolia.com/api/v1/search?query=${query}`
    );

    const handleFetchData = useRef({})
    handleFetchData.current = async ()=>{
        setLoading(true);
        try{
            const response = await axios.get(url);
            setHits(response.data?.hits || []);// nếu phía trước dấu ? có thì lấy hits
            setLoading(false);
        }catch(error){
            setLoading(false);
            setErrorMessage(`The error happend: ${error}`)
        }
        
    }

    // const handleSetQuery = lodash.debounce((e)=> {
    //     setQuery(e.target.value)
    // },1000);

    useEffect(()=>{
        handleFetchData.current();
    },[url]);
    
    return (
        <div className='bg-white mx-auto mt-5 mb-5 p-5 rounded-lg shadow-md w-2/4'>
            <div className='flex mb-5 gap-x-5'>
                <input
                    type='text'
                    className='border border-gray-300 p-5 block w-full rounded-md  transition-all focus:border-blue-400 outline-none'
                    placeholder='Typing your keyword...'
                    defaultValue={query}
                    onChange={(e)=> setQuery(e.target.value)}
                />
                <button 
                className='bg-blue-500 text-white font-semibold p-5 rounded-md flex-shrink-0'
                onClick={()=>setUrl(`http://hn.algolia.com/api/v1/search?query=${query}`)}
                >
                Fetch</button>
            </div>
            {!loading && errorMessage && <p className='text-red-500 my-5'>{errorMessage}</p>}
            {loading && 
           (<div className='loading w-8 h-8 rounded-full border-blue-500 border-4 border-r-4
           border-r-transparent animate-spin mx-auto my-10'>
            </div>)}
            <div className='flex flex-wrap gap-5'>
                {!loading &&
                hits.length >0 &&
                    hits.map((item, index)=>{
                        if(!item.title || item.title.lenght <=0) return null
                        return(<h3 key={item.title}
                            className='p-3 bg-gray-200 rounded-sm'
                        >{item.title}</h3>)
                        
                    })}
            </div>    
        </div>
    );
};

export default HackerkNews;