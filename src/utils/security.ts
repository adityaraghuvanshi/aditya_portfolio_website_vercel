/**
 * Security utilities for input validation, sanitization, and rate limiting
 */

// Rate limiting storage (in-memory, for client-side)
interface RateLimitEntry {
  count: number;
  resetTime: number;
}

const rateLimitStore = new Map<string, RateLimitEntry>();

/**
 * Rate limiting configuration
 */
export const RATE_LIMIT_CONFIG = {
  maxRequests: 3, // Maximum requests per window
  windowMs: 60000, // 1 minute window
  maxNameLength: 100,
  maxEmailLength: 254,
  maxMessageLength: 2000,
};

/**
 * Check if request is within rate limit
 */
export function checkRateLimit(identifier: string): { allowed: boolean; remaining: number; resetTime: number } {
  const now = Date.now();
  const entry = rateLimitStore.get(identifier);

  if (!entry || now > entry.resetTime) {
    // Create new entry or reset expired entry
    rateLimitStore.set(identifier, {
      count: 1,
      resetTime: now + RATE_LIMIT_CONFIG.windowMs,
    });
    return {
      allowed: true,
      remaining: RATE_LIMIT_CONFIG.maxRequests - 1,
      resetTime: now + RATE_LIMIT_CONFIG.windowMs,
    };
  }

  if (entry.count >= RATE_LIMIT_CONFIG.maxRequests) {
    return {
      allowed: false,
      remaining: 0,
      resetTime: entry.resetTime,
    };
  }

  entry.count++;
  return {
    allowed: true,
    remaining: RATE_LIMIT_CONFIG.maxRequests - entry.count,
    resetTime: entry.resetTime,
  };
}

/**
 * Get client identifier (IP-based or session-based)
 */
export function getClientIdentifier(): string {
  // Use sessionStorage for client-side rate limiting
  let identifier = sessionStorage.getItem('clientId');
  if (!identifier) {
    identifier = `client_${Date.now()}_${Math.random().toString(36).substring(7)}`;
    sessionStorage.setItem('clientId', identifier);
  }
  return identifier;
}

/**
 * Sanitize string input to prevent XSS
 */
export function sanitizeInput(input: string): string {
  if (typeof input !== 'string') return '';
  
  return input
    .replace(/[<>]/g, '') // Remove < and >
    .replace(/javascript:/gi, '') // Remove javascript: protocol
    .replace(/on\w+=/gi, '') // Remove event handlers like onclick=
    .trim();
}

/**
 * Validate email format
 */
export function validateEmail(email: string): boolean {
  if (!email) return true; // Optional field
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email) && email.length <= RATE_LIMIT_CONFIG.maxEmailLength;
}

/**
 * Validate name
 */
export function validateName(name: string): boolean {
  if (!name || name.trim().length === 0) return false;
  if (name.length > RATE_LIMIT_CONFIG.maxNameLength) return false;
  
  // Allow letters, spaces, hyphens, apostrophes
  const nameRegex = /^[a-zA-Z\s\-']+$/;
  return nameRegex.test(name.trim());
}

/**
 * Validate message
 */
export function validateMessage(message: string): boolean {
  if (!message || message.trim().length === 0) return false;
  if (message.length > RATE_LIMIT_CONFIG.maxMessageLength) return false;
  return true;
}

/**
 * Detect potential bot/spam patterns
 */
export function detectSpam(name: string, email: string, message: string): boolean {
  const combined = `${name} ${email} ${message}`.toLowerCase();
  
  // Check for common spam patterns
  const spamPatterns = [
    /(http|https|www\.)/gi, // URLs
    /(buy|sell|cheap|discount|offer|deal)/gi, // Commercial keywords
    /(click here|visit now|act now)/gi, // Urgency phrases
    /(free money|make money|earn money)/gi, // Money-making schemes
    /(viagra|cialis|pills)/gi, // Pharmaceutical spam
  ];

  // Count spam pattern matches
  let spamScore = 0;
  spamPatterns.forEach(pattern => {
    const matches = combined.match(pattern);
    if (matches) spamScore += matches.length;
  });

  // If more than 2 spam indicators, likely spam
  return spamScore > 2;
}

/**
 * Validate and sanitize form data
 */
export interface FormValidationResult {
  valid: boolean;
  errors: string[];
  sanitized: {
    name: string;
    email: string;
    message: string;
  };
}

export function validateAndSanitizeForm(
  name: string,
  email: string,
  message: string
): FormValidationResult {
  const errors: string[] = [];
  const sanitized = {
    name: sanitizeInput(name),
    email: sanitizeInput(email),
    message: sanitizeInput(message),
  };

  // Validate name
  if (!validateName(sanitized.name)) {
    errors.push('Name is required and should only contain letters, spaces, hyphens, and apostrophes (max 100 characters)');
  }

  // Validate email (optional but must be valid if provided)
  if (sanitized.email && !validateEmail(sanitized.email)) {
    errors.push('Please provide a valid email address (max 254 characters)');
  }

  // Validate message
  if (!validateMessage(sanitized.message)) {
    errors.push('Message is required and must be less than 2000 characters');
  }

  // Check for spam
  if (detectSpam(sanitized.name, sanitized.email, sanitized.message)) {
    errors.push('Your message contains suspicious content. Please revise and try again.');
  }

  return {
    valid: errors.length === 0,
    errors,
    sanitized,
  };
}

/**
 * Clean up expired rate limit entries (run periodically)
 */
export function cleanupRateLimitStore(): void {
  const now = Date.now();
  for (const [key, entry] of rateLimitStore.entries()) {
    if (now > entry.resetTime) {
      rateLimitStore.delete(key);
    }
  }
}

// Clean up every 5 minutes
if (typeof window !== 'undefined') {
  setInterval(cleanupRateLimitStore, 5 * 60 * 1000);
}
