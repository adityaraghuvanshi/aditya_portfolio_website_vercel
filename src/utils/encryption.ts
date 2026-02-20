/**
 * Simple obfuscation/encryption utilities to hide sensitive data from source code
 * This makes it harder for scrapers to extract contact information
 */

/**
 * Simple XOR cipher for obfuscation
 */
function xorCipher(text: string, key: string): string {
  let result = '';
  for (let i = 0; i < text.length; i++) {
    result += String.fromCharCode(text.charCodeAt(i) ^ key.charCodeAt(i % key.length));
  }
  return result;
}

/**
 * Encode string to base64
 */
function encodeBase64(str: string): string {
  if (typeof window !== 'undefined') {
    return btoa(unescape(encodeURIComponent(str)));
  }
  return Buffer.from(str).toString('base64');
}

/**
 * Decode base64 string
 */
function decodeBase64(str: string): string {
  if (typeof window !== 'undefined') {
    return decodeURIComponent(escape(atob(str)));
  }
  return Buffer.from(str, 'base64').toString();
}

/**
 * Obfuscate contact information
 * Uses multiple layers: XOR cipher + Base64 + splitting
 */
export function obfuscateContact(data: string): string {
  // Use a key derived from environment or a constant (but not the actual data)
  const key = 'portfolio_contact_2024';
  
  // Apply XOR cipher
  const xored = xorCipher(data, key);
  
  // Encode to base64
  const encoded = encodeBase64(xored);
  
  // Split into parts to make it less obvious
  const mid = Math.floor(encoded.length / 2);
  const part1 = encoded.substring(0, mid);
  const part2 = encoded.substring(mid);
  
  // Return as a format that looks like something else
  return `${part1}_${part2}`;
}

/**
 * Deobfuscate contact information
 */
export function deobfuscateContact(obfuscated: string): string {
  try {
    // Rejoin the parts
    const parts = obfuscated.split('_');
    if (parts.length !== 2) {
      throw new Error('Invalid format');
    }
    
    const encoded = parts[0] + parts[1];
    
    // Decode from base64
    const xored = decodeBase64(encoded);
    
    // Apply XOR cipher (XOR is symmetric)
    const key = 'portfolio_contact_2024';
    const data = xorCipher(xored, key);
    
    return data;
  } catch (error) {
    console.error('Deobfuscation error:', error);
    return '';
  }
}

/**
 * Split contact info into multiple parts stored separately
 * This makes it harder to find the complete data
 */
export function splitContact(data: string): { part1: string; part2: string; part3: string } {
  const len = data.length;
  const part1Len = Math.floor(len / 3);
  const part2Len = Math.floor(len / 3);
  
  return {
    part1: obfuscateContact(data.substring(0, part1Len)),
    part2: obfuscateContact(data.substring(part1Len, part1Len + part2Len)),
    part3: obfuscateContact(data.substring(part1Len + part2Len)),
  };
}

/**
 * Reconstruct contact info from split parts
 */
export function reconstructContact(parts: { part1: string; part2: string; part3: string }): string {
  const part1 = deobfuscateContact(parts.part1);
  const part2 = deobfuscateContact(parts.part2);
  const part3 = deobfuscateContact(parts.part3);
  
  return part1 + part2 + part3;
}
