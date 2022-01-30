import React, { useState, useEffect } from "react";
import axios from "axios";
import './App.css'

const App = () => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState(false);
  const [totalListLength, setTotalListLength] = useState(0);
  const [isLast, setIsLast] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const fullPageData = () => {
	axios.get(`https://jsonplaceholder.typicode.com/photos`)
	.then(res => {
		let length = res.data.length;
		setTotalListLength(length);
		console.log(length);
	})
	.catch(err =>{
		console.error("Error occured while loading the full data : "+err);
	});
  }

  const loadData = () => {
    let url = `https://jsonplaceholder.typicode.com/albums/${page}/photos`;
    axios
	.get(url)
	.then(res => {
      setData([...data, ...res.data]);
      setPage(page+1);
      setIsFetching(false);
    })
	.catch(err => {
		console.error("Error occured : "+err);
		setError(err);
	});
  }

  const isScrolling =()=>{
    if((window.innerHeight + window.scrollY) >= document.body.offsetHeight){
		setIsFetching(true);
    }
    
  }
  
  useEffect(()=>{
	if(page===1){
		fullPageData();
	}

    if (isFetching || page===1){
		console.log("loadData method is called");
		if(page<=totalListLength || page===1){
			setIsLoading(true);
			loadData();
			setIsLoading(false);
		}else{
			setIsLast(true);
		}
	}
    window.addEventListener("scroll", isScrolling);
    return () => window.removeEventListener("scroll", isScrolling);
  }, [isFetching])


  if (error) {
    return <h1>Sorry! Something went wrong</h1>;
  }

  if (data.length===0) {
    return <h1>Loading...</h1>;
  }

  return (
    <>
      <ul className="list-group-ul">
        {data.map((image, key) => (
          <li className="list-group-li" key={key}>
              <img className="image-thumbnail" src={image.thumbnailUrl} alt={image.title}/>
			  <span>{image.title}</span>
          </li>
        ))}
		{isLoading?"Loading list":null}
      </ul>	
	  {isLast?<h3>You reached end of list</h3>:null}
    </>
  );
};

export default App;