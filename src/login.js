import * as React from 'react';
import { Button, Grid, TextField, Typography, Divider, Paper, Link } from '@mui/material';
import { FieldContainer, FieldError, FormError } from './components/styles/FieldError.styled';
import { useFormik } from 'formik';
import * as yup from "yup"
import axios from 'axios';

const validationSchema = yup.object({
    email: yup.string().required(),
    password: yup.string().required(),
});

function Login(props) {

    const [error, setError] = React.useState(null);

    const onSubmit = async (values) => {
        setError(null);
        const response = await axios.post("http://localhost:5000/logins/login-user", values).catch((err) => {
            if(err && err.response)
            setError(err.response.data.message);
        });
            if(response) {
                alert("Welcome back in. Authenticating...")
            }

    } 

    const formik = useFormik({ 
        initialValues: { email: "", password: ""}, 
        validateOnBlur: true, 
        onSubmit, 
        validationSchema: validationSchema})

    const paperStyle = {padding: 20, height: "auto", width: 300, margin:20}
    return (
        <Grid 
        container 
        direction="column"
        alignItems="center"
        justifyContent="center"
        style={{minHeight: "100vh"}}
        
        >
            <Paper style= {paperStyle} elevation={10}>
        
                <Grid direction="column" >
                    <form onSubmit = {formik.handleSubmit}>
                        <FormError>{error ? error : ""}</FormError>
                        <FieldContainer>
                            <TextField
                                name = "email"
                                label = "Email"
                                type = "email"
                                onBlur = {formik.handleBlur}
                                value = {formik.values.email}
                                onChange= {formik.handleChange}
                                variant = "filled"
                                style={{marginBottom: "1em"}}
                                />
                                {<FieldError>{formik.touched.email && formik.errors.email ? formik.errors.email : ""}</FieldError>}
                        </FieldContainer>
                        
                        <FieldContainer>
                        <TextField
                                name="password"
                                label="Password"
                                type="password"
                                onBlur= {formik.handleBlur}
                                value = {formik.values.password}
                                onChange = {formik.handleChange}
                                variant = "filled"
                                style={{marginBottom: "1em"}}
                                />
                                {<FieldError>{formik.touched.password && formik.errors.password ? formik.errors.password : ""}</FieldError>}
                        </FieldContainer>

                        <FieldContainer>
                        <Button
                                variant ="contained"
                                type = "submit"
                                color="primary"
                                size="large" 
                                disabled = {!formik.isValid}
                                style={{ textTransform:"none", fontSize: "large", marginBottom:"1em"}}
                            >
                                Log In
                            </Button>
                        </FieldContainer>
                    </form>
                        <Typography 
                            component="div"
                            color="primary"
                            marginBottom="1em"
                            textAlign="center"
                            fontSize="0.9em"
                        >

                            <Link href="#" >
                                Forgotten password?
                            </Link>
                        </Typography>
                            
                        <Divider orientation="horizontal" style={{marginBottom: "1em"}}/>

                    <Grid container justifyContent="center" >
                        
                        <Button
                            // component={Link}
                            // to="./SignUp"
                            color="success"
                            variant="contained"
                            mediumWidth
                            size="large"
                            style={{marginBottom: "1em",
                                    textTransform:"none", 
                                    fontSize:"large"}} 
                                    >
                                        Create New Account</Button>
                        
                    </Grid>

                    

                </Grid>
            
                </Paper>
        </Grid>
    )
}

export default Login;