import { v2 as cloudinary } from "cloudinary"
import fs from "fs";
import { cloud_name, api_key, api_secret } from "./constants.js"

cloudinary.config({
    cloud_name,
    api_key,
    api_secret
})

const uploadOnCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath) { console.log("No file path provided"); return null };
        // console.log("inner clodinary", localFilePath)
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto"
        })
        // file uploaded on cloudinary
        // console.log('response cloudinary', response);
        // console.log('file is uploaded on cloudinary', response.secure_url);
        return response;
    } catch (error) {
        console.log("error of cloudinary", error)
        // remove that file from public/uploads when failed
        fs.unlinkSync(localFilePath)
        return null;
    }
}

export { uploadOnCloudinary }