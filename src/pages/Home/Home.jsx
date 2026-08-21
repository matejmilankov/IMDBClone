import { Header } from "../../components/Header/Header"
import { useEffect } from "react"
import axios from "axios"

export function Home() {
    
    useEffect(() => {
        const getMovies = async () => {
            const response = await axios.get('https://api.themoviedb.org/3/search/movie',
                {
                    params: {
                        query: 'Batman'
                    },
                    headers: {
                        Authorization: `Bearer ${import.meta.env.VITE_TMDB_ACCESS_TOKEN}`
                    }
                }
            );
            console.log(response.data.results);
        }

        getMovies();
    }, []);

    return (
        <>
            <Header />
            <h1>Welcome to IMDB</h1>
        </>
    )
}