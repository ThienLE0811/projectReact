import React,{useEffect, useRef, useState} from 'react';
import axios from 'axios'

/*
    - useEffect: giống useState ở phần là hook chứ không phải là chức năng,
    mà sử lí đến việc liên quan đến sideEffect
    sideEffect: những cái bên trong function tác động ra bên ngoài,function này thực hiện chức năng
    và đưa ra bên ngoài
    vd về sideEffect: scroll đến đâu phần tử hiện ra đến đó
    - dependency
*/


const getPhotos = async (page)=> {
    //https://picsum.photos/v2/list?page=2&limit=100
    try {
        const response = await axios
            .get(`https://picsum.photos/v2/list?page=${page}&limit=8`);
        // handle success
        console.log(response);
        return response.data;
    } catch (error) {
        // handle error
        console.log(error);
    }

}


const Photo = () => {
    
    const [randomPhotos, setRandomPhotos] = useState([]);
    const [nextPage, setNextPage] = useState(1)

    const handleLoadPhotos = useRef({});
    handleLoadPhotos.current = async ()=>{
    const images = await getPhotos(nextPage)
    const newPhotos = [...randomPhotos,...images]
    setRandomPhotos(newPhotos)
    setNextPage(nextPage+1)
    }


    useEffect(()=> {
        handleLoadPhotos.current();   
    },[]); 

    return (
    <div>
        <div className='grid grid-cols-4 gap-5 p-5'>
        {randomPhotos.length > 0 &&
           randomPhotos.map((item,index)=>(
            <div key={item.id} className=' p-3 bg-white shadow-md rounded-lg h-[250px]'>
                <img 
                    src={item.download_url} 
                    alt={item.author}
                    className="w-full h-full object-cover rounded-lg"
                />
            </div>
        ))}
        </div>
        <div className='text-center'>
            <button onClick={handleLoadPhotos.current} className='inline-block px-8 py-4 bg-purple-600 text-white'>
                Load More
            </button>
        </div>
        
        
   </div>
    );
};

export default Photo;