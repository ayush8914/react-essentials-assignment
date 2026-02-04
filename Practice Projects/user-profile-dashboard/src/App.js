import { useState, useEffect } from 'react';
import './App.css'


export default function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); 
  const [secondsOnPage, setSecondsOnPage] = useState(0);

  const fetchUser = async () => {
        try{
              const response = await fetch("https://jsonplaceholder.typicode.com/users/1");
              if(!response.ok){
                    throw new Error(`HTTP error! status: ${response.status}`);
              }

              const userData = await response.json();
              setUser(userData);
              setLoading(false);
        }
        catch(err){
          setError(err.message);
          setLoading(false);
        } 

  }
  
  
  useEffect(() => {
    console.log("Fetching user data...");
    fetchUser();
  }, []);

  useEffect(()=>{
    console.log("Updating document title...");
    if(user){
      document.title = `Profile: ${user.name} | User Dashboard`  ;
    }
    else{
      document.title = "Loading... | User Dashboard";
    }
  },[user]);
  
  useEffect(() => {
    console.log(`Seconds on page: ${secondsOnPage}`);
    const interval = setInterval(() => {
      setSecondsOnPage(secondsOnPage =>secondsOnPage + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="App">
      <h1>User Profile Dashboard</h1>
      <p style={{textAlign:"center",color:"#666",fontStyle:'italic',marginBottom:"20px"}}>Time on page: {secondsOnPage}</p>
      {error && (
        <div style={{color:"red",padding:"20px",border:"1px solid red"}}>
          <h2>Error!</h2>
          <p>{error}</p>
        </div>
      )}

      {loading && !error && (
        <div style={{padding:"20px",textAlign:"center"}}>
          <p>Loading user data...</p>
        </div>
      )}

      {user && !loading && !error && (
        <div style={{padding:"20px",border:"1px solid green",margin:"20px 0"}}>
          <h2>User Information</h2>
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Username:</strong> {user.username}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Phone:</strong> {user.phone}</p>
          <p><strong>Website:</strong> <a href={user.website} target="_blank" rel="noopener noreferrer">{user.website}</a></p>
        </div>
      )}

    </div>
  );
}
