import { atom } from 'jotai'

export enum ChatType {
  Chat = "chat",
  Image = "image",
  Explain = "explain",
}
export interface Chat {
  type: ChatType
}

export enum ChatModels {
  GPT4Mini = "gpt-4o-mini",
  GPT35Turbo = "gpt-3.5-turbo",
  GPT4 = "gpt-4",
  GPT432k = "gpt-4-32k",
  GPT35Turbo16k = "gpt-3.5-turbo-16k",
  GPT4Turbo = "gpt-4-1106-preview",
  GPT4Vision = "gpt-4-vision-preview"
}

export enum ImageModels {
  DallE2 = "dall-e-2",
  DallE3 = "dall-e-3",
  Midjourney = "midjourney",
  StableDiffusion = "stable-diffusion"
}

export const chatTypeAtom = atom<ChatType>(ChatType.Chat)
export const modelChatAtom = atom<ChatModels>(ChatModels.GPT4Mini)
export const modelImageAtom = atom<ImageModels>(ImageModels.DallE3)
export const modelExplainAtom = atom<ChatModels>(ChatModels.GPT4Mini)