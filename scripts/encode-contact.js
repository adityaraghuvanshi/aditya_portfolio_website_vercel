/**
 * Helper script to encode contact information
 * Run with: node scripts/encode-contact.js
 * 
 * This will generate base64 encoded values that you can use in the contact component
 */

// Your actual contact information (replace these)
const whatsappNumber = "919767975386"; // Your WhatsApp number with country code (no +)
const emailAddress = "raghuvanshiaditya2211@gmail.com"; // Your email address

// Encode to base64
function encodeBase64(str) {
  return Buffer.from(str).toString('base64');
}

// Generate obfuscated values
const encodedWhatsApp = encodeBase64(whatsappNumber);
const encodedEmail = encodeBase64(emailAddress);

console.log('\n=== Encoded Contact Information ===\n');
console.log('WhatsApp Number:');
console.log(`const obfuscatedWhatsApp = "${encodedWhatsApp}";`);
console.log('\nEmail Address:');
console.log(`const obfuscatedEmail = "${encodedEmail}";`);
console.log('\n=== Copy these values to src/components/sections/contact.tsx ===\n');

// Verify decoding works
function decodeBase64(str) {
  return Buffer.from(str, 'base64').toString();
}

console.log('Verification:');
console.log(`WhatsApp decodes to: ${decodeBase64(encodedWhatsApp)}`);
console.log(`Email decodes to: ${decodeBase64(encodedEmail)}`);
console.log('\n');
