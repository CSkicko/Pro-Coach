// Import dependencies
import React from 'react';
import { useQuery } from '@apollo/client';

// Import queries & mutations
import { QUERY_COACHES_BY_SKILL } from '../utils/queries';

// Import MUI components
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import CardActions from '@mui/material/CardActions';
import CircularProgress from '@mui/material/CircularProgress';

const SearchResults = ({skillId}) => {

    // Query the database for the coaches that have the selected skill
    const { loading, data } = useQuery(QUERY_COACHES_BY_SKILL, {
        variables: { skillId: skillId },
    });

    if(data) {
        console.log(data.coachesBySkill)
    }

    return (
        <>
            { loading ? (
                <Grid container spacing={4} justifyContent="center">
                    <Grid item sx={{ mt: '7%', textAlign: 'center' }} xs={12}>
                        <CircularProgress />
                    </Grid>
                </Grid>
            ) : (
                <main>
                    {/* Set up grid for spacing */}
                    <Grid container spacing={4} sx={{ my: 'auto' }} justifyContent="center">
                        {/* If there are coaches for the selected skill, display them */}
                        {data.coachesBySkill.coaches.length > 0 ? (
                            <>
                                {data.coachesBySkill.coaches.map((coach) => {
                                    return (
                                        <Grid item xs={4}>
                                            <Card style={{backgroundColor: '#EDF9FC'}}>
                                            <CardContent>
                                                
                                                {/* Display coach name */}
                                                <Typography sx={{ fontSize: 18 }} color="primary.main" gutterBottom>
                                                    {coach.displayName}
                                                </Typography>

                                                {/* Display coach job title */}
                                                <Typography variant="body2" sx={{ mb: '2%' }}>
                                                    {coach.jobTitle}
                                                </Typography>

                                                {/* Display coach about me */}
                                                <Typography variant="body2">
                                                    {coach.about}
                                                </Typography>
                                            </CardContent>
                                            <CardActions>
                                                <Button size="small">Schedule Session</Button>
                                            </CardActions>
                                            </Card>
                                        </Grid>
                                    )
                                })}
                            </>
                        ) : (
                            // Otherwise provide a message
                            <h2>Sorry, there's currently no coaches with this skill</h2>
                        )}
                    </Grid>
                </main>
            )}
        </>
    )
}

export default SearchResults;