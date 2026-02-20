"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export function CustomCursor() {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [trail, setTrail] = useState<Array<{ x: number; y: number; id: number }>>([]);
    const [isHovering, setIsHovering] = useState(false);
    const [dotOffset, setDotOffset] = useState({ x: 0, y: 0 });

    useEffect(() => {
        let trailId = 0;
        const maxTrailLength = 30; // Increased trail length for more sensitivity
        let lastX = 0;
        let lastY = 0;
        let lastUpdateTime = Date.now();
        let returnToCenterInterval: number | null = null;
        const minDistance = 1; // Very sensitive - update even on tiny movements

        const updateMousePosition = (e: MouseEvent) => {
            const distance = Math.sqrt(
                Math.pow(e.clientX - lastX, 2) + Math.pow(e.clientY - lastY, 2)
            );

            // Only update if moved enough (very sensitive threshold)
            if (distance >= minDistance) {
                setMousePosition({ x: e.clientX, y: e.clientY });

                // Calculate movement direction and velocity
                const now = Date.now();
                const timeDelta = Math.max(now - lastUpdateTime, 1); // Prevent division by zero
                const deltaX = e.clientX - lastX;
                const deltaY = e.clientY - lastY;
                const velocity = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

                // Normalize direction and scale by velocity (with max limit)
                const maxOffset = 8; // Maximum offset distance
                const speedFactor = Math.min(velocity / 15, 1); // Normalize speed
                const offsetDistance = speedFactor * maxOffset;

                if (velocity > 0.3) {
                    const angle = Math.atan2(deltaY, deltaX);
                    const offsetX = Math.cos(angle) * offsetDistance;
                    const offsetY = Math.sin(angle) * offsetDistance;
                    setDotOffset({ x: offsetX, y: offsetY });

                    // Clear return to center interval if moving
                    if (returnToCenterInterval) {
                        clearInterval(returnToCenterInterval);
                        returnToCenterInterval = null;
                    }
                }

                lastX = e.clientX;
                lastY = e.clientY;
                lastUpdateTime = now;

                // Add new point to trail with very sensitive tracking
                setTrail((prev) => {
                    const newTrail = [
                        { x: e.clientX, y: e.clientY, id: trailId++ },
                        ...prev,
                    ].slice(0, maxTrailLength);
                    return newTrail;
                });
            }
        };

        // Return dot to center when mouse stops moving
        const startReturnToCenter = () => {
            if (returnToCenterInterval) return;

            returnToCenterInterval = setInterval(() => {
                setDotOffset((prev) => {
                    const distance = Math.sqrt(prev.x * prev.x + prev.y * prev.y);
                    if (distance < 0.1) {
                        if (returnToCenterInterval) {
                            clearInterval(returnToCenterInterval);
                            returnToCenterInterval = null;
                        }
                        return { x: 0, y: 0 };
                    }
                    return {
                        x: prev.x * 0.85,
                        y: prev.y * 0.85,
                    };
                });
            }, 16); // ~60fps
        };

        // Check for mouse inactivity
        let inactivityTimer: number;
        const resetInactivityTimer = () => {
            clearTimeout(inactivityTimer);
            inactivityTimer = window.setTimeout(() => {
                startReturnToCenter();
            }, 100); // Start returning after 100ms of no movement
        };

        const handleMouseEnter = () => setIsHovering(true);
        const handleMouseLeave = () => setIsHovering(false);

        // Check for interactive elements
        const handleMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            if (
                target.tagName === "A" ||
                target.tagName === "BUTTON" ||
                target.closest("a") ||
                target.closest("button") ||
                target.style.cursor === "pointer"
            ) {
                setIsHovering(true);
            } else {
                setIsHovering(false);
            }
        };

        const handleMouseMove = (e: MouseEvent) => {
            updateMousePosition(e);
            resetInactivityTimer();
        };

        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("mouseover", handleMouseOver);
        document.addEventListener("mouseenter", handleMouseEnter);
        document.addEventListener("mouseleave", handleMouseLeave);

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("mouseover", handleMouseOver);
            document.removeEventListener("mouseenter", handleMouseEnter);
            document.removeEventListener("mouseleave", handleMouseLeave);
            clearTimeout(inactivityTimer);
            if (returnToCenterInterval) {
                clearInterval(returnToCenterInterval);
            }
        };
    }, []);

    return (
        <>
            {/* Cursor trail - very sensitive with smooth fade */}
            {trail.map((point, index) => {
                const size = Math.max(6 - index * 0.12, 1.5);
                const opacity = Math.max(0.5 - index * 0.016, 0.08);
                const blur = Math.min(index * 0.5, 3);

                return (
                    <motion.div
                        key={point.id}
                        className="fixed pointer-events-none z-[9998] rounded-full bg-white/40"
                        style={{
                            left: point.x,
                            top: point.y,
                            width: `${size}px`,
                            height: `${size}px`,
                            transform: "translate(-50%, -50%)",
                            opacity,
                            filter: `blur(${blur}px)`,
                            boxShadow: `0 0 ${size * 1.5}px rgba(255, 255, 255, 0.4), 0 0 ${size * 3}px rgba(255, 255, 255, 0.2)`,
                        }}
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity }}
                        transition={{
                            duration: 0.05,
                            ease: "easeOut",
                        }}
                    />
                );
            })}

            {/* Main cursor */}
            <motion.div
                className="fixed pointer-events-none z-[9999]"
                style={{
                    left: mousePosition.x,
                    top: mousePosition.y,
                    transform: "translate(-50%, -50%)",
                }}
                animate={{
                    scale: isHovering ? 1.5 : 1,
                }}
                transition={{
                    type: "spring",
                    stiffness: 500,
                    damping: 28,
                }}
            >
                {/* Outer glow ring */}
                <motion.div
                    className="w-6 h-6 rounded-full border-2 border-white/60"
                    animate={{
                        scale: isHovering ? 1.3 : 1,
                        opacity: isHovering ? 0.8 : 0.6,
                    }}
                    transition={{
                        type: "spring",
                        stiffness: 500,
                        damping: 28,
                    }}
                    style={{
                        boxShadow: "0 0 20px rgba(255, 255, 255, 0.4), inset 0 0 10px rgba(255, 255, 255, 0.2)",
                    }}
                />

                {/* Inner dot - moves in direction of mouse movement */}
                <motion.div
                    className="absolute top-1/2 left-1/2 w-2 h-2 rounded-full bg-white"
                    style={{
                        transform: "translate(-50%, -50%)",
                        boxShadow: "0 0 10px rgba(255, 255, 255, 0.8)",
                    }}
                    animate={{
                        scale: isHovering ? 1.2 : 1,
                        x: dotOffset.x,
                        y: dotOffset.y,
                    }}
                    transition={{
                        scale: {
                            type: "spring",
                            stiffness: 500,
                            damping: 28,
                        },
                        x: {
                            type: "spring",
                            stiffness: 400,
                            damping: 30,
                            mass: 0.5,
                        },
                        y: {
                            type: "spring",
                            stiffness: 400,
                            damping: 30,
                            mass: 0.5,
                        },
                    }}
                />
            </motion.div>
        </>
    );
}
