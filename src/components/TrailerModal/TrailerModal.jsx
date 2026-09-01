import { useMovieTrailer } from "../../hooks/useMovieTrailer";

export function TrailerModal({ clickedTrailerId }) {
    const { trailer, error, isLoading } = useMovieTrailer(clickedTrailerId);
    console.log(trailer);
}