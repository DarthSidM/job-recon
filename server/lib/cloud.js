import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";

dotenv.config();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    timeout: 60000,
});

const uploadPDF = async (fileBuffer, filename = "resume") => {
    try {
        return new Promise((resolve, reject) => {
            const stream = cloudinary.uploader.upload_stream(
                {
                    resource_type: "raw",
                    public_id: `resumes/${Date.now()}-${filename.replace(".pdf", "")}`,
                    format: "pdf",
                },
                (error, result) => {
                    if (error) {
                        console.error("Cloudinary upload error:", error);
                        reject(error);
                    } else {
                        resolve({
                            url: result.secure_url,
                            public_id: result.public_id,
                        });
                    }
                }
            );

            stream.end(fileBuffer);
        });
    } catch (error) {
        console.error("PDF upload error:", error);
        throw error;
    }
};

const deletePDF = async (publicId) => {
    try {
        return await cloudinary.uploader.destroy(publicId, {
            resource_type: "raw",
        });
    } catch (error) {
        console.error("Cloudinary delete error:", error);
        throw error;
    }
};

export { uploadPDF, deletePDF };