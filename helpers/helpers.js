/**
 * generateProductSlug
 * @param {*} slugName 
 * @returns 
 */

export const generateSlug = (name) => {
    // Convert the product name to lowercase
    const lowercaseName = name.toLowerCase();
  
    // Remove special characters, spaces, and non-alphanumeric characters
    const slug = lowercaseName
      .replace(/[^\w\s-]/g, '') // Remove special characters
      .replace(/\s+/g, '-')      // Replace spaces with hyphens
      .replace(/--+/g, '-')      // Replace consecutive hyphens with a single hyphen;
  
    return slug;
  }
  