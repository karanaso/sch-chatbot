import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { ChatModels, ChatType, ImageModels, modelChatAtom, modelExplainAtom, modelImageAtom } from "@/lib/store"
import { useAtom } from "jotai";
import { useEffect } from "react";

export const ModelSelector = ({ type }: { type: ChatType }) => {
  const [modelChat, setModelChat] = useAtom(modelChatAtom)
  const [modelImage, setModelImage] = useAtom(modelImageAtom)
  const [modelExplain, setModelExplain] = useAtom(modelExplainAtom)

  useEffect(() => {
    if (type === ChatType.Chat && !modelChat) {
      setModelChat(ChatModels.GPT4Mini)
    } else if (type === ChatType.Image && !modelImage) {
      setModelImage(ImageModels.DallE2)
    } else if (type === ChatType.Explain && !modelExplain) {
      setModelExplain(ChatModels.GPT4Mini)
    }
  }, []);

  useEffect(() => {
    sessionStorage.setItem('chatType-' + type, modelChat)
  }, [modelChat]);

  const handleModelChange = (value: string) => {
    if (type === ChatType.Chat) {
      setModelChat(value as ChatModels)
    } else if (type === ChatType.Image) {
      setModelImage(value as ImageModels)
    } else if (type === ChatType.Explain) {
      setModelExplain(value as ChatModels)
    }
  }

  return (
    <Select onValueChange={handleModelChange}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select your AI Model" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Model</SelectLabel>

          {(type === ChatType.Chat || type === ChatType.Explain) && (
            <>
              <SelectItem value={ChatModels.GPT4Mini}>GPT 4o Mini</SelectItem>
              <SelectItem value={ChatModels.GPT35Turbo} disabled>GPT 3.5 Turbo</SelectItem>
              <SelectItem value={ChatModels.GPT4} disabled>GPT 4</SelectItem>
              <SelectItem value={ChatModels.GPT432k} disabled>GPT 4 32k</SelectItem>
              <SelectItem value={ChatModels.GPT35Turbo16k} disabled>GPT 3.5 Turbo 16k</SelectItem>
              <SelectItem value={ChatModels.GPT4Turbo} disabled>GPT 4 Turbo</SelectItem>
              <SelectItem value={ChatModels.GPT4Vision} disabled>GPT 4 Vision</SelectItem>              
            </>
          )}

          {(type === ChatType.Image) && (
            <>
              <SelectItem value={ImageModels.DallE2}>DALL-E 2</SelectItem>
              <SelectItem value={ImageModels.DallE3} disabled>DALL-E 3</SelectItem>
              <SelectItem value={ImageModels.Midjourney} disabled>Midjourney</SelectItem>
              <SelectItem value={ImageModels.StableDiffusion} disabled>Stable Diffusion</SelectItem>
            </>
          )}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}