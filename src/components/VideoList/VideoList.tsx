import React, {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import axios from "axios";
//import useDebounce from '../../customHooks/useDebounce';
import Modal from '@material-ui/core/Modal';
import UploadVideo from '../UploadVideo/UploadVideo';
import { User, Video } from '../../types';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import { Spinner } from "react-spinners-css";
import VideocamIcon from '@material-ui/icons/Videocam';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';

function getModalStyle() {
    const top = 50;
    const left = 50;
  
    return {
      top: `${top}%`,
      left: `${left}%`,
      transform: `translate(-${top}%, -${left}%)`,
    };
  }

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  user: {
    width: "200px",
    margin: theme.spacing(1),
  },
  deleteUserButton: {
    width: "100px",
    margin: theme.spacing(1),
  },
  deleteSelectedButton: {
    width: "200px",
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
}));
function VideoList() {

  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle);
  const [isVideoListUpdated, setIsVideoListUpdated] = useState(false);
  const [videoList, setVideoList] = useState<Video[]>([]);
  const [openCreateVideo, setOpenCreateVideo] = useState(false);
  
  const onCreateUser = () => {
    setOpenCreateVideo(true);
  };

  const handleClose = () => {
    setOpenCreateVideo(false);
  };

  const onDeleteClick = (videoId:string, userChannelName:string) => { 
    const conf = window.confirm(`Are u sure you want to delete the video ${userChannelName} ?`)
    if(conf === true){
      axios.delete("http://test-ytb-bot.herokuapp.com/videos",
      {
        headers: {
          'Authorization': "Bearer "+localStorage.getItem("jwtToken")
        },
        params: {
          videoId: videoId
        }
      })
      .then(()=>{
          setIsVideoListUpdated(!isVideoListUpdated);
        });
    }
  };

  useEffect(() => {
    axios
      .get("http://test-ytb-bot.herokuapp.com/videos",
          {
            headers: {
            'Authorization': "Bearer "+localStorage.getItem("jwtToken"),               
        }})
      .then((response) => {
        const videoList = response.data;
        setVideoList(videoList);
      })      
  }, [isVideoListUpdated]);


  const videoTable = videoList.map((item) => (
    <tr key={item.id}>            
      <td>
        <Button
        variant="contained"
        color="primary"
        className={classes.user}
        startIcon={<VideocamIcon />}                
        >
        {item.name}
      </Button> 
      </td>
      <td>
        {item.author}
      </td>                   
      <td>
        <Button
        variant="contained"
        color="secondary"
        className={classes.deleteUserButton}
        startIcon={<DeleteIcon />}
        onClick = {()=> onDeleteClick(item.id, item.author)}
        >
        Delete
      </Button> 
      </td>
    </tr>
  ));

  return (
    <>
    <div className="cart-container">
      <h2 className="table-header" >VideoList</h2>
      <div>
      <Button
        variant="contained"
        color="primary"
        className={classes.user}
        startIcon={<CloudUploadIcon />}
        onClick = {()=> onCreateUser()}             
        >
        Upload Video
      </Button>
      </div>
      <table>
        <thead>
          <tr>
            <th>{"  "}</th>
          </tr>
        </thead>
        <tbody>
          {videoTable}
        </tbody>
      </table>
    </div>
    <Modal 
        open={openCreateVideo}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        >
        <div style={modalStyle} className={classes.paper}>
            <UploadVideo />
        </div>
    </Modal>
  </>
  );
}
export default VideoList;