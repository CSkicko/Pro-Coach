// Import dependencies
import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { Link } from 'react-router-dom';

// Import create user mutation
import { CREATE_USER } from '../utils/mutations';

// Import authorisation utility function
import Auth from '../utils/auth';

// Import MUI components
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import FormLabel from '@mui/material/FormLabel';
import InputLabel from '@mui/material/InputLabel';
import Input from '@mui/material/Input';
import Avatar from '@mui/material/Avatar';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Alert from '@mui/material/Alert';

// Create styles
const styles = {
    form: {
        textAlign: 'center',
    },
};

const Register = () => {

    // Initiate the form state
    const [formState, setFormState] = useState({
        username: '',
        email: '',
        password: '',
    });

    // Initiate the mutation
    const [createUser, { error, data }] = useMutation(CREATE_USER);

    // Function to update the form state when changes are made
    const handleInput = (event) => {
        const { name, value } = event.target;
        setFormState({
            ...formState,
            [name]: value,
        });
    };

    // Function to create a user when the form is submitted
    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const { data } = await createUser({
                variables: { ...formState },
            });
            Auth.login(data.createUser.token);
        } catch (err) {
            console.log(err)
        };
    };

    // Return the react components
    return (
        <main>
            <Grid container justifyContent='center' sx={{ my: "10%" }}>
                {data ? (
                    <div>
                        <h3>Account Created!</h3>
                        <h5>You can now set up your profile. Start by clicking the button below!</h5>
                        <Link
                            to={`/profile`}
                            style={{ textDecoration: 'none' }}
                        >
                            <Button variant="contained" sx={{ mx: 'auto' }}>
                                Profile Setup
                            </Button>
                        </Link>
                    </div>
                ) : (
                    <form style={styles.form} onSubmit={handleSubmit}>
                        {/* Form avatar */}
                        <FormGroup>
                            <Avatar sx={{ mx: 'auto', mb: '1%', bgcolor: '#d27547' }}>
                                <AccountCircleIcon color="white" />
                            </Avatar>
                        </FormGroup>

                        {/* Form title */}
                        <FormLabel>
                            <h2>Register</h2>
                        </FormLabel>

                        {/* Username Input */}
                        <FormGroup sx={{ mb: '6%', mt: '10%' }}>
                            <FormControl>
                                <InputLabel htmlFor="username">Username</InputLabel>
                                <Input id="username" name="username" aria-describedby="Username" onChange={handleInput} />
                            </FormControl>
                        </FormGroup>
                        
                        {/* Email Input */}
                        <FormGroup sx={{ mb: '6%' }}>
                            <FormControl>
                                <InputLabel htmlFor="email">Email</InputLabel>
                                <Input id="email" name="email" aria-describedby="Email" onChange={handleInput} />
                            </FormControl>
                        </FormGroup>

                        {/* Password Input */}
                        <FormGroup sx={{ mb: '6%' }}>
                            <FormControl>
                                <InputLabel htmlFor="password">Password</InputLabel>
                                <Input id="password" name="password" type="password" aria-describedby="Password" onChange={handleInput} />
                            </FormControl>
                        </FormGroup>

                        {/* Submit button */}
                        <Button type="submit" variant="contained" sx={{ mx: 'auto' }}>
                            Register
                        </Button>
                    </form>
                )}

            </Grid>

            {error && (
                    <Alert severity="error">{error.message}</Alert>
            )}

        </main>
    )
}

export default Register;