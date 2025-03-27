interface Message {
  role: "user" | "agent"
  b64_json?: string
  content: string
}

export enum AIActions {
  CHAT = "chat",
  IMAGE = "image"
}

const OPENAI_KEY='openAIKey';
const getOpenAIKey = () => localStorage.getItem(OPENAI_KEY) || '';
export const setOpenAIKey = (key:string) => localStorage.setItem(OPENAI_KEY, key);

export async function callAI(aiActions: AIActions, messages: Message[]): Promise<string> {
  switch (aiActions) {
    case AIActions.CHAT:
      return getChatCompletion(messages);
    case AIActions.IMAGE:
      return getImageFromMessage(messages);
    default:
      throw new Error('Invalid AI action');
  }
}

async function getChatCompletion(messages: Message[]): Promise<string> {

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getOpenAIKey()}`
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: messages.map(msg => ({
          role: msg.role === 'agent' ? 'assistant' : 'user',
          content: msg.content
        })),
      })
    });
    
    if (response.status === 401) {
      delete localStorage.openAIKey;
      document.location.href='/';
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


async function getImageFromMessage(messages: Message[]): Promise<string> {
  try {
    const response = await fetch('https://api.openai.com/v1/images/generations', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getOpenAIKey()}`
      },
      body: JSON.stringify({
        model: "dall-e-3",
        prompt: messages[messages.length - 1].content,
        response_format: 'b64_json',
        n: 1,
        size: "1024x1024",
      })
    });

    if (!response.ok) {
      throw new Error('Failed to get response from OpenAI');
    }

    const data = await response.json();
    console.log('the data', data);
    return data.data[0].b64_json;
  } catch (error) {
    console.error('Error in image generation:', error);
    return 'Sorry, I encountered an error processing your request.';
  }
}