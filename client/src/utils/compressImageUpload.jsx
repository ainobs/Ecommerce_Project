import api from '../services/api';

const compressImageUpload = async (file, maxSize, image) => {
  try {
    // Create an HTMLImageElement to get the original dimensions of the image
    const img = new Image();
    img.src = URL.createObjectURL(file);
    await new Promise((resolve, reject) => {
      img.onload = () => {
        URL.revokeObjectURL(img.src);
        resolve();
      };
      img.onerror = reject;
    });
    const { width, height } = img;

    // Resize the image if necessary
    if (width > maxSize || height > maxSize) {
      const aspectRatio = width / height;
      let newWidth, newHeight;
      if (aspectRatio >= 1) {
        newWidth = maxSize;
        newHeight = maxSize / aspectRatio;
      } else {
        newHeight = maxSize;
        newWidth = maxSize * aspectRatio;
      }
      const canvas = document.createElement('canvas');
      canvas.width = newWidth;
      canvas.height = newHeight;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0, newWidth, newHeight);
      const resizedBlob = await new Promise((resolve, reject) => {
        canvas.toBlob(
          (blob) => {
            if (blob !== null) {
              resolve(blob);
            } else {
              reject(new Error('Failed to convert canvas to blob'));
            }
          },
          file.type,
          0.9
        );
      });

      file = new File([resizedBlob], file.name, { type: file.type });
      console.log('formdata1', file);
    }

    // Upload the resized image
    const formData = new FormData();
    formData.append('image', file);
    image && formData.append('deleteImage', image);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const response = await api.post('/images/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.imageUrl;
  } catch (error) {
    console.log('err', error);
    throw error;
  }
};

export default compressImageUpload;
