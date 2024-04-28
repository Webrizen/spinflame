import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function page() {
  return (
    <>
      <section className="w-full">
        <div className="container mx-auto grid md:grid-cols-2 gap-2 grid-cols-1 items-center justify-center md:py-2 py-10">
          {/* Content Section */}
          <div className="w-full md:ml-8">
            <h2 className="text-3xl font-bold mb-6">
              Frequently Asked Questions
            </h2>

            {/* FAQ Items */}
            <div className="mb-8">
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger>What is Spin Wheel Game?</AccordionTrigger>
                  <AccordionContent>
                    Spin Wheel Game is an interactive platform that allows users
                    to create and participate in spinning wheel contests.
                    Participants can spin the wheel to win prizes, choose random
                    options, or make decisions based on chance.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2" className="text-left">
                  <AccordionTrigger>
                    How do I create a Spin Wheel Contest?
                  </AccordionTrigger>
                  <AccordionContent>
                    To create a Spin Wheel Contest, simply sign up or log in to
                    your account, navigate to the "Create Event" page, fill in
                    the required details such as event name, description,
                    customize the appearance of your wheel, and publish your
                    contest.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                  <AccordionTrigger>
                    How can I participate in a Spin Wheel Contest?
                  </AccordionTrigger>
                  <AccordionContent>
                    Participating in a Spin Wheel Contest is easy. Just browse
                    the available contests on the platform, select the one you
                    want to join, and enter your name and simply join. whever
                    creator spin the wheel you will be able to see it live.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-4">
                  <AccordionTrigger>
                    Is there a limit to the number of participants in a contest?
                  </AccordionTrigger>
                  <AccordionContent>
                    The contest creator can set a maximum number of participants
                    for their contest however non-pro creators cannot set
                    maximum limit, it'll be 50 by default. Once the maximum
                    limit is reached, no additional participants will be allowed
                    to join.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-5">
                  <AccordionTrigger>
                    How are winners determined in Spin Wheel Contests?
                  </AccordionTrigger>
                  <AccordionContent>
                    Winners in Spin Wheel Contests are determined randomly based
                    on the outcome of the wheel spin. The wheel is divided into
                    segments, each representing a possible outcome or prize.
                    When a creator spins the wheel, the segment where the
                    pointer lands determines the result.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>

            {/* CTA or Additional Content */}
            <p className="text-slate-500">
              Have more questions? Feel free to reach out to us at{" "}
              <a href="mailto:support@spinflame.com" className="text-blue-500">
                support@spinflame.com
              </a>
            </p>
          </div>

          {/* Image Section */}
          <div className="w-full p-10 flex justify-center items-center">
            <img
              src="/faq.png"
              alt="FAQ Image"
              className="w-auto h-full md:aspect-[3/4] aspect-square object-contain rounded-md"
            />
          </div>
        </div>
      </section>
    </>
  );
}
