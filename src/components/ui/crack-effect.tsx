"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

interface Crack {
  id: number;
  x: number;
  y: number;
  paths: string[];
}

// Generate natural-looking crack paths (like real wall cracks)
function generateCrackPaths(x: number, y: number): string[] {
  const paths: string[] = [];
  const numBranches = 2 + Math.floor(Math.random() * 4); // 2-5 branches
  const mainLength = 100 + Math.random() * 80; // 100-180px
  const angleVariation = Math.PI / 4; // 45 degrees variation

  // Main crack line - starts from click point
  const mainAngle = Math.random() * Math.PI * 2;
  const mainEndX = x + Math.cos(mainAngle) * mainLength;
  const mainEndY = y + Math.sin(mainAngle) * mainLength;
  
  // Create jagged, irregular main line (like real cracks)
  const mainPoints = 10 + Math.floor(Math.random() * 5); // 10-14 points
  let mainPath = `M ${x} ${y}`;
  let prevX = x;
  let prevY = y;
  
  for (let i = 1; i <= mainPoints; i++) {
    const progress = i / mainPoints;
    const targetX = x + (mainEndX - x) * progress;
    const targetY = y + (mainEndY - y) * progress;
    
    // Add irregularity - cracks aren't smooth
    const jaggedness = 12 + Math.random() * 8; // 12-20px variation
    const offsetX = (Math.random() - 0.5) * jaggedness;
    const offsetY = (Math.random() - 0.5) * jaggedness;
    
    // Make it more natural by adding slight curves
    const currentX = targetX + offsetX;
    const currentY = targetY + offsetY;
    
    // Use quadratic curves for smoother, more natural cracks
    if (i === 1) {
      mainPath += ` L ${currentX} ${currentY}`;
    } else {
      const controlX = (prevX + currentX) / 2 + (Math.random() - 0.5) * 5;
      const controlY = (prevY + currentY) / 2 + (Math.random() - 0.5) * 5;
      mainPath += ` Q ${controlX} ${controlY} ${currentX} ${currentY}`;
    }
    
    prevX = currentX;
    prevY = currentY;
  }
  
  paths.push(mainPath);

  // Generate branch cracks (smaller cracks branching off)
  for (let i = 0; i < numBranches; i++) {
    const branchStartProgress = 0.15 + Math.random() * 0.7; // Start along main crack
    const branchStartX = x + (mainEndX - x) * branchStartProgress + (Math.random() - 0.5) * 15;
    const branchStartY = y + (mainEndY - y) * branchStartProgress + (Math.random() - 0.5) * 15;
    
    const branchLength = 25 + Math.random() * 50; // 25-75px
    // Branches tend to go in different directions
    const branchAngle = mainAngle + (Math.random() - 0.5) * angleVariation * 2.5;
    const branchEndX = branchStartX + Math.cos(branchAngle) * branchLength;
    const branchEndY = branchStartY + Math.sin(branchAngle) * branchLength;
    
    // Create jagged branch (shorter and thinner)
    const branchPoints = 3 + Math.floor(Math.random() * 4); // 3-6 points
    let branchPath = `M ${branchStartX} ${branchStartY}`;
    let branchPrevX = branchStartX;
    let branchPrevY = branchStartY;
    
    for (let j = 1; j <= branchPoints; j++) {
      const branchProgress = j / branchPoints;
      const branchTargetX = branchStartX + (branchEndX - branchStartX) * branchProgress;
      const branchTargetY = branchStartY + (branchEndY - branchStartY) * branchProgress;
      
      const branchJaggedness = 8 + Math.random() * 6; // 8-14px
      const branchOffsetX = (Math.random() - 0.5) * branchJaggedness;
      const branchOffsetY = (Math.random() - 0.5) * branchJaggedness;
      
      const branchCurrentX = branchTargetX + branchOffsetX;
      const branchCurrentY = branchTargetY + branchOffsetY;
      
      if (j === 1) {
        branchPath += ` L ${branchCurrentX} ${branchCurrentY}`;
      } else {
        const branchControlX = (branchPrevX + branchCurrentX) / 2 + (Math.random() - 0.5) * 3;
        const branchControlY = (branchPrevY + branchCurrentY) / 2 + (Math.random() - 0.5) * 3;
        branchPath += ` Q ${branchControlX} ${branchControlY} ${branchCurrentX} ${branchCurrentY}`;
      }
      
      branchPrevX = branchCurrentX;
      branchPrevY = branchCurrentY;
    }
    
    paths.push(branchPath);
  }

  return paths;
}

export function CrackEffect() {
  const [cracks, setCracks] = useState<Crack[]>([]);

  useEffect(() => {
    let crackId = 0;

    const handleClick = (e: MouseEvent) => {
      // Don't create cracks on interactive elements
      const target = e.target as HTMLElement;
      if (
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.closest("a") ||
        target.closest("button") ||
        target.closest("[role='button']")
      ) {
        return;
      }

      const newCrack: Crack = {
        id: crackId++,
        x: e.clientX,
        y: e.clientY,
        paths: generateCrackPaths(e.clientX, e.clientY),
      };

      setCracks((prev) => [...prev, newCrack]);

      // Remove crack after 3.5 seconds
      setTimeout(() => {
        setCracks((prev) => prev.filter((crack) => crack.id !== newCrack.id));
      }, 3500);
    };

    window.addEventListener("click", handleClick);

    return () => {
      window.removeEventListener("click", handleClick);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-[9997]">
      <AnimatePresence>
        {cracks.map((crack) => (
          <motion.div
            key={crack.id}
            className="absolute"
            style={{
              left: 0,
              top: 0,
              width: "100%",
              height: "100%",
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <svg
              className="absolute"
              style={{
                left: 0,
                top: 0,
                width: "100%",
                height: "100%",
                overflow: "visible",
              }}
            >
              {crack.paths.map((path, index) => (
                <motion.path
                  key={index}
                  d={path}
                  fill="none"
                  stroke={index === 0 ? "rgba(255, 255, 255, 0.5)" : "rgba(255, 255, 255, 0.35)"}
                  strokeWidth={index === 0 ? "2" : "1.2"}
                  strokeLinecap="round"
                  strokeLinejoin="miter"
                  initial={{
                    pathLength: 0,
                    opacity: 0,
                  }}
                  animate={{
                    pathLength: 1,
                    opacity: [0, 0.6, index === 0 ? 0.5 : 0.35],
                  }}
                  transition={{
                    pathLength: {
                      duration: 0.5,
                      delay: index * 0.08,
                      ease: [0.4, 0, 0.2, 1] as const,
                    },
                    opacity: {
                      duration: 0.4,
                      delay: index * 0.08,
                    },
                  }}
                  style={{
                    filter: index === 0 
                      ? "drop-shadow(0 0 3px rgba(255, 255, 255, 0.4)) drop-shadow(0 0 1px rgba(255, 255, 255, 0.6))"
                      : "drop-shadow(0 0 2px rgba(255, 255, 255, 0.2))",
                  }}
                />
              ))}
            </svg>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
