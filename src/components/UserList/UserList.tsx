import React, {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import axios from "axios";
import { User } from '../../types';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import { Spinner } from "react-spinners-css";
import "./UserList.css";
import { Redirect } from 'react-router-dom';

const useStyles = makeStyles((theme:any) => ({
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
}));
function UserList() {
  const storedJwt = localStorage.getItem('jwtToken');
  const [jwt, setJwt] = useState(storedJwt || null);
  const classes = useStyles();
  const [isUserListUpdated, setIsUserListUpdated] = useState(false);
  const [userList, setUserList] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(false);


  const userTable = userList.map((item) => (
    <tr key={item.id}>            
      <td>
        <Button
        variant="contained"
        color="primary"
        className={classes.user}
        startIcon={<Avatar />}                
        >
        {item.channelName}
      </Button> 
      </td>
      <td>
        {item.email}
      </td>                   
      <td>
        <Button
        variant="contained"
        color="secondary"
        className={classes.deleteUserButton}
        startIcon={<DeleteIcon />}
        onClick = {()=> onDeleteClick(item.id, item.channelName)}
        >
        Delete
      </Button> 
      </td>
    </tr>
  ));

  const onDeleteClick = (userId:string, userChannelName:string) => { 
    const conf = window.confirm(`Are u sure you want to delete the product ${userChannelName} ?`)
    if(conf === true){
      axios.delete("http://test-ytb-bot.herokuapp.com/user",
      {
        headers: {
          'Authorization': "Bearer "+localStorage.getItem("jwtToken")
        },
        params: {
          userId: userId
        }
      })
      .then(()=>{
          setIsUserListUpdated(!isUserListUpdated);
        });
    }
  };

  useEffect(() => {
    setIsLoading(true);
    axios
      .get("http://test-ytb-bot.herokuapp.com/user",
          {
            headers: {
            'Authorization': "Bearer "+localStorage.getItem("jwtToken"),               
        }})
      .then((response) => {
        const userList = response.data;
        setUserList(userList);
        setIsLoading(false)
      })      
  }, [isUserListUpdated]);

  return jwt ? (
    
    <>
    <div className="cart-container">
      <h2 className="table-header" > User List</h2>
      <table>
        <thead>
          <tr>
            <th>{"  "}</th>
          </tr>
        </thead>
        <tbody>
          {isLoading ? <Spinner /> : userTable}
        </tbody>
      </table>
    </div>
  </>
  ) :
  (<Redirect to={"/Login"}></Redirect>);
}
export default UserList;