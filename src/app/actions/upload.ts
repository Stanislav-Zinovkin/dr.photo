"use client"

import { r2Client } from "@/lib/r2"
import { PutObjectCommand } from "@aws-sdk/client-s3"
import { getSignedUrl } from "@aws-sdk/s3-request-presigner"


export async function getPresignedUploadUrl(fileName: string, fileType: string) {
    try {
        const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
        const ext = fileName.split('.').pop();
        const key = `uploads/${uniqueSuffix}.${ext}`;
        
        const command = new PutObjectCommand({
            Bucket: process.env.CLOUFLARE_R2_BUCKET_NAME,
            Key: key,
            ContentType: fileType,
        });

        const presignedUrl = await getSignedUrl(r2Client, command, { expiresIn: 360 });

        const publicUrl = `${process.env.CLOUD_FLARE_R2_PUBLIC_URL}/${key}`;
        return { success: true, presignedUrl, publicUrl, key};
    } catch (error) {
        console.error("Error generating presigned URL:", error);
        return { success: false, error: "Failed to generate upload URL"};
    }
}