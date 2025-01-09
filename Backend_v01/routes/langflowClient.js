// routes/langflowClient.js
import express from "express";
import fetch from "node-fetch";
import { EventSource } from "eventsource";
import dotenv from "dotenv";

dotenv.config();

const router = express.Router();

// LangflowClient Class
class LangflowClient {
  constructor(baseURL, applicationToken) {
    this.baseURL = baseURL;
    this.applicationToken = applicationToken;
  }

  async post(endpoint, body, headers = { "Content-Type": "application/json" }) {
    headers["Authorization"] = `Bearer ${this.applicationToken}`;
    const url = `${this.baseURL}${endpoint}`;
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: headers,
        body: JSON.stringify(body),
      });

      const responseMessage = await response.json();
      if (!response.ok) {
        throw new Error(
          `${response.status} ${response.statusText} - ${JSON.stringify(
            responseMessage
          )}`
        );
      }
      return responseMessage;
    } catch (error) {
      console.error("Request Error:", error.message);
      throw error;
    }
  }

  async initiateSession(
    flowId,
    langflowId,
    inputValue,
    inputType = "chat",
    outputType = "chat",
    stream = false,
    tweaks = {}
  ) {
    const endpoint = `/lf/${langflowId}/api/v1/run/${flowId}?stream=${stream}`;
    return this.post(endpoint, {
      input_value: inputValue,
      input_type: inputType,
      output_type: outputType,
      tweaks: tweaks,
    });
  }

  handleStream(streamUrl, onUpdate, onClose, onError) {
    const eventSource = new EventSource(streamUrl);

    eventSource.onmessage = (event) => {
      const data = JSON.parse(event.data);
      onUpdate(data);
    };

    eventSource.onerror = (event) => {
      console.error("Stream Error:", event);
      onError(event);
      eventSource.close();
    };

    eventSource.addEventListener("close", () => {
      onClose("Stream closed");
      eventSource.close();
    });

    return eventSource;
  }

  async runFlow(
    flowIdOrName,
    langflowId,
    inputValue,
    inputType = "chat",
    outputType = "chat",
    tweaks = {},
    stream = false,
    onUpdate,
    onClose,
    onError
  ) {
    try {
      const initResponse = await this.initiateSession(
        flowIdOrName,
        langflowId,
        inputValue,
        inputType,
        outputType,
        stream,
        tweaks
      );
      console.log("Init Response:", initResponse);

      if (
        stream &&
        initResponse &&
        initResponse.outputs &&
        initResponse.outputs[0].outputs[0].artifacts.stream_url
      ) {
        const streamUrl =
          initResponse.outputs[0].outputs[0].artifacts.stream_url;
        console.log(`Streaming from: ${streamUrl}`);
        this.handleStream(streamUrl, onUpdate, onClose, onError);
      }

      return initResponse;
    } catch (error) {
      console.error("Error running flow:", error);
      onError("Error initiating session");
    }
  }
}

// Route to run Langflow flow
router.post("/", async (req, res) => {
  const { inputValue, inputType, outputType, stream } = req.body;
  const flowIdOrName = "eaab0f28-e2f1-41ae-abf4-6cce8037f54a"; // Replace with your actual flowId
  const langflowId = "f75612d5-74bb-4b4a-9beb-9b7205876409"; // Replace with your actual langflowId
  const applicationToken = process.env.ASTRA_APPLICATION_TOKEN; // Token from .env file
  const baseURL = "https://api.langflow.astra.datastax.com"; // Langflow API Base URL

  if (!applicationToken) {
    return res.status(500).json({
      error: "Application Token is missing. Please check your .env file.",
    });
  }

  const langflowClient = new LangflowClient(baseURL, applicationToken);

  try {
    const tweaks = {
      "ChatInput-0qrxS": {},
      "ParseData-SqEPD": {},
      "Prompt-8 ELgX": {},
      "SplitText-4tVEc": {},
      "ChatOutput-8GSyY": {},
      "AstraDB-LPVoT": {},
      "AstraDB-RK45F": {},
      "File-s9GKv": {},
      "Google Generative AI Embeddings-mp9mc": {},
      "GoogleGenerativeAIModel-jf2Lu": {},
      "Google Generative AI Embeddings-PdEZe": {},
    };

    const response = await langflowClient.runFlow(
      flowIdOrName,
      langflowId,
      inputValue,
      inputType,
      outputType,
      tweaks,
      stream,
      (data) => console.log("Received:", data.chunk), // onUpdate
      (message) => console.log("Stream Closed:", message), // onClose
      (error) => console.log("Stream Error:", error) // onError
    );

    if (!stream && response && response.outputs) {
      const flowOutputs = response.outputs[0];
      const firstComponentOutputs = flowOutputs.outputs[0];
      const output = firstComponentOutputs.outputs.message;

      return res.json({ message: output.message.text });
    }

    return res.json(response);
  } catch (error) {
    console.error("Error running flow:", error);
    return res.status(500).json({ error: error.message });
  }
});

export default router;
