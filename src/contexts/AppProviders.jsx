import { WatchlistProvider } from '../contexts/Watchlist/WatchlistProvider';
import { TrailerProvider } from '../contexts/Trailer/TrailerProvider';
import { RateProvider } from '../contexts/Rate/RateProvider';
import { MovieDetailsProvider } from '../contexts/MovieDetails/MovieDetailsProvider';

const providers = [
    WatchlistProvider,
    TrailerProvider,
    RateProvider,
    MovieDetailsProvider
]

export function AppProviders({ children }) {
    return providers.reduceRight(
        (acc, Provider) => <Provider>{acc}</Provider>,
        children
    );
}