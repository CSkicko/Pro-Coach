// Import dependencies
import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../utils/mutations';

// Import Authorisation utility function
import Auth from '../utils/auth';

// Import material UI components
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import FormLabel from '@mui/material/FormLabel';
import InputLabel from '@mui/material/InputLabel';
import Input from '@mui/material/Input';
import Avatar from '@mui/material/Avatar';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const styles = {
    form: {
        textAlign: 'center',
    },
};

const Login = () => {
    // Set up form state variable and login mutation
    const [formState, setFormState] = useState({ email: '', password: '' });
    const [login, { error, data }] = useMutation(LOGIN_USER);

    // Set up function to handle form changes
    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormState({
            ...formState,
            [name]: value,
        });
    };

    // Set up function to handle form submit
    const handleFormSubmit = async (event) => {
        event.preventDefault();
        try {
            const { data } = await login({
                variables: { ...formState },
            });
            Auth.login(data.login.token);
        } catch (err) {
            console.log(err);
        };
    };

    return (
        <main>
            {/* If there's data, navigate to the profile page */}
            {data ? (
                <Navigate to="/profile" />
            ) : (
                <Grid container justifyContent='center' sx={{ my: "10%" }}>

                    <form style={styles.form} onSubmit={handleFormSubmit}>
                        {/* Form avatar */}
                        <FormGroup>
                            <Avatar sx={{ mx: 'auto', mb: '1%', bgcolor: '#d27547' }}>
                                <AccountCircleIcon color="white" />
                            </Avatar>
                        </FormGroup>

                        {/* Form title */}
                        <FormLabel>
                            <h2>Login</h2>
                        </FormLabel>
                        
                        {/* Email Input */}
                        <FormGroup sx={{ mb: '6%' }}>
                            <FormControl>
                                <InputLabel htmlFor="email">Email</InputLabel>
                                <Input id="email" name="email" value={formState.email} aria-describedby="Email" onChange={handleChange} />
                            </FormControl>
                        </FormGroup>

                        {/* Password Input */}
                        <FormGroup sx={{ mb: '20%' }}>
                            <FormControl>
                                <InputLabel htmlFor="password">Password</InputLabel>
                                <Input id="password" name="password" value={formState.password} type="password" aria-describedby="Password" onChange={handleChange} />
                            </FormControl>
                        </FormGroup>


                        {/* Submit button */}
                        <Button type="submit" variant="contained" sx={{ mx: 'auto' }}>
                            Login
                        </Button>
                    </form>
                    
                    <br />
                    {/* Email Input */}
                    
                </Grid>
            )}
            
            
        </main>
    )
}

export default Login;