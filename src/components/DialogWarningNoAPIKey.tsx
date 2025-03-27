import { useEffect, useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog"

import { Input } from '@/components/ui/input'
import { Button } from "./ui/button"
export const DialogWarningNoAPIKey = () => {
  const [open, setOpen] = useState(false);
  const [key, setKey] = useState('');
  
  useEffect(() => {
    if (localStorage.getItem('openAIKey')) {
      setOpen(false);
    } else {
      setOpen(true);
    }
  }, [])

  const saveChanges = () => {
    localStorage.setItem('openAIKey', key);
    setOpen(false);
  }
  return (
    <Dialog open={open}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Enter you api key</DialogTitle>
          <DialogDescription>
            Before starting working with class chatbot please enter your api key.
            You can also remotely use
            <strong>
              &nbsp;
              http(s)://clientIP/setKey=YOUR_API_KEY
            </strong>
            &nbsp; to remotely set the key for the client
          </DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-4 items-center gap-4 mt-2">
          <Input
            className="col-span-12"
            defaultValue="Open AI Key goes here"
            onChange={e => setKey(e.target.value)}
          />
        </div>
      <DialogFooter>
        <Button onClick={saveChanges}>Save changes</Button>
      </DialogFooter>
    </DialogContent>
    </Dialog >
  )
}