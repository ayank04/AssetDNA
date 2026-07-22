const admin = require('../firebase/admin');

class StorageService {
  constructor() {
    this.bucket = admin.storage().bucket();
  }

  /**
   * Generates a signed URL for secure, temporary file access
   * @param {string} storagePath The path to the file in the bucket
   * @param {number} expiresInMinutes Token expiration window (default 60m)
   * @returns {string|null} The signed URL or null if file doesn't exist
   */
  async getSignedUrl(storagePath, expiresInMinutes = 60) {
    if (!storagePath) return null;

    try {
      const file = this.bucket.file(storagePath);
      
      const [exists] = await file.exists();
      if (!exists) {
        return null;
      }

      const options = {
        version: 'v4',
        action: 'read',
        expires: Date.now() + expiresInMinutes * 60 * 1000,
      };

      const [url] = await file.getSignedUrl(options);
      return url;
    } catch (error) {
      console.error(`Storage Error generating signed URL for ${storagePath}:`, error);
      return null;
    }
  }
}

module.exports = new StorageService();
