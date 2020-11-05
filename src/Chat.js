import React ,{ useState, useEffect } from 'react'
import { Avatar, IconButton } from "@material-ui/core";
import { AttachFile, SearchOutlined, MoreVert} from "@material-ui/icons";
import InsertEmoticonIcon from "@material-ui/icons/InsertEmoticon";
import MicIcon from "@material-ui/icons/Mic";
import { useParams } from "react-router";
import "./Chat.css";
import db from './firebase';
import firebase from "firebase";
import { useStateValue } from './StateProvider';
function Chat() {
    const [seed, setSeed] = useState('');
    const [input, setInput] = useState('');
    const { roomId }= useParams();
    const [roomName, setRoomName] = useState("");
    const [messages,setMessages] =useState([]);
    const [{user},dispacth]= useStateValue();
    useEffect( () => {
        if (roomId){
            db.collection('rooms').doc(roomId).onSnapshot(snapshot => 
                setRoomName(snapshot.data().name)
            );
            db.collection("rooms").doc(roomId).collection("messages").orderBy('timestamp','asc').onSnapshot((snapshot) => (
                    setMessages(snapshot.docs.map(doc => doc.data()))
                ));
        }
    },[roomId]);
    useEffect(() => {
        setSeed(Math.floor(Math.random() * 5000 ));
    }, [roomId]);
    const sendMessage =(e) => {
       e.preventDefault();
       //console.log(input);
       db.collection('rooms').doc(roomId).collection('messages').add({
           message: input,
           name: user.displayName,
           timestamp: firebase.firestore.FieldValue.serverTimestamp(), 
       });
       setInput("");
    }
    return (
        <div className="chat">
            <div className="chatheader">
            <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />
            <div className="chatheaderinfo">
                <h3>{roomName}</h3>
                <p>Last seen{' '} {new Date(messages[messages.length-1]?.timestamp?.toDate()).toUTCString()}</p>
            </div>
            <div className="classheaderRight">
                <IconButton>
                    <SearchOutlined />
                </IconButton>
                <IconButton>
                    <AttachFile />
                </IconButton>
                <IconButton>
                    <MoreVert/>
                </IconButton>
            </div>
            </div>
            <div className="chatbody">
            {messages.map((message)=>
                <p className={`chatmessage ${message.name === user.displayName && "chatreceiver"}`}>
                <span className="chatname">{message.name}</span>{message.message}
                <span className="chattimestamp">{new Date(message.timestamp?.toDate()).toUTCString()}</span>
               </p>
            )}
            </div>
            <div className="chatfooter">
            <InsertEmoticonIcon />
            <form>
                <input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Type a message" type="text" />
                <button onClick={sendMessage} type="submit">Send a Message</button>
            </form>
            <MicIcon />
            </div>
        </div>
    )
}
export default Chat;
