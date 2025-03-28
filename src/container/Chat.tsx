import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Cog } from "lucide-react"
import { callAI, AIActions, Message } from "@/lib/getChatCompletion"

import { scrollToBottom } from "../lib/scroll"
import { useAtom } from "jotai"
import { Chat, ChatModels, ChatType, chatTypeAtom, ImageModels, modelChatAtom, modelExplainAtom, modelImageAtom } from "@/lib/store"
import { ModelSelector } from "@/components/ModelSelector"


export function ChatBot({ type }: Chat) {
  const [loading, setLoading] = useState<boolean>(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState<string>("")
  const [, setChatType] = useAtom(chatTypeAtom)
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

    setChatType(type);

    if (type === ChatType.Explain) {
      if (sessionStorage.getItem(type)) {
        return setMessages(JSON.parse(sessionStorage.getItem(type) || "[]"));
      }
      setMessages([
        { role: "system", content: "You are a helpful tutor that guides students step by step. Never give the final answer immediately unless the student is correct. Instead, break it down into as many small logical steps possible and ask guiding questions. Wait for student responses before proceeding." },
        {
          role: "agent",
          content: "Hi, how can I help you today?",
        },
      ]);
    } else if (type === ChatType.Image) {
      if (sessionStorage.getItem(type)) {
        return setMessages(JSON.parse(sessionStorage.getItem(type) || "[]"));
      }
      setMessages([
        {
          role: "agent",
          content: "Hi, what image would you like to generate?",
        },
      ]);
    } else if (type === ChatType.Chat) {
      if (sessionStorage.getItem(type)) {
        return setMessages(JSON.parse(sessionStorage.getItem(type) || "[]"));
      }
      setMessages([
        {
          role: "agent",
          content: "Hi, how can I help you today?",
        },
      ]);
    }
  }, [type]);

  useEffect(() => {
    scrollToBottom();
    const talkToAI = async () => {
      if ((messages.length > 0) && (messages[messages.length - 1].role === 'user')) {
        setLoading(true);

        let model: ChatModels | ImageModels;
        if (type === ChatType.Image) {
          model = modelImage;
        } else if (type === ChatType.Explain) {
          model = modelExplain;
        } else {
          model = modelChat;
        }
        const response = await callAI(
          (type === ChatType.Image ? AIActions.IMAGE : AIActions.CHAT),
          messages,
          model,
        );
        setLoading(false);

        if (type === ChatType.Image) {
          setMessages([
            ...messages,
            {
              role: "agent",
              url: response,
              content: '',
            },
          ])
        } else {
          setMessages([
            ...messages,
            {
              role: "agent",
              content: response,
            },
          ])
        }
        scrollToBottom();
      }
    }
    if (messages.length > 1) {
      sessionStorage.setItem(type, JSON.stringify(messages));
    }

    talkToAI();
  }, [messages])

  const sendMessage = async (): Promise<void> => {
    if (input.trim()) {
      setMessages([
        ...messages,
        {
          role: "user",
          content: input,
        },
      ])
      setInput("")
      scrollToBottom();
    }
  }
  return (
    <Card className="flex flex-col w-full h-full max-h-full overflow-hidden">
      <CardHeader>
        <CardTitle
          className="flex flex-row justify-between"
        >
          <span>Chat</span>
          <ModelSelector type={type} />
        </CardTitle>
        <CardDescription>Chat with our AI assistant</CardDescription>
      </CardHeader>
      <CardContent id="scrollArea" className="flex-1 overflow-y-scroll">
        <div

          className="pr-4  scrollbar-thin scrollbar-w-[1px]"
        >
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex gap-3 mb-4 ${message.role === "user" ? "justify-end" : "justify-start"
                }`}
            >
              {message.role === "agent" && (
                <Avatar>
                  {/* <AvatarImage src="/bot-avatar.png" /> */}
                  <AvatarFallback>AI</AvatarFallback>
                </Avatar>
              )}
              <div
                className={`rounded-lg p-4 max-w-[80%] ${message.role === "user"
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted"
                  }`}
              >
                {message.role !== 'system' && message.content}
                {message.url && <img src={message.url} alt="Generated by AI" />}
              </div>
              {message.role === "user" && (
                <Avatar>
                  {/* <AvatarImage src="/user-avatar.png" /> */}
                  <AvatarFallback>ME</AvatarFallback>
                </Avatar>
              )}
            </div>
          ))}
          {loading && <div>
            <Cog className="animate-spin" />
          </div>}
        </div>
      </CardContent>
      <CardFooter>
        <div className="flex w-full gap-2">
          <Input
            placeholder="Type your message..."
            value={input}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setInput(e.target.value)}
            onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
              if (e.key === "Enter") {
                sendMessage()
              }
            }}
          />
          <Button onClick={sendMessage}>Send</Button>
        </div>
      </CardFooter>
    </Card>
  )
}