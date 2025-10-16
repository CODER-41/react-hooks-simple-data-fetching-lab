// create your App component here
import React, {useState, useEffect} from "react";

/**
 * App component that fetches and displays a random dog image
 */

function App() {
    //State to store the URL of the dog image . Initialize as null.
    const [dogImageUrl, setDogImageUrl] = useState(null);
    //state to track the loading status. Initialize as true
    const [isLoading, setIsLoading] = useState(true);

    //UseEffect hook to perfom data fetching.
    //The empty dependency array'[]' ensures this runs only once after the intial render(componentDidMount)
    useEffect(() => {
        //Define the async function for fetching data
        async function fetchDogImage() {
            try{
                // 1. Fetch data from the dog CEO API
                const response = await fetch('https://dog.ceo/api/breeds/image/random');

                //Check if the request was succesful
                if(!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`)
                }

                // 2. Parse the JSON respnse
                const data = await response.json();

                //The API returns an object with a 'mesaage' key holding the image URL.
                //3. Update the state with the received image URL
                setDogImageUrl(data.message);
            } catch (error) {
                //Log any errors during fetch process
                console.error("Couldnot fetch dog image:", error);
                //Optionally, you might want to set a state for an error message here
            } finally {
                // 4. Set loading to false once the fetch (success or failure) is coplete
                setIsLoading(false)
            }
        }
        fetchDogImage();

        //Cleanup function
        return () => {
            //Any cleanup code would go here
        };
    }, []); //Empty dependency array means it runs only on mount

    if(isLoading) {
        //display "Loading..." text while the data is being fetched
        return <p>Loading....</p>
    }

    //Once loading is false, check if we succesfuly got an image URL.

if(dogImageUrl){
    //Display the image if the URL is available
    return (
        <div className="App">
            <h1>A Random Dog! 🐶</h1>
            <img 
                src={dogImageUrl}
                alt="A Random Dog"
                style={{maxWidth: '400px', borderRadius: '8px'}}
            />
        </div>
    );
} else {
    // Fallback messsage in case loading is false but no image URL was set(i.e.., fetch failed)
    return <p>Failed to load a dog image. PLease try again</p>
}

}
export default App;