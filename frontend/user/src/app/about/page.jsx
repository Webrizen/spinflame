"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

export default function page() {
    const [ref4, inView4] = useInView({
        triggerOnce: false,
        threshold: 0.2
    });

    const fadeInFromBottom = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
    };

    return (
        <motion.section
            ref={ref4}
            id='About'
            className="py-12"
        >
            <div className="container mx-auto md:px-24 px-4">
                <div className="flex flex-col md:flex-row items-center">
                    <div
                        className="md:w-1/2 mb-10 md:mb-0 px-4"
                    >
                        <motion.h2
                            initial="hidden"
                            animate={inView4 ? "visible" : "hidden"}
                            variants={fadeInFromBottom}
                            transition={{ delay: 0.2, duration: 0.5 }}
                            className="text-3xl font-semibold dark:text-slate-100 text-slate-900 mb-4">About Spinflame</motion.h2>
                        <motion.p
                            initial="hidden"
                            animate={inView4 ? "visible" : "hidden"}
                            variants={fadeInFromBottom}
                            transition={{ delay: 0.3, duration: 0.6 }}
                            className="text-slate-600 dark:text-slate-300 text-md">
                            At Spinflame, we're not just a brand; we're a commitment to the purest form of well-being. Born from a deep-seated belief that true health is nurtured from within, our journey is dedicated to empowering individuals through natural, potent, and conscientious healing solutions.
                        </motion.p>
                        <motion.p
                            initial="hidden"
                            animate={inView4 ? "visible" : "hidden"}
                            variants={fadeInFromBottom}
                            transition={{ delay: 0.4, duration: 0.7 }}
                            className="text-slate-600 dark:text-slate-300 text-md my-4">
                            Our founders (Marcela & Marc Pierre) inspired by the transformative power of natural remedies, embarked on a mission to bring unadulterated wellness to every home. We understand that nature holds profound secrets for health and vitality, and our products are crafted to unlock these secrets in their most authentic form.
                        </motion.p>
                        <motion.p
                            initial="hidden"
                            animate={inView4 ? "visible" : "hidden"}
                            variants={fadeInFromBottom}
                            transition={{ delay: 0.5, duration: 0.7 }} className="text-slate-600 dark:text-slate-300 text-md my-4">

                            Our signature collection, a symphony of sea moss-infused products including gels, organic juices, teas, and lemonades, is designed to replenish and revitalize your body with over 90 essential minerals and vitamins. For those seeking relief and rejuvenation, our magnesium spray offers a soothing embrace, aiding in arthritis relief and sleep enhancement, while our elderberry syrup stands as a bastion of antioxidant strength, actively fighting inflammation.
                        </motion.p>
                        <motion.div initial="hidden"
                            animate={inView4 ? "visible" : "hidden"}
                            variants={fadeInFromBottom}
                            transition={{ delay: 0.6, duration: 0.7 }} className="text-slate-600 dark:text-slate-300 text-md">
                            At Spinflame, purity is our promise. We meticulously source only the highest quality ingredients, ensuring that each product not only meets but exceeds our stringent standards. Our ethos is simple yet profound: to provide holistic, effective wellness solutions that harmonize with your body's natural rhythm, nurturing health from the inside out.
                            Join us on this journey to holistic health. With Spinflame, you're not just nurturing your body; you're embracing a lifestyle of conscious, natural well-being.
                        </motion.div>
                    </div>

                    <motion.div
                        initial="hidden"
                        animate={inView4 ? "visible" : "hidden"}
                        variants={fadeInFromBottom}
                        transition={{ delay: 0.7, duration: 0.8 }}
                        className="md:w-1/2 w-full px-4"
                    >
                        <img
                            src="https://placehold.co/500x500"
                            alt="About Spinflame"
                            className="w-full h-auto rounded-lg shadow-lg"
                        />
                    </motion.div>
                </div>
            </div>
        </motion.section>
    )
}