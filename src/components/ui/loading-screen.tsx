"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export function LoadingScreen() {
    const [isLoading, setIsLoading] = useState(true);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        // Smooth progress animation
        const progressInterval = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(progressInterval);
                    setTimeout(() => {
                        setIsLoading(false);
                    }, 400);
                    return 100;
                }
                return prev + 1.5;
            });
        }, 25);

        return () => {
            clearInterval(progressInterval);
        };
    }, []);

    return (
        <AnimatePresence>
            {isLoading && (
                <motion.div
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] as const }}
                    className="fixed inset-0 z-[9999] flex items-center justify-center bg-background overflow-hidden"
                >
                    {/* Subtle expanding waves from center */}
                    <motion.div
                        className="absolute inset-0 flex items-center justify-center"
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] as const }}
                    >
                        {/* Multiple subtle expanding circles */}
                        {[0, 1, 2, 3].map((i) => (
                            <motion.div
                                key={i}
                                className="absolute w-2 h-2 rounded-full"
                                style={{
                                    background: "radial-gradient(circle, rgba(167, 139, 250, 0.4) 0%, transparent 70%)",
                                }}
                                initial={{ scale: 0, opacity: 0.6 }}
                                animate={{
                                    scale: [0, 250, 250],
                                    opacity: [0.6, 0.3, 0],
                                }}
                                transition={{
                                    duration: 3,
                                    repeat: Number.POSITIVE_INFINITY,
                                    ease: [0.4, 0, 0.2, 1] as const,
                                    delay: i * 0.75,
                                }}
                            />
                        ))}
                    </motion.div>

                    {/* Smooth reveal effect - expanding from center */}
                    <motion.div
                        className="absolute inset-0"
                        style={{
                            background: `radial-gradient(circle at center, transparent ${Math.min(progress, 100)}%, rgba(10, 10, 10, 0.99) ${Math.min(progress + 5, 105)}%)`,
                        }}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                    />

                    {/* Center dot with smooth pulsing animation */}
                    <motion.div
                        className="absolute w-2 h-2 rounded-full bg-accent z-10"
                        animate={{
                            scale: [1, 1.8, 1.2, 1.8, 1],
                            opacity: [0.8, 1, 0.6, 1, 0.8],
                        }}
                        transition={{
                            duration: 2,
                            repeat: Number.POSITIVE_INFINITY,
                            ease: [0.4, 0, 0.6, 1] as const,
                        }}
                        style={{
                            boxShadow: "0 0 15px rgba(167, 139, 250, 0.6), 0 0 30px rgba(167, 139, 250, 0.3)",
                        }}
                    />

                    {/* Orbiting particles around center */}
                    {[...Array(6)].map((_, i) => {
                        const angle = (i / 6) * Math.PI * 2;
                        const radius = 40;
                        return (
                            <motion.div
                                key={i}
                                className="absolute w-1 h-1 rounded-full bg-accent/50"
                                style={{
                                    left: "50%",
                                    top: "50%",
                                }}
                                animate={{
                                    x: [
                                        Math.cos(angle) * radius,
                                        Math.cos(angle + Math.PI * 2) * radius,
                                    ],
                                    y: [
                                        Math.sin(angle) * radius,
                                        Math.sin(angle + Math.PI * 2) * radius,
                                    ],
                                    opacity: [0.3, 0.7, 0.3],
                                    scale: [0.8, 1.2, 0.8],
                                }}
                                transition={{
                                    duration: 3 + i * 0.2,
                                    repeat: Number.POSITIVE_INFINITY,
                                    ease: "linear",
                                    delay: i * 0.1,
                                }}
                            />
                        );
                    })}
                </motion.div>
            )}
        </AnimatePresence>
    );
}
