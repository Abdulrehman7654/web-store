// src/utils/helpers.js

/**
 * Converts a string into a URL-friendly slug.
 * Example: "Velvet Lip Gloss!" -> "velvet-lip-gloss"
 * @param {string} text - The input string (e.g., product name).
 * @returns {string} The slugified string.
 */
export const slugify = (text) => {
    return text
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, '') // Remove all non-word characters (like !@#)
        .replace(/[\s_-]+/g, '-') // Replace spaces and underscores with a single hyphen
        .replace(/^-+|-+$/g, ''); // Remove leading or trailing hyphens
};

// You can add other utility functions here in the future!