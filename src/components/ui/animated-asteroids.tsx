"use client";

import { motion } from "framer-motion";
import { usePerformance } from "@/hooks/use-performance";

interface AsteroidProps {
    delay: number;
    duration: number;
    path: "diagonal" | "horizontal" | "vertical" | "arc" | "zigzag";
    size: number;
    startX: number;
    startY: number;
}

function Asteroid({ delay, duration, path, size, startX, startY, useBlur }: AsteroidProps & { useBlur: boolean }) {
    const getPathVariants = () => {
        switch (path) {
            case "diagonal":
                return {
                    x: [`${startX}vw`, `${startX + 110}vw`],
                    y: [`${startY}vh`, `${startY + 110}vh`],
                };
            case "horizontal":
                return {
                    x: ["-10vw", "110vw"],
                    y: `${startY}vh`,
                };
            case "vertical":
                return {
                    x: `${startX}vw`,
                    y: ["-10vh", "110vh"],
                };
            case "arc":
                return {
                    x: ["-10vw", "110vw"],
                    y: [
                        `${startY}vh`,
                        `${startY - 20}vh`,
                        `${startY}vh`,
                        `${startY + 20}vh`,
                        `${startY}vh`,
                    ],
                };
            case "zigzag":
                return {
                    x: ["-10vw", "110vw"],
                    y: [
                        `${startY}vh`,
                        `${startY - 15}vh`,
                        `${startY + 15}vh`,
                        `${startY - 15}vh`,
                        `${startY + 15}vh`,
                        `${startY}vh`,
                    ],
                };
            default:
                return {
                    x: [`${startX}vw`, `${startX + 110}vw`],
                    y: [`${startY}vh`, `${startY + 110}vh`],
                };
        }
    };

    return (
        <motion.div
            className="absolute pointer-events-none"
            initial={{
                x: `${startX}vw`,
                y: `${startY}vh`,
                opacity: 0.3,
            }}
            animate={{
                ...getPathVariants(),
                opacity: [0.2, 0.5, 0.3, 0.5, 0.2],
                rotate: [0, 360],
                scale: [1, 1.2, 0.8, 1],
            }}
            transition={{
                duration,
                delay,
                repeat: Number.POSITIVE_INFINITY,
                ease: "linear",
                opacity: {
                    duration: duration / 2,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                },
                rotate: {
                    duration: duration / 2,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "linear",
                },
                scale: {
                    duration: duration / 3,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                },
            }}
            style={{
                width: `${size}px`,
                height: `${size}px`,
                willChange: "transform, opacity",
                transform: "translateZ(0)", // Force GPU acceleration
            }}
        >
            {/* Asteroid shape - white with glow and tail */}
            <div className="relative w-full h-full">
                {/* Tail/glow trail - only if blur is enabled */}
                {useBlur && (
                    <motion.div
                        className="absolute inset-0 rounded-full"
                        style={{
                            background: "radial-gradient(circle, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0) 70%)",
                            filter: `blur(${size * 0.8}px)`,
                            transform: "translateX(-50%) translateZ(0)",
                            willChange: "opacity",
                        }}
                        animate={{
                            opacity: [0.3, 0.6, 0.3],
                        }}
                        transition={{
                            duration: duration / 4,
                            repeat: Number.POSITIVE_INFINITY,
                            ease: "easeInOut",
                        }}
                    />
                )}

                {/* Main asteroid body */}
                <div
                    className={`w-full h-full rounded-full bg-white/30 relative z-10 ${useBlur ? "backdrop-blur-sm" : ""}`}
                    style={{
                        boxShadow: `
              0 0 ${size * 0.8}px rgba(255, 255, 255, 0.4),
              0 0 ${size * 1.5}px rgba(255, 255, 255, 0.2),
              inset 0 0 ${size * 0.4}px rgba(255, 255, 255, 0.5)
            `,
                        transform: "translateZ(0)",
                    }}
                >
                    {/* Inner core */}
                    <div
                        className="w-full h-full rounded-full bg-white/50"
                        style={{
                            transform: "scale(0.5) translateZ(0)",
                            filter: useBlur ? "blur(0.5px)" : "none",
                        }}
                    />
                </div>
            </div>
        </motion.div>
    );
}

export function AnimatedAsteroids() {
    const { asteroidCount, useBlur } = usePerformance();

    const allAsteroids: AsteroidProps[] = [
        // Diagonal paths
        { delay: 0, duration: 25, path: "diagonal", size: 8, startX: -5, startY: 10 },
        { delay: 5, duration: 30, path: "diagonal", size: 12, startX: -5, startY: 20 },
        { delay: 10, duration: 35, path: "diagonal", size: 6, startX: -5, startY: 30 },

        // Horizontal paths
        { delay: 2, duration: 20, path: "horizontal", size: 10, startX: -5, startY: 15 },
        { delay: 8, duration: 28, path: "horizontal", size: 7, startX: -5, startY: 50 },
        { delay: 15, duration: 32, path: "horizontal", size: 9, startX: -5, startY: 75 },
        { delay: 12, duration: 24, path: "horizontal", size: 11, startX: -5, startY: 35 },

        // Vertical paths
        { delay: 3, duration: 22, path: "vertical", size: 8, startX: 20, startY: -5 },
        { delay: 7, duration: 26, path: "vertical", size: 10, startX: 50, startY: -5 },
        { delay: 11, duration: 30, path: "vertical", size: 6, startX: 80, startY: -5 },

        // Arc paths
        { delay: 4, duration: 27, path: "arc", size: 9, startX: -5, startY: 25 },
        { delay: 9, duration: 29, path: "arc", size: 7, startX: -5, startY: 60 },
        { delay: 14, duration: 33, path: "arc", size: 11, startX: -5, startY: 40 },

        // Zigzag paths
        { delay: 6, duration: 23, path: "zigzag", size: 8, startX: -5, startY: 45 },
        { delay: 13, duration: 31, path: "zigzag", size: 10, startX: -5, startY: 70 },
        { delay: 16, duration: 26, path: "zigzag", size: 7, startX: -5, startY: 55 },
    ];

    // Limit asteroids based on performance
    const asteroids = allAsteroids.slice(0, asteroidCount);

    return (
        <div className="fixed inset-0 overflow-hidden pointer-events-none z-0" style={{ willChange: "contents" }}>
            {asteroids.map((asteroid, index) => (
                <Asteroid key={index} {...asteroid} useBlur={useBlur} />
            ))}
        </div>
    );
}
