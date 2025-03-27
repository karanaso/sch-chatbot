import { setOpenAIKey } from "@/lib/getChatCompletion"

export const SetAPIKey = () => {
  const params = new URLSearchParams(window.location.search)
  const key = params.get('key')

  if (key) setOpenAIKey(key)

  const NoKey = () => !key && <div>No key provided</div>
  const Success = () => key && <div>Key set successfully</div>
  return (
    <>
      <NoKey />
      <Success />
    </>
  )
}