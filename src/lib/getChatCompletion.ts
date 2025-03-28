import { ChatModels, ImageModels } from "./store";

export interface Message {
  role: "user" | "agent" | "system"
  url?: string
  content: string
}

export enum AIActions {
  CHAT = "chat",
  IMAGE = "image"
}

const OPENAI_KEY = 'openAIKey';
const getOpenAIKey = () => localStorage.getItem(OPENAI_KEY) || '';
export const setOpenAIKey = (key: string) => localStorage.setItem(OPENAI_KEY, key);

export async function callAI(
  aiActions: AIActions,
  messages: Message[],
  model: ChatModels | ImageModels,
): Promise<string> {
  switch (aiActions) {
    case AIActions.CHAT:
      return getChatCompletion(messages, model as ChatModels);
    case AIActions.IMAGE:
      return getImageFromMessage(messages, model as ImageModels);
    default:
      throw new Error('Invalid AI action');
  }
}

async function getChatCompletion(messages: Message[], model: ChatModels): Promise<string> {
  console.log('using model', model);
  if (!model) return 'Please select a model first';
  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getOpenAIKey()}`
      },
      body: JSON.stringify({
        model: model,
        messages: messages.map(msg => ({
          role: msg.role === 'agent' ? 'assistant' : 'user',
          content: msg.content
        })),
      })
    });

    if (response.status === 401) {
      delete localStorage.openAIKey;
      document.location.href = '/';
    }

    if (!response.ok) {
      throw new Error('Failed to get response from OpenAI');
    }

    const data = await response.json();
    return data.choices[0].message.content;
  } catch (error) {
    console.error('Error in chat completion:', error);
    return 'Sorry, I encountered an error processing your request.';
  }
}


async function getImageFromMessage(messages: Message[], model: ImageModels): Promise<string> {
  console.log('using model', model);
  if (!model) return 'a';
  try {
    const response = await fetch('https://api.openai.com/v1/images/generations', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getOpenAIKey()}`
      },
      body: JSON.stringify({
        model: model,
        prompt: messages[messages.length - 1].content,
        response_format: 'url',
        n: 1,
        size: "1024x1024",
      })
    });

    if (response.status === 401) {
      delete localStorage.openAIKey;
      document.location.href = '/';
    }

    if (!response.ok) {
      throw new Error('Failed to get response from OpenAI');
    }

    const data = await response.json();
    return data.data[0].url;
  } catch (error) {
    console.error('Error in image generation:', error);
    return 'Sorry, I encountered an error processing your request.';
  }
}