

import imageCompression from 'browser-image-compression';

export const uploadToCloudinary = async (file: File) => {

    const cloudName = 'dry5a999y';
    const preset = 'react-journal';

    // Compression options
  const compressed = await imageCompression(file, {
    maxSizeMB: 0.1, // 100 KB
    maxWidthOrHeight: 100,
    useWebWorker: true,
  });


  const formData = new FormData();
  formData.append('file', compressed);
  formData.append('upload_preset', preset); 

  // Cloudinary API endpoint for image upload
  const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
    method: 'POST',
    body: formData,
  });

   if (!res.ok) throw new Error("Error al subir imagen");
  
  const data = await res.json();
  return data.secure_url as string;
};