"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export function LoadingScreen() {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Simulate loading time (adjust as needed)
        const loadingTimer = setTimeout(() => {
            setIsLoading(false);
        }, 2000);

        return () => {
            clearTimeout(loadingTimer);
        };
    }, []);

    return (
        <AnimatePresence>
            {isLoading && (
                <motion.div
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] as const }}
                    className="fixed inset-0 z-[9999] flex items-center justify-center bg-background overflow-hidden"
                >
                    <motion.div
                        initial={{ filter: "blur(20px)", opacity: 0.3, scale: 0.95 }}
                        animate={{ filter: "blur(0px)", opacity: 1, scale: 1 }}
                        transition={{ duration: 1.5, ease: [0.4, 0, 0.2, 1] as const }}
                        className="text-center relative w-full max-w-md px-4"
                    >
                        {/* Clean minimal loader */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.8, delay: 0.2, ease: [0.4, 0, 0.2, 1] as const }}
                            className="mb-8"
                        >
                            <motion.div
                                className="w-16 h-16 md:w-20 md:h-20 mx-auto border-4 border-accent/30 border-t-accent rounded-full"
                                animate={{ rotate: 360 }}
                                transition={{
                                    duration: 1,
                                    repeat: Number.POSITIVE_INFINITY,
                                    ease: "linear",
                                }}
                            />
                        </motion.div>

                        {/* Animated progress bar */}
                        <motion.div
                            initial={{ width: 0, opacity: 0 }}
                            animate={{ width: "100%", opacity: 1 }}
                            transition={{ duration: 1.8, delay: 0.3, ease: [0.4, 0, 0.2, 1] as const }}
                            className="h-1 bg-secondary/30 rounded-full overflow-hidden relative"
                        >
                            <motion.div
                                initial={{ x: "-100%" }}
                                animate={{ x: "100%" }}
                                transition={{
                                    duration: 1.5,
                                    repeat: Number.POSITIVE_INFINITY,
                                    ease: [0.4, 0, 0.6, 1] as const,
                                }}
                                className="h-full w-1/3 bg-gradient-to-r from-transparent via-accent to-transparent"
                            />
                        </motion.div>

                        {/* Floating particles */}
                        {[...Array(6)].map((_, i) => {
                            const angle = (i / 6) * Math.PI * 2;
                            const radius = 80;
                            return (
                                <motion.div
                                    key={i}
                                    className="absolute w-2 h-2 rounded-full bg-accent/30"
                                    initial={{
                                        x: "50%",
                                        y: "50%",
                                        opacity: 0,
                                        scale: 0,
                                    }}
                                    animate={{
                                        x: `calc(50% + ${Math.cos(angle) * radius}px)`,
                                        y: `calc(50% + ${Math.sin(angle) * radius}px)`,
                                        opacity: [0, 1, 0],
                                        scale: [0, 1, 0],
                                    }}
                                    transition={{
                                        duration: 2 + Math.random() * 2,
                                        repeat: Number.POSITIVE_INFINITY,
                                        delay: i * 0.3,
                                        ease: [0.4, 0, 0.6, 1] as const,
                                    }}
                                />
                            );
                        })}
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
