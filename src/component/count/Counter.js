import React, { useEffect, useState } from 'react';

const Counter = () => {
    
    //const [count, setCount] = useState(0);

    /*
    useEffect sẽ chạy 1 lần đầu tiên
    clean-up: clean các sideEffect trước đó, sau đó mới chạy vào sideEffect tiếp theo
    */

    // useEffect(()=>{
    //     console.log(`count: ${count}`)
    // },[count])

    const [info, setInfo] = useState({
        firstName: 'le',
        lastName: 'thien'
    })

    useEffect(()=>{
        console.log('ok')
    },[info])

    return (
        // <div className='p-5 flex gap-x-4 items-center'>
        //     <span className='text-2xl font-bold'>{count}</span>
        //     <button 
        //         onClick={()=>{setCount(count+1)}}
        //         className='inline-block p-3 bg-green-400 text-white'
        //     >Increment</button>
        // </div>

        <div className='p-5 flex gap-x-4 items-center'>
            <input
                type='text'
                name='firstName'
                value={info.firstName}
                onChange={(e)=>
                    setInfo({
                        ...info,
                        firstName: e.target.value
                    })
                }
            />
        </div>
    );
};

export default Counter;