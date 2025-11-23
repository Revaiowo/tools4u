"use server";

import sharp from "sharp";
import { PDFDocument } from "pdf-lib";

export type ConversionState = {
  success: boolean;
  message: string;
  convertedFile?: {
    data: string; // base64 encoded
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

    if (!file) {
      return {
        success: false,
        message: "No file provided",
        error: "No file provided",
      };
    }

    if (!mode) {
      return {
        success: false,
        message: "No conversion mode selected",
        error: "No conversion mode selected",
      };
    }

    // Convert file to buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    let outputBuffer: Buffer;
    let outputFormat: string;
    let mimeType: string;
    const originalName = file.name.split(".").slice(0, -1).join(".");

    // Handle different conversion modes
    switch (mode) {
      // ===== IMAGE CONVERSIONS =====
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

      case "png-webp":
        outputBuffer = await sharp(buffer).webp({ quality: 90 }).toBuffer();
        outputFormat = "webp";
        mimeType = "image/webp";
        break;

      case "jpg-webp":
        outputBuffer = await sharp(buffer).webp({ quality: 90 }).toBuffer();
        outputFormat = "webp";
        mimeType = "image/webp";
        break;

      case "webp-png":
        outputBuffer = await sharp(buffer).png({ quality: 90 }).toBuffer();
        outputFormat = "png";
        mimeType = "image/png";
        break;

      case "webp-jpg":
        outputBuffer = await sharp(buffer).jpeg({ quality: 90 }).toBuffer();
        outputFormat = "jpg";
        mimeType = "image/jpeg";
        break;

      case "to-gif":
        outputBuffer = await sharp(buffer).gif().toBuffer();
        outputFormat = "gif";
        mimeType = "image/gif";
        break;

      case "compress-img":
        const metadata = await sharp(buffer).metadata();
        if (metadata.format === "png") {
          outputBuffer = await sharp(buffer)
            .png({ quality: 70, compressionLevel: 9 })
            .toBuffer();
          outputFormat = "png";
          mimeType = "image/png";
        } else if (metadata.format === "webp") {
          outputBuffer = await sharp(buffer).webp({ quality: 65 }).toBuffer();
          outputFormat = "webp";
          mimeType = "image/webp";
        } else {
          outputBuffer = await sharp(buffer).jpeg({ quality: 70 }).toBuffer();
          outputFormat = "jpg";
          mimeType = "image/jpeg";
        }
        break;

      // ===== IMAGE TO PDF =====
      case "img-pdf":
        const pdfDoc = await PDFDocument.create();
        const imageBytes = buffer;

        let embeddedImage;
        if (
          file.type === "image/png" ||
          file.name.toLowerCase().endsWith(".png")
        ) {
          embeddedImage = await pdfDoc.embedPng(imageBytes);
        } else {
          embeddedImage = await pdfDoc.embedJpg(imageBytes);
        }

        const page = pdfDoc.addPage([
          embeddedImage.width,
          embeddedImage.height,
        ]);
        page.drawImage(embeddedImage, {
          x: 0,
          y: 0,
          width: embeddedImage.width,
          height: embeddedImage.height,
        });

        const pdfBytes = await pdfDoc.save();
        outputBuffer = Buffer.from(pdfBytes);
        outputFormat = "pdf";
        mimeType = "application/pdf";
        break;

      // ===== PDF OPERATIONS =====
      case "compress-pdf":
        const pdfToCompress = await PDFDocument.load(buffer);
        const compressedBytes = await pdfToCompress.save({
          useObjectStreams: true,
        });
        outputBuffer = Buffer.from(compressedBytes);
        outputFormat = "pdf";
        mimeType = "application/pdf";
        break;

      // ===== TEXT CONVERSIONS =====
      case "txt-pdf":
        const textContent = buffer.toString("utf-8");
        const textPdf = await PDFDocument.create();
        const textPage = textPdf.addPage([600, 800]);

        textPage.drawText(textContent.slice(0, 2000), {
          x: 50,
          y: 750,
          size: 12,
          maxWidth: 500,
        });

        const textPdfBytes = await textPdf.save();
        outputBuffer = Buffer.from(textPdfBytes);
        outputFormat = "pdf";
        mimeType = "application/pdf";
        break;

      default:
        return {
          success: false,
          message: "Unsupported conversion mode",
          error: "Unsupported conversion mode",
        };
    }

    // Convert to base64 for transmission
    const base64Data = outputBuffer.toString("base64");

    return {
      success: true,
      message: "File converted successfully",
      convertedFile: {
        data: base64Data,
        filename: `${originalName}_converted.${outputFormat}`,
        mimeType,
      },
    };
  } catch (error) {
    console.error("Conversion error:", error);
    return {
      success: false,
      message: "Failed to convert file",
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}
