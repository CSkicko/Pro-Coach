// Import dependencies
import React from 'react';
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

const Register = () => {
    return (
        <main>
            <Grid container justifyContent='center' sx={{ my: "10%" }}>
                <Grid item xs={12}>
                    
                </Grid>

                <form style={styles.form}>
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
                            <Input id="email" aria-describedby="Email" />
                        </FormControl>
                    </FormGroup>

                    {/* Password Input */}
                    <FormGroup sx={{ mb: '20%' }}>
                        <FormControl>
                            <InputLabel htmlFor="password">Password</InputLabel>
                            <Input id="password" type="password" aria-describedby="Password" />
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
            
        </main>
    )
}

export default Register;