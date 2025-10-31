"use server";

import sharp from "sharp";
import { promises as fs } from "fs";
import path from "path";

export type ConversionState = {
  success: boolean;
  message: string;
  convertedImage?: {
    data: string; // base64 encoded image
    filename: string;
    mimeType: string;
  };
  error?: string;
};

export async function convertImage(
  prevState: ConversionState | null,
  formData: FormData
): Promise<ConversionState> {
  try {
    const file = formData.get("file") as File;
    const mode = formData.get("mode") as string;

    if (!file)
      return {
        success: false,
        message: "No file provided",
        error: "No file provided",
      };

    if (!mode)
      return {
        success: false,
        message: "No conversion mode selected",
        error: "No conversion mode selected",
      };

    await new Promise((res) => setTimeout(res, 3000));

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    let outputBuffer: Buffer;
    let outputFormat: string;
    let mimeType: string;
    const originalName = file.name.split(".").slice(0, -1).join(".");

    switch (mode) {
      case "png-jpg":
        outputBuffer = await sharp(buffer).jpeg({ quality: 90 }).toBuffer();
        outputFormat = "jpg";
        mimeType = "image/jpeg";
        break;

      case "jpg-png":
        outputBuffer = await sharp(buffer).png({ quality: 90 }).toBuffer();
        outputFormat = "png";
        mimeType = "image/png";
        break;

      case "compress-img":
        // Detect input format and compress accordingly
        const metadata = await sharp(buffer).metadata();
        if (metadata.format === "png") {
          outputBuffer = await sharp(buffer)
            .png({ quality: 70, compressionLevel: 9 })
            .toBuffer();
          outputFormat = "png";
          mimeType = "image/png";
        } else {
          outputBuffer = await sharp(buffer).jpeg({ quality: 70 }).toBuffer();
          outputFormat = "jpg";
          mimeType = "image/jpeg";
        }
        break;

      default:
        return {
          success: false,
          message: "Unsupported conversion mode",
          error: "Unsupported conversion mode",
        };
    }

    const base64Image = outputBuffer.toString("base64");

    return {
      success: true,
      message: "Image converted successfully",
      convertedImage: {
        data: base64Image,
        filename: `${originalName}_converted.${outputFormat}`,
        mimeType,
      },
    };
  } catch (error) {
    console.error("Conversion error:", error);
    return {
      success: false,
      message: "Failed to convert image",
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}
