"use client";
import React, { useEffect, useState } from "react";
import Audience from "./Audience";
import EventCreator from "./EventCreator";
import { io } from "socket.io-client";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogAction,
  AlertDialogFooter,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "../ui/input";
import { useUserContext } from "@/context/UserContext";
import { Button } from "../ui/button";
import axios from "axios";
import SpinningWheel from "./SpinningWheel";
import NonCreatorSpinningWheel from "./NonCreatorSpinningWheel";
import SpringModal from "../ui/SpringModal";
import { motion } from "framer-motion";
import { TbGiftFilled } from "react-icons/tb";
import { BiHappyHeartEyes } from "react-icons/bi";
import { useToast } from "@/components/ui/use-toast";
import Link from "next/link";

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
    return `${diffYears} year${diffYears > 1 ? "s" : ""} ago`;
  } else if (diffMonths > 0) {
    return `${diffMonths} month${diffMonths > 1 ? "s" : ""} ago`;
  } else if (diffDays > 0) {
    return `${diffDays} day${diffDays > 1 ? "s" : ""} ago`;
  } else if (diffHours > 0) {
    return `${diffHours} hour${diffHours > 1 ? "s" : ""} ago`;
  } else if (diffMinutes > 0) {
    return `${diffMinutes} minute${diffMinutes > 1 ? "s" : ""} ago`;
  } else {
    return `${diffSeconds} second${diffSeconds > 1 ? "s" : ""} ago`;
  }
}

