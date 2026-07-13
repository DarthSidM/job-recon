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
        const resolvedPublicId = (() => {
            if (!publicId) {
                throw new Error('public id or storage url is required');
            }

            if (!String(publicId).includes('cloudinary.com')) {
                return publicId;
            }

            const url = new URL(publicId);
            const pathSegments = url.pathname.split('/').filter(Boolean);
            const uploadIndex = pathSegments.indexOf('upload');
            const assetSegments = uploadIndex >= 0 ? pathSegments.slice(uploadIndex + 1) : pathSegments;
            const withoutVersion = assetSegments[0]?.startsWith('v') ? assetSegments.slice(1) : assetSegments;
            const joined = withoutVersion.join('/');

            return joined.replace(/\.[^./]+$/, '');
        })();

        return await cloudinary.uploader.destroy(resolvedPublicId, {
            resource_type: "raw",
        });
    } catch (error) {
        console.error("Cloudinary delete error:", error);
        throw error;
    }
};

export { uploadPDF, deletePDF };