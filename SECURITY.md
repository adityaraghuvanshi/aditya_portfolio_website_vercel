# Security Implementation

This document outlines the security measures implemented in this portfolio website.

## Security Features

### 1. Rate Limiting
- **Client-side rate limiting**: 3 requests per 60 seconds per session
- Prevents spam and abuse of the contact form
- Automatic cleanup of expired rate limit entries
- Visual feedback showing remaining requests

### 2. Input Validation & Sanitization
- **Name validation**: 
  - Only letters, spaces, hyphens, and apostrophes allowed
  - Maximum 100 characters
  - Required field
- **Email validation**:
  - Standard email format validation
  - Maximum 254 characters (RFC 5321 compliant)
  - Optional field
- **Message validation**:
  - Maximum 2000 characters
  - Required field
- **XSS Prevention**:
  - All inputs are sanitized to remove potentially dangerous characters
  - Removes `<`, `>`, `javascript:`, and event handlers
  - Trims whitespace

### 3. Spam Detection
- Pattern-based spam detection
- Checks for common spam keywords and patterns
- Blocks messages with multiple spam indicators
- Prevents commercial spam, phishing attempts, and malicious content

### 4. Security Headers
- **X-Content-Type-Options**: Prevents MIME type sniffing
- **X-Frame-Options**: Prevents clickjacking attacks
- **X-XSS-Protection**: Enables browser XSS filter
- **Referrer-Policy**: Controls referrer information
- **Permissions-Policy**: Restricts browser features

### 5. Content Security Policy (CSP)
- Restricts resource loading to trusted sources only
- Prevents XSS attacks by controlling script execution
- Allows only necessary external resources (fonts, WhatsApp)
- Blocks inline scripts and styles where possible

### 6. Form Security
- **Length limits**: Prevents buffer overflow attacks
- **Character restrictions**: Prevents injection attacks
- **Real-time validation**: Immediate feedback to users
- **Sanitized output**: All data is sanitized before use

### 7. External Link Security
- All external links use `rel="noopener noreferrer"`
- WhatsApp links use secure protocol (https://wa.me)
- Prevents tabnabbing attacks

## Configuration

### Rate Limiting
Located in `src/utils/security.ts`:
```typescript
RATE_LIMIT_CONFIG = {
  maxRequests: 3,        // Max requests per window
  windowMs: 60000,        // 1 minute window
  maxNameLength: 100,
  maxEmailLength: 254,
  maxMessageLength: 2000,
}
```

### Security Headers
Configured in `index.html` via meta tags. For production deployment on Vercel, consider adding these via `vercel.json`:

```json
{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        },
        {
          "key": "X-Frame-Options",
          "value": "DENY"
        },
        {
          "key": "X-XSS-Protection",
          "value": "1; mode=block"
        },
        {
          "key": "Referrer-Policy",
          "value": "strict-origin-when-cross-origin"
        },
        {
          "key": "Content-Security-Policy",
          "value": "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://vercel.live; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: https:; connect-src 'self' https://wa.me https://*.vercel.live; frame-src 'none'; object-src 'none'; base-uri 'self'; form-action 'self';"
        }
      ]
    }
  ]
}
```

## Best Practices

1. **Never trust client-side validation alone** - Always validate on the server side in production
2. **Use HTTPS** - Always serve the site over HTTPS
3. **Keep dependencies updated** - Regularly update npm packages for security patches
4. **Monitor rate limits** - Adjust limits based on actual usage patterns
5. **Log security events** - In production, log rate limit violations and spam attempts

## Future Enhancements

- Server-side rate limiting (requires backend)
- CAPTCHA integration for additional bot protection
- Honeypot fields for spam detection
- IP-based rate limiting (requires backend)
- Security event logging and monitoring
- CSRF tokens (if adding server-side forms)

## Reporting Security Issues

If you discover a security vulnerability, please report it responsibly.