const SpinWheelArea = ({ data, eventId }) => {
  const roomId = eventId;
  const { user } = useUserContext();
  const isCreator = user?.role === "creator";
  const [nameValue, setNameValue] = useState("");
  const [participants, setParticipants] = useState([]);
  const [winner, setWinner] = useState("");
  const [spinning, setSpinning] = useState(false);
  const [spinover, setSpinover] = useState(false);
  const [eventData, setEventData] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isUser, setIsUser] = useState(false);
  const { toast } = useToast();

  const handleSpinFinish = (result) => {
    console.log(`Spun to: ${result}`);
    setWinner(result);
    socket.emit("stopSpinWheel", roomId, result);
  };

  useEffect(() => {
    const checkUserParticipation = async () => {
      if (user && data && data.creator === user?.userId) {
        setIsUser(true);
      } else {
        toast({
          variant: "destructive",
          title: `You're not the creator of this event!`,
          description: `Please Go back or else you'll get a 🍌 - just kidding, you can still join as a participant!`,
        });
      }
    };

    checkUserParticipation();
  }, [data, user]);

  useEffect(() => {
    const fetchParticipants = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BASEURL}/events/rooms/${eventId}`
        );
        setEventData(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching participants:", error);
      }
    };

    fetchParticipants();
  }, [eventId]);

  useEffect(() => {
    const fetchParticipants = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BASEURL}/events/${eventId}/participants`
        );
        setParticipants(response.data.participants);
      } catch (error) {
        console.error("Error fetching participants:", error);
      }
    };

    fetchParticipants();

    socket.on("participantJoined", async (participantName) => {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BASEURL}/events/${eventId}/participants`
      );
      setParticipants(response.data.participants);
    });

    socket.on("startSpinWheel", (roomId) => {
      setSpinning(true);
    });

    socket.on("stopSpinWheel", (winner) => {
      setSpinover(true);
      setSpinning(false);
      setWinner(winner);
      setTimeout(() => {
        setIsOpen(true);
      }, 4000);
    });

    socket.on("participantRemoved", (participantId) => {
      console.log("removeParticipant");
      // Update local state
      setParticipants((prevParticipants) =>
        prevParticipants.filter(
          (participant) => participant._id !== participantId
        )
      );

      // Re-fetch participants from the server
      fetchParticipants();
    });

    return () => {
      socket.off("participantJoined");
      socket.off("startSpinWheel");
      socket.off("startSpinWheel");
      socket.off("participantRemoved");
    };
  }, [eventId]);

  const handleParticipantJoin = (name) => {
    socket.emit("participantJoined", roomId, name);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    handleParticipantJoin(nameValue);
  };

  const handleStartSelection = () => {
    socket.emit("startSpinWheel", roomId);
  };

  const segColors = Array.from(
    { length: participants.length },
    () => `#${Math.floor(Math.random() * 16777215).toString(16)}`
  );

  const shareEvent = async () => {
    try {
      await navigator.share({
        title: "Share Event",
        text: `Check out this awesome event! - ${data?.name}`,
        url: window.location.href,
      });
    } catch (error) {
      console.error("Error sharing event:", error);
    }
  };

  const copyUrl = () => {
    const urlInput = document.createElement("input");
    urlInput.setAttribute("value", window.location.href);
    document.body.appendChild(urlInput);
    urlInput.select();
    document.execCommand("copy");
    document.body.removeChild(urlInput);
    toast({
      title: "URL copied to clipboard!",
    });
  };

  const deleteParticipant = async (participantId) => {
    try {
      await axios.delete(
        `${process.env.NEXT_PUBLIC_BASEURL}/events/rooms/${roomId}/participants/${participantId}`
      );
      toast({
        variant: "success",
        title: "Participant deleted successfully!",
      });
      socket.emit("removeParticipant", roomId, participantId);
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BASEURL}/events/${eventId}/participants`
      );
      setParticipants(response.data.participants);
    } catch (error) {
      console.error("Error deleting participant:", error);
      toast({
        variant: "error",
        title: "Error deleting participant",
        description: error.message,
      });
    }
  };

  return (
    <>
      {eventData?.winner?.name ? (
        <section className="w-full min-h-screen flex flex-col md:mt-0 mt-10">
          {isCreator ? null : (
            <AlertDialog defaultOpen={true}>
              <AlertDialogContent>
                <form onSubmit={handleFormSubmit}>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Join Event {data?.name}.
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      <Input
                        type="text"
                        name="name"
                        placeholder="Enter your name"
                        className="w-full"
                        required
                      />
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter className="mt-2">
                    <AlertDialogAction>
                      <Button type="submit" className="w-auto">
                        Join Event
                      </Button>
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </form>
              </AlertDialogContent>
            </AlertDialog>
          )}
          <div className="p-2 md:grid md:grid-cols-[.4fr_1fr_.4fr] md:h-[50vh] flex flex-col justify-center items-center gap-2">
            <div className="w-full h-full px-3 py-4 dark:bg-[rgba(225,225,225,0.1)] relative bg-[rgba(0,0,0,0.05)] rounded-xl flex md:flex-col flex-row md:items-start items-center justify-start gap-2 md:overflow-y-auto overflow-x-auto">
              <div className="w-full dark:bg-[rgba(225,225,225,0.1)] bg-[rgba(0,0,0,0.1)] border dark:border-[rgba(225,225,225,0.1)] border-[rgba(0,0,0,0.1)] py-2 px-3 rounded-lg sticky top-2 backdrop-blur-3xl md:whitespace-normal whitespace-nowrap">
                Live 🔴
              </div>
              {participants?.map((participant, index) => (
                <Audience key={index} name={participant.name} />
              ))}
            </div>
            <div
              className={`w-full h-full flex justify-center items-center md:overflow-visible overflow-auto`}
            >
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="bg-slate-900/20 backdrop-blur p-8 fixed inset-0 z-40 grid place-items-center overflow-y-scroll cursor-pointer"
              >
                <motion.div
                  initial={{ scale: 0, rotate: "12.5deg" }}
                  animate={{ scale: 1, rotate: "0deg" }}
                  exit={{ scale: 0, rotate: "0deg" }}
                  onClick={(e) => e.stopPropagation()}
                  className="bg-gradient-to-br from-violet-600 to-indigo-600 text-white p-6 rounded-lg w-full max-w-lg shadow-xl cursor-default relative overflow-hidden"
                >
                  <BiHappyHeartEyes className="text-white/10 rotate-12 text-[250px] absolute z-0 -top-24 -left-24" />
                  <div className="relative z-10">
                    <div className="bg-white w-16 h-16 mb-2 rounded-full text-3xl text-indigo-600 grid place-items-center mx-auto">
                      <TbGiftFilled />
                    </div>
                    <h3 className="text-3xl font-bold text-center mb-2">
                      Congratulations! {eventData?.winner?.name || "No One"} was
                      the winner! 🎉
                    </h3>
                    <p className="text-center mb-6">
                      Thank you to all participants for your enthusiasm and
                      sportsmanship. Remember, the joy is in the participation,
                      and your presence made this event special. Let's keep the
                      excitement going for future events!
                    </p>
                    <div className="flex gap-2">
                      <Link
                        href="/events"
                        className="bg-transparent text-center hover:bg-white/10 transition-colors text-white font-semibold w-full py-2 rounded"
                      >
                        Nah, go back
                      </Link>
                      <button className="bg-white hover:opacity-90 transition-opacity text-indigo-600 font-semibold w-full py-2 rounded">
                        Understood!
                      </button>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
              Winner Already announced
            </div>
            <div className="w-full h-full p-3 dark:bg-[rgba(225,225,225,0.1)] relative bg-[rgba(0,0,0,0.05)] rounded-xl flex flex-col gap-2">
              <div className="w-full dark:bg-[rgba(225,225,225,0.1)] bg-[rgba(0,0,0,0.1)] border dark:border-[rgba(225,225,225,0.1)] border-[rgba(0,0,0,0.1)] py-2 px-3 rounded-lg backdrop-blur-3xl">
                Event & Creator Info
              </div>
              <div className="w-full flex flex-col gap-2 px-2">
                <h1 className="text-xl font-semibold">{data?.name}</h1>
                <div className="w-full flex flex-row gap-2 items-center text-xs whitespace-nowrap dark:text-slate-500">
                  <span>{formatTimeAgo(data?.createdAt)}</span>
                  <span>•</span>
                  <span>{data?.maxParticipants} participants</span>
                </div>
                <p className="text-sm dark:text-slate-300 text-slate-500">
                  {data?.description}
                </p>
              </div>
              <EventCreator id={data?.creator} />
              <div className="w-full h-full dark:bg-[rgba(225,225,225,0.1)] bg-[rgba(0,0,0,0.01)] border dark:border-[rgba(225,225,225,0.1)] border-[rgba(0,0,0,0.1)] rounded-lg backdrop-blur-3xl">
                <img
                  src="https://placehold.co/600x400?text=Ad"
                  alt="Creator"
                  className="w-full h-full object-cover rounded-xl border dark:border-[rgba(225,225,225,0.1)] border-[rgba(0,0,0,0.1)]"
                />
              </div>
            </div>
          </div>
        </section>
      ) : (
        <section className="w-full min-h-screen flex flex-col md:mt-0 mt-10">
          {isCreator && isUser ? null : (
            <AlertDialog defaultOpen={true}>
              <AlertDialogContent>
                <form onSubmit={handleFormSubmit}>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Join Event {data?.name}.
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      <Input
                        type="text"
                        name="name"
                        value={nameValue}
                        onChange={(e) => {
                          setNameValue(e.currentTarget.value);
                        }}
                        placeholder="Enter your name"
                        className="w-full"
                        required
                      />
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter className="mt-2">
                    <AlertDialogAction>
                      <Button type="submit" className="w-auto">
                        Join Event
                      </Button>
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </form>
              </AlertDialogContent>
            </AlertDialog>
          )}
          <div className="p-2 md:grid md:grid-cols-[.4fr_1fr_.4fr] md:h-[50vh] flex flex-col justify-center items-center gap-2">
            <div className="w-full h-full px-3 py-4 dark:bg-[rgba(225,225,225,0.1)] relative bg-[rgba(0,0,0,0.05)] rounded-xl flex md:flex-col flex-row md:items-start items-center justify-start gap-2 md:overflow-y-auto overflow-x-auto">
              <div className="w-full flex flex-row justify-between items-center dark:bg-[rgba(225,225,225,0.1)] bg-[rgba(0,0,0,0.1)] border dark:border-[rgba(225,225,225,0.1)] border-[rgba(0,0,0,0.1)] py-2 px-3 rounded-lg sticky top-2 backdrop-blur-3xl md:whitespace-normal whitespace-nowrap">
                <span className="md:mr-0 mr-3">Live 🔴</span>
                <div className="text-xs flex flex-row items-center justify-end">
                  <span
                    className="w-[35px] h-[35px] flex justify-center items-center cursor-pointer dark:hover:bg-[rgba(225,225,225,0.1)] hover:bg-[rgba(0,0,0,0.1)] rounded-2xl"
                    title="Copy URL of the Event!"
                    onClick={shareEvent}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-4 h-4"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186 9.566-5.314m-9.566 7.5 9.566 5.314m0 0a2.25 2.25 0 1 0 3.935 2.186 2.25 2.25 0 0 0-3.935-2.186Zm0-12.814a2.25 2.25 0 1 0 3.933-2.185 2.25 2.25 0 0 0-3.933 2.185Z"
                      />
                    </svg>
                  </span>
                  <span
                    className="w-[35px] h-[35px] flex justify-center items-center cursor-pointer dark:hover:bg-[rgba(225,225,225,0.1)] hover:bg-[rgba(0,0,0,0.1)] rounded-2xl"
                    title="Copy URL of the Event!"
                    onClick={copyUrl}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-4 h-4"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m13.35-.622 1.757-1.757a4.5 4.5 0 0 0-6.364-6.364l-4.5 4.5a4.5 4.5 0 0 0 1.242 7.244"
                      />
                    </svg>
                  </span>
                  {isCreator && isUser ? (
                    <>
                      <Dialog>
                        <DialogTrigger>
                          <span
                            className="w-[35px] h-[35px] flex justify-center items-center cursor-pointer dark:hover:bg-[rgba(225,225,225,0.1)] hover:bg-[rgba(0,0,0,0.1)] rounded-2xl"
                            title="Remove partcipants!"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth={1.5}
                              stroke="currentColor"
                              className="w-4 h-4"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
                              />
                            </svg>
                          </span>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Remove Participants</DialogTitle>
                            <DialogDescription className="max-h-[50vh] overflow-y-auto scrollbar-custom">
                              {participants?.map((participant, index) => (
                                <div
                                  key={index}
                                  className="my-3 p-3 rounded-lg dark:bg-[rgba(225,225,225,0.1)] backdrop-blur-lg"
                                >
                                  <div className="flex flex-row justify-between items-center gap-4">
                                    <span>{participant.name || "No Name"}</span>
                                    <span
                                      className="w-[35px] h-[35px] flex justify-center items-center cursor-pointer dark:hover:bg-[rgba(225,225,225,0.1)] hover:bg-[rgba(0,0,0,0.1)] rounded-2xl"
                                      title="Remove partcipants!"
                                      onClick={() =>
                                        deleteParticipant(participant._id)
                                      }
                                    >
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth={1.5}
                                        stroke="currentColor"
                                        className="w-4 h-4"
                                      >
                                        <path
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                          d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                                        />
                                      </svg>
                                    </span>
                                  </div>
                                </div>
                              ))}
                            </DialogDescription>
                          </DialogHeader>
                        </DialogContent>
                      </Dialog>
                    </>
                  ) : null}
                </div>
              </div>
              {participants?.map((participant, index) => (
                <Audience key={index} name={participant.name} />
              ))}
            </div>
            <SpringModal
              isOpen={isOpen}
              setIsOpen={setIsOpen}
              winner={winner}
            />
            <div
              className={`${isCreator && isUser
                ? "cursor-pointer"
                : "cursor-not-allowed pointer-events-none"
                } w-full h-full flex justify-center items-center md:overflow-visible overflow-auto`}
              onClick={handleStartSelection}
            >
              {participants.length > 0 ? (
                isUser && isCreator ? (
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
                    isUser={isUser}
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
                <div>It seems like, no one joined yet!</div>
              )}
            </div>
            <div className="w-full h-full p-3 dark:bg-[rgba(225,225,225,0.1)] relative bg-[rgba(0,0,0,0.05)] rounded-xl flex flex-col gap-2">
              <div className="w-full dark:bg-[rgba(225,225,225,0.1)] bg-[rgba(0,0,0,0.1)] border dark:border-[rgba(225,225,225,0.1)] border-[rgba(0,0,0,0.1)] py-2 px-3 rounded-lg backdrop-blur-3xl">
                Event & Creator Info
              </div>
              <div className="w-full flex flex-col gap-2 px-2">
                <h1 className="text-xl font-semibold">{data?.name}</h1>
                <div className="w-full flex flex-row gap-2 items-center text-xs whitespace-nowrap dark:text-slate-500">
                  <span>{formatTimeAgo(data?.createdAt)}</span>
                  <span>•</span>
                  <span>{data?.maxParticipants} participants</span>
                </div>
                <p className="text-sm dark:text-slate-300 text-slate-500">
                  {data?.description}
                </p>
              </div>
              <EventCreator id={data?.creator} />
              <div className="w-full h-full dark:bg-[rgba(225,225,225,0.1)] bg-[rgba(0,0,0,0.01)] border dark:border-[rgba(225,225,225,0.1)] border-[rgba(0,0,0,0.1)] rounded-lg backdrop-blur-3xl">
                <img
                  src="https://placehold.co/600x400?text=Ad"
                  alt="Creator"
                  className="w-full h-full object-cover rounded-xl border dark:border-[rgba(225,225,225,0.1)] border-[rgba(0,0,0,0.1)]"
                />
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default SpinWheelArea;
