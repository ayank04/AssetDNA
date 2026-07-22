const path = require('path');
const fs = require('fs');

class LocalStorageService {
  constructor() {
    // Resolve the public directory relative to the current file (src/services/LocalStorageService.js)
    this.publicDir = path.join(__dirname, '../../public');
  }

  /**
   * Validates local file existence and returns a local public URL
   * @param {string} storagePath The relative path stored in Firestore (e.g. 'documents/manuals/file.pdf')
   * @returns {Promise<string|null>} The public URL or null if file doesn't exist
   */
  async getLocalUrl(storagePath) {
    if (!storagePath) return null;

    try {
      // Normalize path to prevent directory traversal exploits
      const normalizedPath = path.normalize(storagePath).replace(/^(\.\.[\/\\])+/, '');
      const absolutePath = path.join(this.publicDir, normalizedPath);
      
      // Synchronous check is acceptable for this MVP hackathon constraint
      if (fs.existsSync(absolutePath)) {
        // Return the static public URL path that Express serves
        const publicUrl = `/${normalizedPath.replace(/\\/g, '/')}`;
        return publicUrl;
      }
      
      return null;
    } catch (error) {
      console.error(`Local Storage Error checking ${storagePath}:`, error);
      return null;
    }
  }
}

module.exports = new LocalStorageService();
