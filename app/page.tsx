import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowUpRight, Wallet } from "lucide-react"
import Link from "next/link"
import ActiveOrders from "@/components/active-orders"
import UpcomingTrades from "@/components/upcoming-trades"
import WalletConnect from "@/components/wallet-connect"

export default function Dashboard() {
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
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-3xl font-bold">Dashboard</h2>
            <p className="text-zinc-400">Manage your crypto trading portfolio</p>
          </div>
          <Button className="bg-teal-500 hover:bg-teal-600 text-black font-medium">
            <Wallet className="mr-2 h-4 w-4" />
            Deposit
          </Button>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <Card className="bg-zinc-900 border-zinc-800 text-white">
            <CardHeader>
              <CardTitle>Total Funds</CardTitle>
              <CardDescription className="text-zinc-400">Your deposited assets</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">1.42 ETH</div>
              <div className="text-sm text-zinc-400">≈ $3,245.78 USD</div>
            </CardContent>
          </Card>
          <Card className="bg-zinc-900 border-zinc-800 text-white">
            <CardHeader>
              <CardTitle>Active Positions</CardTitle>
              <CardDescription className="text-zinc-400">Currently open positions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">2</div>
              <div className="text-sm text-zinc-400">Total value: $1,245.32 USD</div>
            </CardContent>
          </Card>
          <Card className="bg-zinc-900 border-zinc-800 text-white">
            <CardHeader>
              <CardTitle>P&L (24h)</CardTitle>
              <CardDescription className="text-zinc-400">Profit and loss</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-teal-500">+$124.56</div>
              <div className="text-sm text-zinc-400">+3.8% change</div>
            </CardContent>
          </Card>
        </div>

        <div className="mt-8">
          <Tabs defaultValue="active" className="w-full">
            <TabsList className="bg-zinc-900 text-zinc-400">
              <TabsTrigger value="active" className="data-[state=active]:bg-zinc-800 data-[state=active]:text-white">
                Active Orders
              </TabsTrigger>
              <TabsTrigger value="upcoming" className="data-[state=active]:bg-zinc-800 data-[state=active]:text-white">
                Upcoming Trades
              </TabsTrigger>
            </TabsList>
            <TabsContent value="active" className="mt-4">
              <ActiveOrders />
            </TabsContent>
            <TabsContent value="upcoming" className="mt-4">
              <UpcomingTrades />
            </TabsContent>
          </Tabs>
        </div>

        <div className="mt-8 flex justify-center">
          <Link href="/trade">
            <Button className="bg-teal-500 hover:bg-teal-600 text-black font-medium">
              Go to Trade Page
              <ArrowUpRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </main>
    </div>
  )
}

