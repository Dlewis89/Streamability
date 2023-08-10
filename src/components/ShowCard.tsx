import { addToProfileWatchQueue, removeFromProfileWatchQueue } from '../supabase/profiles';
import { Profile, ShowData } from '../types';
import { Link } from 'react-router-dom';
import { formatReleaseDate, DateSize } from '../helpers/dateFormatUtils';
import { Button, CardActions, CardMedia, Rating, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { pluralizeString } from '../helpers/stringFormatUtils';

interface ShowCardProps {
    /**
     * Movie or TV show metadata
     */
    details: ShowData;
    /**
     * Either 'movie' or 'tv'
     */
    showType: string;
    /**
     * If show is in profile watch queue
     * `false` if profile is null
     */
    isInWatchQueue?: boolean;
    /**
     * User profile if logged in, otherwise `null`
     */
    profile: Profile | null;
    /**
     * Profile setting function that accepts a `Profile` or `null`
     */
    setProfile: (profile: Profile | null) => void;
}

/**
 * Show cards are rendered all over the application in different situations
 * Be sure changes made to this component are either conditionally applied
 * or intended to be on every single show card
 *
 * @param props | returns details object passed from SearchResultScreen.tsx
 * @returns {JSX.Element} | Single show card
 */
export default function ShowCard({
    details,
    showType,
    isInWatchQueue = false,
    profile,
    setProfile,
}: ShowCardProps): JSX.Element {
    /**
     * Handle card being added to or removed from
     * a users watch queue
     *
     * @param isPush | true if adding, false if removing
     * @param show_id | movie db id being updated
     */
    const queueHandler = async (isPush: boolean, show_id: number | undefined) => {
        if (show_id) {
            if (isPush && profile) {
                const data = await addToProfileWatchQueue(profile.id, show_id);
                setProfile(data);
            } else if (profile) {
                const data = await removeFromProfileWatchQueue(profile.id, show_id);
                setProfile(data);
            }
        }
    };

    return (
        <div data-testid='show-card-component' className='m-1 flex w-96 bg-foreground rounded-sm'>
            <Link
                to={`/details/${showType}/${details.id}`}
                state={details}
                data-testid='show-details-link'
            >
                <CardMedia
                    component='img'
                    className='w-full cursor-pointer rounded-l-sm'
                    sx={{ width: 180, minWidth: 180, height: 270, minHeight: 270 }}
                    image={
                        details.poster_path
                            ? `https://image.tmdb.org/t/p/w500${details.poster_path}`
                            : '/poster-placeholder.jpeg'
                    }
                    alt={`${details.title} poster`}
                />
            </Link>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    paddingY: '10px',
                }}
            >
                <Box>
                    <Typography
                        variant='h5'
                        align='left'
                        paddingLeft={1}
                        sx={{
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            display: '-webkit-box',
                            WebkitLineClamp: '2',
                            WebkitBoxOrient: 'vertical',
                        }}
                    >
                        {details.title}
                    </Typography>
                    {details.release_date && details.release_date.length === 10 && (
                        <Typography align='left' paddingLeft={1}>
                            {formatReleaseDate(details.release_date, DateSize.MEDIUM)}
                        </Typography>
                    )}
                </Box>
                <Box>
                    <div>
                        <Rating
                            name='half-rating'
                            defaultValue={details.vote_average ? details.vote_average / 2 : 0}
                            precision={0.5}
                            style={{ width: '100%', paddingLeft: '5px' }}
                            readOnly
                        />
                        <Typography variant='body2' align='left' paddingLeft={1}>
                            {details.vote_average && details.vote_count
                                ? details.vote_count +
                                  ' ' +
                                  pluralizeString(details.vote_count, 'rating')
                                : 'No Ratings available'}
                        </Typography>
                    </div>
                    {profile && (
                        <CardActions
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'flex-start',
                                padding: 0,
                            }}
                        >
                            <Button
                                sx={{ m: 1, fontSize: 12 }}
                                variant='contained'
                                size='small'
                                color='secondary'
                                onClick={() => queueHandler(!isInWatchQueue, details?.id)}
                            >
                                {isInWatchQueue ? 'Remove from queue' : 'Add to queue'}
                            </Button>
                        </CardActions>
                    )}
                </Box>
            </Box>
        </div>
    );
}
