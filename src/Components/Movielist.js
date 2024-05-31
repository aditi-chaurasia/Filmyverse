import './App.css'
import { useEffect, useState} from 'react';
import {useParams } from "react-router-dom"
import Cards from "./Cards"
import Caraousel from './Caraousel/Caraousel';
function Movielist() {
    const[movieList,setmovieList]=useState([])
    const{type}=useParams();
     useEffect(()=>{
        fetchData();
    },[])
    useEffect(()=>{
        fetchData();
    },[type])
    
    
    const fetchData=async()=>{
        let response= await fetch(`https://api.themoviedb.org/3/movie/${type ? type:"popular"}?api_key=e2abee6c8ed2414f5b23970f331d7cd8`)
        let data=await response.json();
        setmovieList(data.results)
    }
    
  return (
    <>
    <Caraousel/>

    
    

       {
                    movieList.map(movie => (
                        <Cards movie={movie} />
                    ))
                }
    
    </>
  ); 
}

export default Movielist; 
