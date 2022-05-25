import React, {useState} from 'react';
import LockedOutlinedIcon from '@mui/icons-material/LockOutlined';
import {Container,Typography,Grid,Button} from '@mui/material';
import { StyledAvatar,StyledForm,StyledPaper,StyledSubmitButton } from './styles';
import {useDispatch} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import Input from './Input';
import { SignIn, SignUp } from '../../actions/auth';

const initialState = {firstName:'',lastName:'',username:'',email:'',password:'',confirmPassword:''};

const Auth = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [isSignup, setIsSignup] = useState(false);
    const [formData,setFormData] = useState(initialState);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleShowPassword = () => {
        setShowPassword(!showPassword);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isSignup) {
            dispatch(SignUp(formData,navigate))
        } else {
            dispatch(SignIn(formData,navigate))
        }
    }

    const handleChange = (e) => {
        setFormData({...formData,[e.target.name]:e.target.value});
    }

    const switchMode = () => {
        setIsSignup(!isSignup);
        setShowPassword(false);
    }

  return (
    <Container component='main' maxWidth='xs'>
        <StyledPaper elevation={3}>
            <StyledAvatar>
                <LockedOutlinedIcon />
            </StyledAvatar>
        <Typography component='h1' variant='h5'>{isSignup? 'Sign Up' : 'Sign In'}</Typography>
        <StyledForm onSubmit={handleSubmit}>
            <Grid container spacing={2}>
                {isSignup && (
                    <>
                        <Input name='firstName' label='First Name' handleChange={handleChange} autoFocus half/>
                        <Input name='lastName' label='Last Name' handleChange={handleChange} half/>
                        <Input name='username' label='Username' handleChange={handleChange} />
                    </>
                )}
                <Input name='email' label='Email Address' handleChange={handleChange} type='email' />
                <Input name='password' label='Password' handleChange={handleChange} type={showPassword?'text':'password'} handleShowPassword={handleShowPassword}/>
                { isSignup && <Input name='confirmPassword' label='Repeat Password' handleChange={handleChange} type='password' />}
            </Grid>
            <StyledSubmitButton type='submit' fullWidth variant='contained' sx={{backgroundColor:'primary.main'}}>
                {isSignup? 'Sign Up' : 'Sign In'}
            </StyledSubmitButton>
            <Grid container justifyContent='flex-end'>
                <Grid item>
                    <Button onClick={switchMode}>{isSignup? 'Already have an account? Sign In':"Don't have an account? Sign Up"}</Button>
                </Grid>
            </Grid>
        </StyledForm>
        </StyledPaper>
    </Container>
  )
}

export default Auth;