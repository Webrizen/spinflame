"use client";
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Image from 'next/image';

export default function Features() {
    const [selectedFeature, setSelectedFeature] = useState(0);
    const [intervalId, setIntervalId] = useState(null);

    const features = [
        {
            title: "Seamless Integration",
            description: "Integrate our spinning wheel seamlessly into your website or app. With easy-to-use APIs and widgets, implementation is hassle-free, allowing you to focus on engaging your audience.",
            imageUrl: "https://source.unsplash.com/random/1500x1000?sig=1"
        },
        {
            title: "Interactive Spinning Wheel",
            description: "Engage your audience with interactive spinning wheel contests. Customize prizes, rules, and visuals to create captivating experiences for participants.",
            imageUrl: "https://source.unsplash.com/random/1500x1000?sig=2"
        },
        {
            title: "Real-Time Prize Distribution",
            description: "Experience the excitement of instant prize distribution as winners are selected in real time. No waiting, just instant gratification for lucky contestants.",
            imageUrl: "https://source.unsplash.com/random/1500x1000?sig=3"
        },
        {
            title: "Custom Contest Creation",
            description: "Create unique contests tailored to your brand or event. Customize every aspect, from the appearance of the spinning wheel to the selection of prizes.",
            imageUrl: "https://source.unsplash.com/random/1500x1000?sig=4"
        },
        {
            title: "Community Engagement",
            description: "Foster community interaction and loyalty by hosting engaging spinning wheel contests. Encourage participation and reward your audience with exciting prizes.",
            imageUrl: "https://source.unsplash.com/random/1500x1000?sig=5"
        }
    ];    

    const handleFeatureClick = (index) => {
        setSelectedFeature(index);
    };

    const [ref, inView] = useInView({
        triggerOnce: false,
        threshold: 0.5,
    });

    const fadeInFromBottom = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
    };

    const fadeInFromRight = {
        hidden: { opacity: 0, x: 20 },
        visible: { opacity: 1, x: 0 }
    };

    const fadeInLeft = {
        hidden: { opacity: 0, x: -10 },
        visible: { opacity: 1, x: 0 }
    };

    return (
        <>
            <section className="py-20 " ref={ref}>
                <div className="max-w-7xl mx-auto relative px-5 sm:px-10 md:px-12 lg:px-5 overflow-hidden">
                    <div className="flex flex-col gap-5 relative">
                        <div className="space-y-4 max-w-xl">
                            <span
                                className="rounded-lg bg-blue-50 dark:bg-gray-900 px-2.5 py-1 text-xs font-semibold tracking-wide text-blue-700 dark:text-gray-100">Feature</span>
                            <h1
                                className="md:text-6xl font-bold text-6xl leading-tight">Why Choose <br/><span className='bg-gradient-to-br from-orange-500 to-red-500 bg-clip-text text-transparent'>SpinFlame ?</span></h1>
                        </div>
                        <p
                            className="text-gray-700 dark:text-gray-300 md:max-w-3xl">SpinFlame delivers unmatched engagement and thrill. With customizable contests, real-time rewards, and seamless integration, captivate your audience like never before. Elevate your brand with SpinFlame.</p>
                    </div>
                    <div className="mt-16 flex flex-col md:flex-row gap-8 xl:gap-10">
                        <div className="md:w-96 lg:w-[26rem] space-y-5 flex flex-col md:py-6">
                            {features.map((feature, index) => (
                                <motion.div
                                    key={index}
                                    className={`cursor-pointer relative p-3 before:rounded-md rounded-md backdrop-blur-lg space-y-3 before:absolute before:transition-all ${selectedFeature === index ? 'before:ease-linear before:scale-x-105 before:scale-y-110 before:inset-0 before:bg-gradient-to-b from-orange-500 to-red-500 text-white' : 'hover:before:ease-linear hover:before:scale-x-105 hover:before:scale-y-110 before:inset-0 hover:before:bg-gray-100 hover:before:dark:bg-gray-900'}`}
                                    onClick={() => handleFeatureClick(index)}
                                    whileHover={{ scale: selectedFeature === index ? 1 : 0.95 }}
                                    whileTap={{ scale: 0.95 }}
                                    style={{
                                        boxShadow: selectedFeature === index ? '0 0 20px 8px rgba(59, 130, 246, 0.5)' : 'none'
                                    }}
                                >
                                    <motion.h2
                                        className="text-xl font-semibold text-gray-900 dark:text-white relative">
                                        {feature.title}
                                    </motion.h2>
                                    {selectedFeature === index && (
                                        <p className="relative text-gray-700 dark:text-gray-300 text-sm">
                                            {feature.description}
                                        </p>
                                    )}
                                </motion.div>
                            ))}
                        </div>
                        <div className="flex-1 md:h-auto">
                            <motion.div
                                key={selectedFeature}
                                className='flex-1 relative bg-gradient-to-tr from-sky-100 to-indigo-300 p-6 rounded-lg md:h-[500px] overflow-hidden'
                                initial={{ y: "100%" }}
                                animate={{ y: 0 }}
                                transition={{ type: "spring", stiffness: 120, damping: 15 }}
                            >
                                <motion.img
                                    src={`${features[selectedFeature]?.imageUrl || "https://placehold.co/1500x1000"}`}
                                    alt="illustration"
                                    width={1800}
                                    className="w-full h-full object-cover"
                                />
                            </motion.div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}