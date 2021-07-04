import React, {useState} from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import PersonIcon from "@material-ui/icons/Person"; 
import VideocamIcon from '@material-ui/icons/Videocam';
import SupervisorAccountIcon from "@material-ui/icons/SupervisorAccountRounded";
import { Redirect, useHistory } from 'react-router-dom';
import axios from "axios";

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
        },
    },
    button: {
        margin: theme.spacing(1),
    },
    paper: {
        position: 'absolute',
        width: 400,
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
      },
    input: {
        display: 'none',
    },
}));

function AdminPage() {  
    const storedJwt = localStorage.getItem('jwtToken');
    const [jwt, setJwt] = useState(storedJwt || null);
    const classes = useStyles();
    let history = useHistory();
    
    const onUploadVideo = () => {
        history.push("/Videos");
    }

    const redirectOnUserList = () => {
        history.push("/UserList");
    }

    const onCreateUser = () => {
        history.push("/CreateUser")
    }

    const uploadFile = (e:any) =>{
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);

        reader.onload = (e) => {
            const formData = new FormData();
            formData.append("file", file)

            axios.post("https://test-ytb-bot.herokuapp.com/videos/upload", formData,
            {
                headers: {
                'Content-Type': "multipart/form-data",
                'Authorization': "Bearer "+localStorage.getItem("jwtToken"),               
            }})
            .then(responce => {
                console.log(responce);
            })
            .catch((error) => {
                console.log(error);                
            })
        }
    }

    return jwt ? (        
        <div className="adminPage-container">
            <input
                accept=".txt/*"
                className={classes.input}
                id="contained-button-file"
                type="file"
                onChange={(e)=> uploadFile(e)}
            />
            <label htmlFor="contained-button-file">
                <Button 
                    variant="contained" 
                    color="primary" 
                    component="span" 
                    startIcon={<CloudUploadIcon />}>
                    Upload File
                </Button>
            </label>            

            <Button
                variant="contained"
                color="primary"
                className={classes.button}
                startIcon={<SupervisorAccountIcon />}
                onClick={()=> redirectOnUserList()}
            >
                User List
            </Button>
            <Button
                variant="contained"
                color="primary"
                className={classes.button}
                startIcon={<PersonIcon/>}
                onClick={()=> onCreateUser()}
            >
                Create User
            </Button>
            <Button
                variant="contained"
                color="primary"
                className={classes.button}
                startIcon={<VideocamIcon/>}
                onClick={()=> onUploadVideo()}
            >
               Video List
            </Button>
        </div>
    ) : 
    (
        <Redirect to={"/Login"}></Redirect>
    );
}  

export default AdminPage;