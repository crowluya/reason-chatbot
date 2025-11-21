import { tool, type UIMessageStreamWriter } from "ai";
import { z } from "zod";
import type { ChatMessage } from "@/lib/types";

type GenerateImageProps = {
  dataStream: UIMessageStreamWriter<ChatMessage>;
};

// Expected response format from kie.ai API
// The actual field names may vary - common patterns include:
// - "image": base64-encoded image data
// - "data": image data or URL
// - "url": direct URL to generated image
interface KieAiResponse {
  image?: string;  // Base64 or URL
  data?: string;   // Image data
  url?: string;    // Direct URL
}

// kie.ai API endpoint - configurable via environment variable
const KIE_AI_ENDPOINT = process.env.KIE_AI_ENDPOINT || "https://kie.ai/nano-banana";

export const generateImage = ({ dataStream }: GenerateImageProps) =>
  tool({
    description: "Generate an image based on a text prompt using kie.ai nano-banana model",
    inputSchema: z.object({
      prompt: z.string().describe("The description of the image to generate"),
    }),
    execute: async ({ prompt }: { prompt: string }) => {
      try {
        const response = await fetch(KIE_AI_ENDPOINT, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.KIE_AI_API_KEY}`,
          },
          body: JSON.stringify({
            prompt,
          }),
        });

        if (!response.ok) {
          throw new Error(`Image generation failed: ${response.statusText}`);
        }

        const data: KieAiResponse = await response.json();
        
        // Extract image data - try known response field patterns
        // Priority: direct image data > URL
        const imageData = data.image || data.data || data.url;
        
        if (!imageData) {
          throw new Error(
            "kie.ai API returned unexpected response format - no image data found. " +
            "Expected one of: 'image', 'data', or 'url' fields"
          );
        }

        // Stream the image data to the client
        dataStream.write({
          type: "data-imageDelta",
          data: imageData,
        });

        return {
          success: true,
          message: "Image generated successfully",
        };
      } catch (error) {
        console.error("Image generation error:", error);
        return {
          success: false,
          message: `Failed to generate image: ${error instanceof Error ? error.message : "Unknown error"}`,
        };
      }
    },
  });
