import { FilledStarIcon } from "../Icons/Icons"

export function MovieRating({ rating }) {
    return (
        <>
            <FilledStarIcon width="14px" height="14px" />
            <span>{rating}</span>
        </>
    )
}