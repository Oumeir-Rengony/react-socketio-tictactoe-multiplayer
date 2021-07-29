import React, { useState } from 'react';
import { useEffect } from 'react';
import { useContext } from 'react';
import styled from 'styled-components';
import gameContext from '../../context/gameContext';
import gameService from '../../services/gameService';
import socketService from '../../services/socketService';

interface IJoinRoomProps {

};

const JoinRoom = (props: IJoinRoomProps) => {

  const [roomName, setRoomName] = useState('');
  const [isJoining, setJoining] = useState(false);

  const {setInRoom} = useContext(gameContext);

  const handleRoomNameChange = (e: React.ChangeEvent<any>) => {
    const value = e.target.value;
    setRoomName(value);
  };

  const joinRoom = async (e: React.FormEvent) => {
    e.preventDefault();

    const socket = socketService.socket;
    
    if(!roomName || roomName.trim() === "" ||!socket) return;

    setJoining(true);

    const joined = await gameService
      .joinGameRoom(socket, roomName)
      .catch((error) => alert(error));

    if(joined)
      setInRoom(true);
    
    setJoining(false);
  };

  useEffect(() => {
    return () => {
      setInRoom(true); 
      setJoining(false);
    }
  }, [setInRoom]);

  return(
    <form onSubmit={joinRoom}>
      <JoinRoomContainer>
        <h4>Enter Room ID to Join the Game</h4>
        <input className="room__input" placeholder="Room Id" value={roomName} onChange={handleRoomNameChange}/>
        <button className="join_button" type="submit" disabled={isJoining}>
          { isJoining ? "Joining..." : "Join"}
        </button>
      </JoinRoomContainer>
    </form>
  )
};


const JoinRoomContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 2em;

  .room__input {
    height: 30px;
    width: 20em;
    font-size: 17px;
    outline: none;
    border: 1px solid #8e44ad;
    border-radius: 3px;
    padding: 0 10px;
  }

  .join_button {
    outline: none;
    background-color: #8e44ad;
    color: #fff;
    font-size: 17px;
    border: 2px solid transparent;
    border-radius: 5px;
    padding: 4px 18px;
    transition: all 230ms ease-in-out;
    margin-top: 1em;
    cursor: pointer;
    &:hover {
      background-color: transparent;
      border: 2px solid #8e44ad;
      color: #8e44ad;
    }
  }
`;

export default JoinRoom;