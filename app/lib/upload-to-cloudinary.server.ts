import axios from "axios";

export const UploadToCloudinary = async (file: File) => {
  const cloudName = process.env.CLOUDINARY_NAME;
  const uploadPreset = "musico";

  if (!cloudName || !uploadPreset) {
    throw new Error(
      "Missing Cloudinary configuration in environment variables."
    );
  }

  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", uploadPreset);

  const response = await axios.post(
    `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
    formData
  );

  if (response.status === 200) {
    return response.data.secure_url;
  }

  throw new Error(`Failed to upload image to Cloudinary`);
};
