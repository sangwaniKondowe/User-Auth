import { Grid, TextField, Button, Paper, Divider, Typography } from '@mui/material';
import * as React from 'react';
import { useFormik } from "formik"
import * as yup from 'yup';
import { FieldContainer, FieldError, FormError, FormSuccess } from './components/styles/FieldError.styled';
import axios from 'axios';


//import { AccountContext } from "/context"


const PASSWORD_REGEX = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^\w\s]).{8,}$/;

const validationSchema = yup.object({
    name: yup.string().min(3, "Please enter your real name").required("Name is required!"),
    phone: yup.number().required("Phone number required!").positive().integer(),
    email: yup.string().email("Please enter a valid email address").required("Email is required!"),
    password: yup.string().matches(PASSWORD_REGEX, "Please enter a strong password.").required("Password is required!"),
    confirmPassword: yup.string().required("Please confirm your password.").when("password", {
        is: val => ( val && val.length > 0 ? true : false ),
        then: yup.string().oneOf([yup.ref("password")], "Password does not match.")
    }),
});

function SignUp(props) {
    const [success, setSuccess] = React.useState(null);
    const [error, setError] = React.useState(null);
   
    const onSubmit = async (values) => {

        const { confirmPassword, ...data } = values;

        //console.log(JSON.stringify(values));

        const response = await axios.post("http://localhost:5000/signups/save-user", data)
                .catch((err) => {
                    if(err && err.response)
                        setError(err.response.data.message);
                        setSuccess(null);
                });
                

        if(response && response.data) {
            setError(null);
            setSuccess(response.data.message);
            formik.resetForm();
        }
    };

    const formik = useFormik({ 
        initialValues: { 
            name: "", 
            phone: "", 
            email: "", 
            password: "", 
            confirmPassword: "",
        
        },
        validateOnBlur: true,
        onSubmit,
        validationSchema: validationSchema,
});
    console.log("Error: ", formik.errors);

    const paperStyle = {padding: 20, height: "auto", width: 300, margin: 20}
    return (
        <Grid 
        container 
        direction="column"
        alignItems="center"
        justifyContent="center"
        style={{minHeight: "100vh"}}
        
        >
            <Paper style= {paperStyle} elevation={10}>
            <h1 style={{marginBottom: "0.2em"}}>Sign Up</h1>
                 <Typography>It's quick and easy.</Typography>
                 <Divider orientation="horizontal" style={{marginBottom: "1em"}}/>
                    {!error && <FormSuccess>{ success ? success : ""}</FormSuccess>}
                    {!success && <FormError> {error ? error: ""}</FormError>}
                 <Grid >
                    <form onSubmit={formik.handleSubmit}>

                        <FieldContainer>
                            <TextField
                                    label = "Name"
                                    name = "name"
                                    variant = "filled"
                                   // style={{marginBottom: "1em"}}
                                    // fullWidth
                                    onBlur={formik.handleBlur}
                                    value={formik.values.name}
                                    onChange={formik.handleChange}
                                    />
                                <FieldError>{formik.touched.name && formik.errors.name ? formik.errors.name : ""}</FieldError>
                        </FieldContainer>
                          
                        <FieldContainer>
                            <TextField
                                label = "Phone number"
                                name = "phone"
                                variant = "filled"
                                //style={{marginBottom: "1em"}}
                                // fullWidth
                                onBlur={formik.handleBlur}
                                value={formik.values.phone}
                                onChange={formik.handleChange}
                                />
                            <FieldError>{formik.touched.phone && formik.errors.phone ? formik.errors.phone : ""}</FieldError>
                        </FieldContainer>
                            
                        <FieldContainer>    
                            <TextField
                                label = "Email"
                                name = "email"
                                variant = "filled"
                                //style={{marginBottom: "1em"}}
                                // fullWidth
                                onBlur={formik.handleBlur}
                                value={formik.values.email}
                                onChange={formik.handleChange}
                                />
                            <FieldError>{formik.touched.email && formik.errors.email ? formik.errors.email : ""}</FieldError>
                        </FieldContainer>

                        <FieldContainer>
                            <TextField
                                label="Password"
                                name="password"
                                variant = "filled"
                                type="password"
                                // style={{marginBottom: "1em"}}
                                // fullWidth
                                onBlur={formik.handleBlur}
                                value={formik.values.password}
                                onChange={formik.handleChange}
                                />
                            <FieldError>{formik.touched.password && formik.errors.password ? formik.errors.password : ""}</FieldError>
                        </FieldContainer>
    
                        <FieldContainer>
                            <TextField
                                label="Confirm password"
                                name="confirmPassword"
                                type="password"
                                variant = "filled"
                                //style={{marginBottom: "1em"}}
                                // fullWidth
                                onBlur={formik.handleBlur}
                                value={formik.values.confirmPassword}
                                onChange={formik.handleChange}
                                />
                            <FieldError>{formik.touched.confirmPassword && formik.errors.confirmPassword ? formik.errors.confirmPassword : ""}</FieldError>
                        </FieldContainer>
                            
                        <FieldContainer>
                            <Button
                                variant ="contained"
                                color="primary"
                                type="submit"
                                size="large"
                                // fullWidth 
                                style={{ textTransform:"none", fontSize: "large"}}
                                disabled = {!formik.isValid}
                                >
                                Sign Up
                            </Button>
                        </FieldContainer>
                    </form>
                </Grid>
            </Paper>   

    </Grid>                
        

    )
}

export default SignUp;