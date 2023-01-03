import { useEffect, useState } from 'react';
import { MovieProviders } from '../types/tmdb';
import { getMovieProviders } from '../helpers/getMovieUtils';

interface ProviderProps {
    id: number;
}
/**
 * Component to display streaming services logos for a given movie or show. Accepts an ID and
 * @returns {JSX.Element}
 */
export default function Providers(props: ProviderProps): JSX.Element {
    const [providers, setProviders] = useState<MovieProviders>();
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const handler = async () => {
            if (props.id) {
                const data = await getMovieProviders(props.id);
                setProviders(data);
            }
            setLoading(false);
        };
        handler();
    }, []);

    console.log(providers);

    // TODO: #210 Create loader component
    if (loading) return <p>Loading</p>;

    return (
        <div className='flex justify-center'>
            {providers?.results?.US?.flatrate ? (
                providers.results.US.flatrate.map((item, i) => (
                    <img
                        className='h-16 w-16'
                        key={i}
                        src={`https://image.tmdb.org/t/p/w500${item.logo_path}`}
                        alt={`${item.provider_name} logo`}
                    ></img>
                ))
            ) : (
                <span>Sorry, no providers available for this show.</span>
            )}
        </div>
    );
}
