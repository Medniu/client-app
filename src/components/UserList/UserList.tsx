import React, {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import axios from "axios";
//import useDebounce from '../../customHooks/useDebounce';
import { User } from '../../types';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import { Spinner } from "react-spinners-css";
// import PersonIcon from "@material-ui/icons/Person";
// import SearchBar from "../SearchBar/SearchBar";
import URL from "../../constants/index";
import "./UserList.css";

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
  const classes = useStyles();
  const [isUserListUpdated, setIsUserListUpdated] = useState(false);
  const [userList, setUserList] = useState<User[]>([]);


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
    axios
      .get("http://test-ytb-bot.herokuapp.com/user",
          {
            headers: {
            'Authorization': "Bearer "+localStorage.getItem("jwtToken"),               
        }})
      .then((response) => {
        const userList = response.data;
        setUserList(userList);
      })      
  }, [isUserListUpdated]);

  return (
    
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
          {userTable}
        </tbody>
      </table>
    </div>
  </>
  );
}
export default UserList;