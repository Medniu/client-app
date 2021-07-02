import React, {useEffect, useState} from 'react';
import { useHistory } from "react-router-dom";
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import VideocamIcon from '@material-ui/icons/Videocam';
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
function UploadVideo() {
    const classes = useStyles();
    const [name, setName] = useState("");
    const [author, setAuthor] = useState("");
    const [publicationDate, setPubDate] = useState("");
    let history = useHistory();

    const uploadVideo = () =>{
        if(name && author ){
            axios.post("https://test-ytb-bot.herokuapp.com/videos",
            {name, author, publicationDate},
            {headers: {
              'Authorization': "Bearer "+localStorage.getItem("jwtToken")
            }})
            .then(responce => {
               console.log(responce);
            })
            history.push("/Main");
        }
    }
    return (
        <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <VideocamIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Upload Video
          </Typography>
          <form className={classes.form} noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="Channel Name"
              label="Channel Name"
              onChange={(e)=> setName(e.target.value)}                         
            />       
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="Video Title"
              label="Video Title"
              onChange={(e)=> setAuthor(e.target.value)}             
            />  
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="Published Date"
              label="Published Date"
              onChange={(e)=> setPubDate(e.target.value)}             
            />   
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={() => uploadVideo() } 
            >
              Upload
            </Button>            
          </form>
        </div>
      </Container>
    );
  }  
export default UploadVideo;