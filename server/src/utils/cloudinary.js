import { v2 as cloudinary } from "cloudinary"
import fs from "fs";

cloudinary.config({
    cloud_name: process.env.CLOUDINAY_CLOUD_NAME,
    api_key: process.env.CLOUDINAY_API_KEY,
    api_secret: process.env.CLOUDINAY_API_SECRET,
})

const uploadOnCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath) return null;
        const response = await cloudinary.uploader.upload(localPathUrl, {
            resource_type: "auto"
        })
        // file uploaded on cloudinary
        console.log('response cloudinary', response);
        console.log('file is uploaded on cloudinary', response.url);
        return response.url;
    } catch (error) {
        // remove that file from public/uploads when failed
        fs.unlinkSync(localFilePath)
        return null;
    }
}

export { uploadOnCloudinary }