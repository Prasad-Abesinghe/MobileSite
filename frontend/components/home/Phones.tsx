"use client";

import { Fragment } from "react";
import { motion } from "framer-motion";

const logos = [
  { name: "P" },
  { name: "R" },
  { name: "A" },
  { name: "S" },
  { name: "A" },
  { name: "D" },
  { name: " " },
  { name: "A" },
  { name: "B" },
  { name: "E" },
  { name: "S" },
  { name: "I" },
  { name: "N" },
  { name: "G" },
  { name: "H" },
  { name: "E" },
  { name: "-" },
];

export default function Phones() {
  return (
    <section className=" mt-6 overflow-x-clip">
      <div className="container">
        <div className="overflow-hidden flex [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
          <motion.div
            animate={{
              x: "-50%",
            }}
            transition={{
              duration: 20,
              ease: "linear",
              repeat: Infinity,
            }}
            className="flex gap-4 lg:gap-16 pr-24 flex-none"
          >
            {Array.from({ length: 2 }).map((_, i) => (
              <Fragment key={i}>
                {logos.map((logo, index) => (
                  <div
                    key={`${logo.name}-${index}`} // Ensures unique keys
                    className="text-white md:text-6xl text-4xl lg:text-8xl font-bold"
                  >
                    {logo.name}
                  </div>
                ))}
              </Fragment>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
