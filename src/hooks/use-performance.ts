"use client";

import { useState, useEffect } from "react";

interface PerformanceConfig {
  isLowEnd: boolean;
  asteroidCount: number;
  trailLength: number;
  useBlur: boolean;
  animationQuality: "high" | "medium" | "low";
}

export function usePerformance(): PerformanceConfig {
  const [config, setConfig] = useState<PerformanceConfig>({
    isLowEnd: false,
    asteroidCount: 16,
    trailLength: 30,
    useBlur: true,
    animationQuality: "high",
  });

  useEffect(() => {
    // Detect device capabilities
    const detectPerformance = () => {
      const hardwareConcurrency = navigator.hardwareConcurrency || 4;
      const deviceMemory = (navigator as any).deviceMemory || 4; // GB
      const connection = (navigator as any).connection;
      const effectiveType = connection?.effectiveType || "4g";
      
      // Check for reduced motion preference
      const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      
      // Calculate performance score
      let score = 0;
      
      // CPU cores (more = better)
      if (hardwareConcurrency >= 8) score += 3;
      else if (hardwareConcurrency >= 4) score += 2;
      else score += 1;
      
      // Device memory (more = better)
      if (deviceMemory >= 8) score += 3;
      else if (deviceMemory >= 4) score += 2;
      else score += 1;
      
      // Network speed (faster = better, but less impact)
      if (effectiveType === "4g") score += 1;
      
      // Check for low-end device indicators
      const isLowEnd = 
        hardwareConcurrency <= 2 ||
        deviceMemory <= 2 ||
        prefersReducedMotion ||
        score <= 3;
      
      // Determine configuration based on performance
      let asteroidCount = 16;
      let trailLength = 30;
      let useBlur = true;
      let animationQuality: "high" | "medium" | "low" = "high";
      
      if (isLowEnd || prefersReducedMotion) {
        asteroidCount = 6;
        trailLength = 15;
        useBlur = false;
        animationQuality = "low";
      } else if (score <= 5) {
        asteroidCount = 10;
        trailLength = 20;
        useBlur = true;
        animationQuality = "medium";
      }
      
      setConfig({
        isLowEnd,
        asteroidCount,
        trailLength,
        useBlur,
        animationQuality,
      });
    };
    
    detectPerformance();
    
    // Re-detect on connection change
    const connection = (navigator as any).connection;
    if (connection) {
      connection.addEventListener("change", detectPerformance);
      return () => connection.removeEventListener("change", detectPerformance);
    }
  }, []);

  return config;
}
