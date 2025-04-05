"use client"

import { Button } from "@/components/ui/button"
import { Wallet } from "lucide-react"
import { useState } from "react"

export default function WalletConnect() {
  const [connected, setConnected] = useState(false)
  const [address, setAddress] = useState("")

  const connectWallet = () => {
    // Simulate wallet connection
    setConnected(true)
    setAddress("0x1a2...3b4c")
  }

  return (
    <>
      {connected ? (
        <Button variant="outline" className="border-zinc-700 text-white hover:bg-zinc-800">
          <Wallet className="mr-2 h-4 w-4" />
          {address}
        </Button>
      ) : (
        <Button onClick={connectWallet} className="bg-teal-500 hover:bg-teal-600 text-black font-medium">
          <Wallet className="mr-2 h-4 w-4" />
          Connect Wallet
        </Button>
      )}
    </>
  )
}

