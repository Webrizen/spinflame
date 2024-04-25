"use client";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { TbGiftFilled } from "react-icons/tb";
import { BiHappyHeartEyes } from "react-icons/bi";

export default function SpringModal({ isOpen, setIsOpen, winner }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsOpen(false)}
          className="bg-slate-900/20 backdrop-blur p-8 fixed inset-0 z-50 grid place-items-center overflow-y-scroll cursor-pointer"
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
                <TbGiftFilled  />
              </div>
              <h3 className="text-3xl font-bold text-center mb-2">
                Congratulations! {winner || "No One"} is the winner! 🎉
              </h3>
              <p className="text-center mb-6">
                Thank you to all participants for your enthusiasm and
                sportsmanship. Remember, the joy is in the participation, and
                your presence made this event special. Let's keep the excitement
                going for future events!
              </p>
              <div className="flex gap-2">
                <Link
                  href="/events"
                  className="bg-transparent text-center hover:bg-white/10 transition-colors text-white font-semibold w-full py-2 rounded"
                >
                  Nah, go back
                </Link>
                <button
                  onClick={() => setIsOpen(false)}
                  className="bg-white hover:opacity-90 transition-opacity text-indigo-600 font-semibold w-full py-2 rounded"
                >
                  Understood!
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
