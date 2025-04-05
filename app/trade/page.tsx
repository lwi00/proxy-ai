import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import TradeForm from "@/components/trade-form"
import WalletConnect from "@/components/wallet-connect"

export default function TradePage() {
  return (
    <div className="flex min-h-screen flex-col bg-black text-white">
      <header className="border-b border-zinc-800 px-6 py-4">
        <div className="container mx-auto flex items-center justify-between">
          <h1 className="text-2xl font-bold text-white">Proxi</h1>
          <div className="flex items-center gap-4">
            <WalletConnect />
          </div>
        </div>
      </header>

      <main className="container mx-auto flex-1 px-6 py-8">
        <div className="mb-8 flex items-center gap-4">
          <Link href="/">
            <Button variant="ghost" size="icon" className="text-white hover:bg-zinc-800">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <div>
            <h2 className="text-3xl font-bold">Trade</h2>
            <p className="text-zinc-400">Create and manage your trading positions</p>
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1fr_350px]">
          <Card className="bg-zinc-900 border-zinc-800 text-white">
            <CardContent className="p-6">
              <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h3 className="text-xl font-bold">BTC/USDT</h3>
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-bold">$43,256.78</span>
                    <span className="text-sm text-teal-500">+2.34%</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-zinc-700 text-zinc-400 hover:bg-zinc-800 hover:text-white"
                  >
                    1D
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-zinc-700 text-zinc-400 hover:bg-zinc-800 hover:text-white"
                  >
                    1W
                  </Button>
                  <Button variant="outline" size="sm" className="border-zinc-700 bg-zinc-800 text-white">
                    1M
                  </Button>
                </div>
              </div>

              <div className="h-[300px] w-full rounded-lg bg-zinc-800 flex items-center justify-center">
                <p className="text-zinc-500">Price chart placeholder</p>
              </div>
            </CardContent>
          </Card>

          <TradeForm />
        </div>
      </main>
    </div>
  )
}

