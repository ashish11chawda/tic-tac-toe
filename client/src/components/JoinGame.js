import React, { useState } from 'react';
import {Channel, useChatContext} from 'stream-chat-react'
import Game from './Game';
import CustomInput from './CustomInput';

function JoinGame() {
const [rivalUsername, setRivalUsername] = useState("");
const [channel, setChannel] = useState(null);

const {client} = useChatContext();
const createChannel = async () => {
  const response = await client.queryUsers({name: { $eq: rivalUsername }});
  if (response.users.length === 0) {
    alert("User not found!");
    return;
  }
  if (client.userID === response.users[0].id) {
    alert("Cannot create game with yourself. Get a life!");
    return;
  }

  const newChannel =  await client.channel("messaging", {
    members : [client.userID, response.users[0].id]
  });
  await newChannel.watch();
  setChannel(newChannel);
};

  return (
    <>
      { channel ? (
        <Channel channel={channel} Input={CustomInput}>
          <Game channel={channel} setChannel={setChannel}/>
        </Channel>
      ) : (
        <div className='joinGame'>
          <h4>Create Game</h4>
          <input placeholder='Username of the rival' onChange={(event) => {
            setRivalUsername(event.target.value);
          }} />
          <button onClick={createChannel}>Join/Create Game</button>
        </div>
      )
      }
    </>
  )
}
export default JoinGame;