import { atom } from 'jotai'

export enum ChatType {
  Chat = "chat",
  Image = "image",
  Explain = "explain",
}
export interface Chat {
  type: ChatType
}


export const chatTypeAtom = atom<ChatType>(ChatType.Chat)
