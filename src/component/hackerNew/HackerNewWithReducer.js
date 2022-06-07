import React, { useRef, useEffect, useReducer } from 'react';
import axios from 'axios';
//import lodash from 'lodash';

//http://hn.algolia.com/api/v1/search?query=react

const initialState = {
    hits: [],
    query: "", 
    loading: true,
    errorMessage: "",
    url: "http://hn.algolia.com/api/v1/search?query=''",
}

const HackerNewReducer = (state, action) => {
    switch (action.type) {
        case 'SET_DATA': {
            //const newState = JSON.parse(JSON.stringify(state))
            return {...state, hits: action.payload}
        }
        
        case 'SET_LOADING': {
            return {...state, loading: action.payload}
        }

        case 'SET_ERROR': {
            return {...state, errorMessage: action.payload}
        }

        case 'SET_QUERY': {
            return {...state, query: action.payload}
        }

        case 'SET_URL': {
            return {...state, url: action.payload}
        }

        default:
            break;
    }
}


const HackerNewWithReducer = () => {
    const [state, dispatch] = useReducer(HackerNewReducer, initialState)
    
    const handleFetchData = useRef({})
    handleFetchData.current = async ()=>{
        dispatch({
            type: 'SET_LOADING',
            payload: true,
        })
        try{
            const response = await axios.get(state.url);
            dispatch({
                type: 'SET_DATA',
                payload: response.data?.hits || [], // data của chúng ta
            })
            
            dispatch({
                type: 'SET_LOADING',
                payload: false,
            })
            
            
        }catch(error){
            dispatch({
                type: 'SET_LOADING',
                payload: false,
            })
            
            dispatch({
                type: 'SET_ERROR',
                payload: `The error happend: ${error}`,
            })
        }  
    }
    useEffect(()=>{
        handleFetchData.current();
    },[state.url]);
    
    return (
        <div className='bg-white mx-auto mt-5 mb-5 p-5 rounded-lg shadow-md w-2/4'>
            <div className='flex mb-5 gap-x-5'>
                <input
                    type='text'
                    className='border border-gray-300 p-5 block w-full rounded-md  transition-all focus:border-blue-400 outline-none'
                    placeholder='Typing your keyword...'
                    defaultValue={state.query}
                    onChange={(e)=> dispatch({
                            type: 'SET_QUERY',
                            payload: e.target.value,
                    })}
                />
                <button 
                className='bg-blue-500 text-white font-semibold p-5 rounded-md flex-shrink-0'
                disabled={state.loading}
                onClick={()=> dispatch({
                    type: 'SET_URL',
                    payload: `http://hn.algolia.com/api/v1/search?query=${state.query}`,
                })}
                >
                Fetch</button>
            </div>
            {state.loading && 
           (<div className='loading w-8 h-8 rounded-full border-blue-500 border-4 border-r-4
           border-r-transparent animate-spin mx-auto my-10'>
            </div>)}
            {!state.loading && state.errorMessage && <p className='text-red-500 my-5'>{state.errorMessage}</p>}
            <div className='flex flex-wrap gap-5'>
                {!state.loading &&
                    state.hits.length >0 &&
                    state.hits.map((item, index)=>{
                        if(!item.title || item.title.lenght <=0) return null
                        return(<h3 key={item.title}
                            className='p-3 bg-gray-200 rounded-sm'
                        >{item.title}</h3>)
                        
                    })}
            </div>    
        </div>
    );
};

export default HackerNewWithReducer;