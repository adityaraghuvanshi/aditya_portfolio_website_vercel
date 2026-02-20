"use client";

import { useState, useCallback } from "react";
import { checkRateLimit, getClientIdentifier, RATE_LIMIT_CONFIG } from "@/utils/security";

interface RateLimitState {
  allowed: boolean;
  remaining: number;
  resetTime: number;
  error: string | null;
}

export function useRateLimit() {
  const [rateLimitState, setRateLimitState] = useState<RateLimitState>({
    allowed: true,
    remaining: RATE_LIMIT_CONFIG.maxRequests,
    resetTime: 0,
    error: null,
  });

  const checkLimit = useCallback((): boolean => {
    const identifier = getClientIdentifier();
    const result = checkRateLimit(identifier);

    setRateLimitState({
      allowed: result.allowed,
      remaining: result.remaining,
      resetTime: result.resetTime,
      error: result.allowed
        ? null
        : `Rate limit exceeded. Please wait ${Math.ceil((result.resetTime - Date.now()) / 1000)} seconds before trying again.`,
    });

    return result.allowed;
  }, []);

  const getTimeUntilReset = useCallback((): number => {
    if (rateLimitState.resetTime === 0) return 0;
    return Math.max(0, Math.ceil((rateLimitState.resetTime - Date.now()) / 1000));
  }, [rateLimitState.resetTime]);

  return {
    ...rateLimitState,
    checkLimit,
    getTimeUntilReset,
  };
}
