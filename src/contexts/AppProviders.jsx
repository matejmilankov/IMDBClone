import { WatchlistProvider } from '../contexts/Watchlist/WatchlistProvider';
import { TrailerProvider } from '../contexts/Trailer/TrailerProvider';
import { RateProvider } from '../contexts/Rate/RateProvider';

const providers = [
    WatchlistProvider,
    TrailerProvider,
    RateProvider
]

export function AppProviders({ children }) {
    return providers.reduceRight(
        (acc, Provider) => <Provider>{acc}</Provider>,
        children
    );
}