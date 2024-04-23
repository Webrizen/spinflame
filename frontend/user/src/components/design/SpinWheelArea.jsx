"use client";
import React, { useEffect, useState } from 'react';
import { SpinWheel } from 'spin-wheel-game';
import Audience from './Audience';
import EventCreator from './EventCreator';
import { io } from "socket.io-client";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogAction,
  AlertDialogFooter,
  AlertDialogTitle
} from "@/components/ui/alert-dialog";
import { Input } from '../ui/input';
import { useUserContext } from '@/context/UserContext';
import { Button } from '../ui/button';
import axios from "axios";
import SpinningWheel from './SpinningWheel';
import NonCreatorSpinningWheel from './NonCreatorSpinningWheel';

const socket = io.connect(`${process.env.NEXT_PUBLIC_BASEURL_SOCKET}`);

function formatTimeAgo(timestamp) {
  const currentDate = new Date();
  const createdAtDate = new Date(timestamp);
  const diffMilliseconds = currentDate - createdAtDate;
  const diffSeconds = Math.floor(diffMilliseconds / 1000);
  const diffMinutes = Math.floor(diffSeconds / 60);
  const diffHours = Math.floor(diffMinutes / 60);
  const diffDays = Math.floor(diffHours / 24);
  const diffMonths = Math.floor(diffDays / 30);
  const diffYears = Math.floor(diffDays / 365);

  if (diffYears > 0) {
    return `${diffYears} year${diffYears > 1 ? 's' : ''} ago`;
  } else if (diffMonths > 0) {
    return `${diffMonths} month${diffMonths > 1 ? 's' : ''} ago`;
  } else if (diffDays > 0) {
    return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
  } else if (diffHours > 0) {
    return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
  } else if (diffMinutes > 0) {
    return `${diffMinutes} minute${diffMinutes > 1 ? 's' : ''} ago`;
  } else {
    return `${diffSeconds} second${diffSeconds > 1 ? 's' : ''} ago`;
  }
}

