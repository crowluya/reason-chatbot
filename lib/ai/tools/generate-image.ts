import { tool } from "ai";
import { z } from "zod";

export const generateImage = ({ dataStream }: { dataStream: any }) =>
  tool({
    description: "Generate an image based on a text prompt using kie.ai nano-banana model",
    inputSchema: z.object({
      prompt: z.string().describe("The description of the image to generate"),
    }),
    execute: async ({ prompt }: { prompt: string }) => {
      try {
        const response = await fetch("https://kie.ai/nano-banana", {
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

        const data = await response.json();
        
        // Assuming the API returns base64 image data
        // If the format is different, we'll need to adjust this
        const imageData = data.image || data.data || data;

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
