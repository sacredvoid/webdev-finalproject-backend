function generateUniqueFileName(originalFileName) {
    const timestamp = new Date().toISOString().replace(/[-:.]/g, '');
    const randomString = Math.random().toString(36).substring(2, 8);
    const uniqueFileName = `${timestamp}_${randomString}_${originalFileName}`;
    return uniqueFileName;
  }
  
  // Example usage
  const originalFileName = 'example.txt';
  const uniqueFileName = generateUniqueFileName(originalFileName);
  
  console.log(`Original File Name: ${originalFileName}`);
  console.log(`Unique File Name: ${uniqueFileName}`);

  export default generateUniqueFileName;