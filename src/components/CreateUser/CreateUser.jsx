import React, {useEffect, useState} from 'react';
import { Redirect, useHistory } from "react-router-dom";
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import PersonIcon from '@material-ui/icons/PersonAdd';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
    paper: {
      marginTop: theme.spacing(8),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(1),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
  }));

function CreateUser()
{
    const storedJwt = localStorage.getItem('jwtToken');
    const [jwt, setJwt] = useState(storedJwt || null);
    const classes = useStyles();
    const [channelName, setChannelName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [repeatedPassword, setRepeatedPassword] = useState("");
    let history = useHistory();

    const createUser = () => {
        if(email.includes("@") && password === repeatedPassword)
        {
            axios.post("https://test-ytb-bot.herokuapp.com/auth/signUp", {email, password, channelName})
            .then(res => {
              const token =  res.data;
              localStorage.setItem("jwtToken", token);
              console.log(token);
            })
            history.push("/Main")
        }
          else {
            history.push("/Main")
          }                    
    }
    
    return jwt ? (
        <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <PersonIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            CreateUser
          </Typography>
          <form className={classes.form} noValidate>
          <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="outlined-basic"
              label="Channel Name"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={(e)=> setChannelName(e.target.value)}  
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="email"
              label="Email Address"
              type="email"
              id="email"   
              onChange={(e)=> setEmail(e.target.value)}                         
            />       
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="New password"
              type="password"
              id="password"
              onChange={(e)=> setPassword(e.target.value)}             
            />  
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Repeat password"
              type="password"
              id="password"
              onChange={(e)=> setRepeatedPassword(e.target.value)}             
            />   
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              onClick={() => createUser() } 
            >
              Create User
            </Button>         
          </form>
        </div>
      </Container>
    ) : (<Redirect to={"/Login"}></Redirect>); 
}
export default CreateUser;