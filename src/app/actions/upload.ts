'use server';

import { v2 as cloudinary } from 'cloudinary';

// Configure Cloudinary (Use Environment Variables)
cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET 
});

export async function uploadImage(formData: FormData) {
  const file = formData.get('file') as File;
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload_stream({ 
      resource_type: 'auto',
      folder: 'yhills_products'
    }, (error, result) => {
      if (error) return reject(error);
      resolve(result?.secure_url);
    }).end(buffer);
  });
}