const SpinWheelArea = ({ data, eventId }) => {
  const roomId = eventId;
  const { user } = useUserContext();
  const isCreator = user?.role === "creator";
  const [participants, setParticipants] = useState([]);
  const [winner, setWinner] = useState('');
  const [spinning, setSpinning] = useState(false);
  const [spinover, setSpinover] = useState(false);

  const handleSpinFinish = (result) => {
    console.log(`Spun to: ${result}`);
    setWinner(result);
    socket.on('stopSpinWheel', roomId, winner);
    alert(`${winner}`);
  };

  useEffect(() => {
    const fetchParticipants = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_BASEURL}/events/${eventId}/participants`);
        setParticipants(response.data.participants);
      } catch (error) {
        console.error('Error fetching participants:', error);
      }
    };

    fetchParticipants();

    socket.on('participantJoined', (participantName) => {
      setParticipants(prevParticipants => [...prevParticipants, participantName]);
    });

    socket.on('participantLeft', (participantName) => {
      setParticipants(prevParticipants =>
        prevParticipants.filter(participant => participant !== participantName)
      );
    });

    socket.on('startSpinWheel', (roomId) => {
      setSpinning(true);
      console.log("spin is true");
    });

    socket.on('stopSpinWheel', (roomId, winner) => {
      setSpinover(true);
      setSpinning(false);
      setWinner(winner);
      console.log(`stoped the wheel ${winner}`)
    });

    return () => {
      socket.off('participantJoined');
      socket.off('participantLeft');
      socket.off('startSpinWheel');
      socket.off('startSpinWheel');
    };
  }, [eventId]);

  const handleParticipantJoin = (name) => {
    socket.emit('participantJoined', roomId, name);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const participantName = event.target.elements.name.value;
    handleParticipantJoin(participantName);
  };

  const handleStartSelection = () => {
    socket.emit('startSpinWheel', roomId);
    console.log("started the wheel")
  };

  const segColors = Array.from({ length: participants.length }, () => `#${Math.floor(Math.random() * 16777215).toString(16)}`);

  return (
    <section className='w-full min-h-screen flex flex-col md:mt-0 mt-16'>
      {/* {isCreator ? null : (
        <AlertDialog defaultOpen={true}>
          <AlertDialogContent>
            <form onSubmit={handleFormSubmit}>
              <AlertDialogHeader>
                <AlertDialogTitle>Join Event {data?.name}.</AlertDialogTitle>
                <AlertDialogDescription>
                  <Input type="text" name="name" placeholder="Enter your name" className="w-full" required />
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter className="mt-2">
                <AlertDialogAction><Button type="submit" className="w-auto">Join Event</Button></AlertDialogAction>
              </AlertDialogFooter>
            </form>
          </AlertDialogContent>
        </AlertDialog>
      )} */}
      <div className='p-2 md:grid md:grid-cols-[.4fr_1fr_.4fr] md:h-[50vh] flex flex-col justify-center items-center gap-2'>
        <div className='w-full h-full px-3 py-4 dark:bg-[rgba(225,225,225,0.1)] relative bg-[rgba(0,0,0,0.05)] rounded-xl flex md:flex-col flex-row md:items-start items-center justify-start gap-2 md:overflow-y-auto overflow-x-auto'>
          <div className='w-full dark:bg-[rgba(225,225,225,0.1)] bg-[rgba(0,0,0,0.1)] border dark:border-[rgba(225,225,225,0.1)] border-[rgba(0,0,0,0.1)] py-2 px-3 rounded-lg sticky top-2 backdrop-blur-3xl md:whitespace-normal whitespace-nowrap'>Live 🔴</div>
          {participants.map((participant, index) => (
            <Audience key={index} name={participant} />
          ))}
        </div>
        <div className={`${isCreator ? 'cursor-pointer' : 'cursor-not-allowed pointer-events-none'} w-full h-full flex justify-center items-center md:overflow-visible overflow-auto`} onClick={handleStartSelection}>
          {participants.length > 0 ? (
            isCreator ? (
              <SpinningWheel
                segments={participants}
                segColors={segColors}
                winningSegment=""
                onFinished={(winner) => handleSpinFinish(winner)}
                primaryColor="black"
                primaryColoraround="#ffffffb4"
                contrastColor="white"
                buttonText="Spin"
                isOnlyOnce={true}
                size={190}
                upDuration={50}
                downDuration={2000}
                isCreator={isCreator}
              />
            ) : (
              <NonCreatorSpinningWheel
                segments={participants}
                segColors={segColors}
                spinning={spinning}
                spinover={spinover}
                winner={winner}
                primaryColor="black"
                primaryColoraround="#ffffffb4"
                contrastColor="white"
                buttonText="Spin"
                isOnlyOnce={true}
                size={190}
                upDuration={50}
                downDuration={2000}
              />
            )
          ) : (
            <div>Please Wait...</div>
          )}

        </div>
        <div className='w-full h-full p-3 dark:bg-[rgba(225,225,225,0.1)] relative bg-[rgba(0,0,0,0.05)] rounded-xl flex flex-col gap-2'>
          <div className='w-full dark:bg-[rgba(225,225,225,0.1)] bg-[rgba(0,0,0,0.1)] border dark:border-[rgba(225,225,225,0.1)] border-[rgba(0,0,0,0.1)] py-2 px-3 rounded-lg backdrop-blur-3xl'>Event & Creator Info</div>
          <div className='w-full flex flex-col gap-2 px-2'>
            <h1 className='text-xl font-semibold'>{data?.name}</h1>
            <div className='w-full flex flex-row gap-2 items-center text-xs whitespace-nowrap dark:text-slate-500'>
              <span>{formatTimeAgo(data?.createdAt)}</span>
              <span>•</span>
              <span>{data?.maxParticipants} participants</span>
            </div>
            <p className='text-sm dark:text-slate-300 text-slate-500'>{data?.description}</p>
          </div>
          <EventCreator id={data?.creator} />
          <div className='w-full h-full dark:bg-[rgba(225,225,225,0.1)] bg-[rgba(0,0,0,0.01)] border dark:border-[rgba(225,225,225,0.1)] border-[rgba(0,0,0,0.1)] rounded-lg backdrop-blur-3xl'>
            <img src="https://placehold.co/600x400?text=Ad" alt='Creator' className='w-full h-full object-cover rounded-xl border dark:border-[rgba(225,225,225,0.1)] border-[rgba(0,0,0,0.1)]' />
          </div>
        </div>
      </div>
    </section>
  );
};

export default SpinWheelArea;
