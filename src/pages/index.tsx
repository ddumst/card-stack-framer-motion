/* eslint-disable @next/next/no-img-element */
import Head from 'next/head'
import { motion } from "framer-motion";
import move from '@/utils/move.util'
import { useRef, useState } from 'react'

const CARDS = [
  {
    color: "#266678",
    image: "https://picsum.photos/id/237/360/480"
  },
  {
    color: "#cb7c7a",
    image: "https://picsum.photos/id/25/360/480"
  },
  {
    color: "#36a18b",
    image: "https://picsum.photos/id/53/360/480"
  },
  {
    color: "#cda35f",
    image: "https://picsum.photos/id/239/360/480"
  },
  {
    color: "#747474",
    image: "https://picsum.photos/id/27/360/480"
  }
];
const CARD_OFFSET = 80;
const SCALE_FACTOR = 0.05;

export default function Home() {
  const [cards, setCards] = useState(CARDS);
  const constraintsRef = useRef(null);
  
  const moveToEnd = (from: number) => {
    setCards(move({ array: cards, moveIndex: from, toIndex: cards.length - 1 }));
  };

  return (
    <>
      <Head>
        <title>Card Stack Framer Motion</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="relative flex flex-col gap-12 items-center justify-center h-screen">
        <h1 className="font-bold text-4xl">
          Card Stack Framer Motion
        </h1>
        <div className='container flex relative items-center justify-center'>
          <div 
            ref={constraintsRef}
            className='relative w-[360px] h-[480px]'
          >
            {cards.map((card, index) => {
              const canDrag = index === 0;

              return (
                <motion.div
                  key={card.color}
                  initial={false}
                  className='absolute w-[360px] h-[480px] rounded-2xl overflow-hidden bg-gray-800 cursor-grab'
                  style={{
                    transformOrigin: "top center",
                    filter: index !== 0 ? "blur(2px)" : "none",
                    y: 0
                  }}
                  animate={{
                    y: index * 10,
                    left: index * -CARD_OFFSET,
                    scale: 1 - index * SCALE_FACTOR,
                    zIndex: CARDS.length - index
                  }}
                  drag={canDrag ? "y" : false}
                  dragConstraints={constraintsRef}
                  onDragEnd={() => moveToEnd(index)}
                >
                  <img
                    style={{
                      objectFit: "cover",
                      height: "200px",
                      pointerEvents: "none",
                      width: "100%",
                    }}
                    alt={card.color}
                    src={card.image}
                  />
                </motion.div>
              );
            })}
          </div>
        </div>
      </main>
    </>
  )
}