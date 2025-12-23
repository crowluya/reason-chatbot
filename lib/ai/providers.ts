import { createOpenAI } from "@ai-sdk/openai";
import {
  customProvider,
  extractReasoningMiddleware,
  wrapLanguageModel,
} from "ai";
import { isTestEnvironment } from "../constants";

// OpenRouter configuration
const openrouter = createOpenAI({
  apiKey: process.env.OPENROUTER_API_KEY,
  baseURL: "https://openrouter.ai/api/v1",
});

export const myProvider = isTestEnvironment
  ? (() => {
      const {
        artifactModel,
        chatModel,
        reasoningModel,
        titleModel,
      } = require("./models.mock");
      return customProvider({
        languageModels: {
          "chat-model": chatModel,
          "chat-model-reasoning": reasoningModel,
          "title-model": titleModel,
          "artifact-model": artifactModel,
        },
      });
    })()
  : customProvider({
      languageModels: {
        "chat-model": openrouter("anthropic/claude-3.5-sonnet"),
        "chat-model-reasoning": wrapLanguageModel({
          model: openrouter("openai/o1-mini"),
          middleware: extractReasoningMiddleware({ tagName: "think" }),
        }),
        "title-model": openrouter("anthropic/claude-3.5-sonnet"),
        "artifact-model": openrouter("anthropic/claude-3.5-sonnet"),
      },
    });
