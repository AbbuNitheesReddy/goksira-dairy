"use server";

import { chat, ChatOutput } from "@/ai/flows/chat";

type FormState = {
    message: string;
    result?: ChatOutput;
    success: boolean;
}

export async function handleChat(
  message: string
): Promise<FormState> {

  if (!message) {
    return {
      message: "Message cannot be empty.",
      success: false
    };
  }

  try {
    const result = await chat({ message });
    return {
        message: "Message sent successfully!",
        result,
        success: true
    };
  } catch (error) {
    console.error(error);
    return {
      message: "An error occurred. Please try again.",
      success: false
    };
  }
}
