import Card from 'react-bootstrap/Card';
import './App.css'
import { useEffect, useState} from 'react';
import { Link } from "react-router-dom";
import { useParams } from 'react-router-dom';

function Cards() {
    
   const[movies,setmovies]=useState([])
   const {type}=useParams()
    const fetchData=async()=>{
      let response= await fetch(`https://api.themoviedb.org/3/movie/${type ? type:"popular"}?api_key=e2abee6c8ed2414f5b23970f331d7cd8`)
      let data=await response.json();
        setmovies(data.results)
    }
    console.log(movies)
    useEffect(()=>{
        fetchData();
    },[])
    useEffect(()=>{
      fetchData();
  },[type])
  return (
    <>

    <div className='main'>
       <div className='main2'>

        {movies.map((ele) =>{return(
            <>
            <Link style={{textDecoration:"none",color:"white"}} to={`/movie/${ele.id}`} >
           
            < Card className='card' border="danger">
        
        <Card.Img variant="top" src={`https://image.tmdb.org/t/p/w500/${ele.poster_path}`} height={'240rem'}/>
        <Card.Body>
       <Card.Title className='card-title'>{ele.title}</Card.Title>
       
        </Card.Body>
      </Card>
      </Link>
            </>
        )
        })
    }
    </div>
    </div>
   
    </>
  ); 
}

export default Cards;
