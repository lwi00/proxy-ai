"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { useState } from "react"

export default function TradeForm() {
  const [positionMode, setPositionMode] = useState("isolated")
  const [leverage, setLeverage] = useState("1x")
  const [positionType, setPositionType] = useState("one-way")
  const [orderType, setOrderType] = useState("market")
  const [direction, setDirection] = useState("buy")
  const [size, setSize] = useState("0.1")
  const [percentage, setPercentage] = useState(25)
  const [reduceOnly, setReduceOnly] = useState(false)
  const [tpsl, setTpsl] = useState(false)

  return (
    <Card className="bg-zinc-900 border-zinc-800 text-white">
      <CardContent className="p-6">
        <div className="space-y-6">
          <div className="space-y-2">
            <Label className="text-zinc-400">Position Mode</Label>
            <ToggleGroup
              type="single"
              value={positionMode}
              onValueChange={(value) => value && setPositionMode(value)}
              className="grid grid-cols-2"
            >
              <ToggleGroupItem value="isolated" className="data-[state=on]:bg-zinc-800 data-[state=on]:text-white">
                Isolated
              </ToggleGroupItem>
              <ToggleGroupItem value="cross" className="data-[state=on]:bg-zinc-800 data-[state=on]:text-white">
                Cross
              </ToggleGroupItem>
            </ToggleGroup>
          </div>

          <div className="space-y-2">
            <Label className="text-zinc-400">Leverage</Label>
            <ToggleGroup
              type="single"
              value={leverage}
              onValueChange={(value) => value && setLeverage(value)}
              className="grid grid-cols-3"
            >
              <ToggleGroupItem value="1x" className="data-[state=on]:bg-zinc-800 data-[state=on]:text-white">
                1x
              </ToggleGroupItem>
              <ToggleGroupItem value="3x" className="data-[state=on]:bg-zinc-800 data-[state=on]:text-white">
                3x
              </ToggleGroupItem>
              <ToggleGroupItem value="5x" className="data-[state=on]:bg-zinc-800 data-[state=on]:text-white">
                5x
              </ToggleGroupItem>
            </ToggleGroup>
          </div>

          <div className="space-y-2">
            <Label className="text-zinc-400">Position Type</Label>
            <ToggleGroup
              type="single"
              value={positionType}
              onValueChange={(value) => value && setPositionType(value)}
              className="grid grid-cols-2"
            >
              <ToggleGroupItem value="one-way" className="data-[state=on]:bg-zinc-800 data-[state=on]:text-white">
                One-Way
              </ToggleGroupItem>
              <ToggleGroupItem value="hedge" className="data-[state=on]:bg-zinc-800 data-[state=on]:text-white">
                Hedge
              </ToggleGroupItem>
            </ToggleGroup>
          </div>

          <Tabs value={orderType} onValueChange={setOrderType} className="w-full">
            <TabsList className="grid w-full grid-cols-3 bg-zinc-800">
              <TabsTrigger value="market" className="data-[state=active]:bg-zinc-700">
                Market
              </TabsTrigger>
              <TabsTrigger value="limit" className="data-[state=active]:bg-zinc-700">
                Limit
              </TabsTrigger>
              <TabsTrigger value="pro" className="data-[state=active]:bg-zinc-700">
                Pro
              </TabsTrigger>
            </TabsList>
            <TabsContent value="market" className="mt-4 space-y-4">
              <div className="grid grid-cols-2 gap-2">
                <Button
                  className={`${direction === "buy" ? "bg-teal-500 hover:bg-teal-600 text-black" : "bg-zinc-800 hover:bg-zinc-700"}`}
                  onClick={() => setDirection("buy")}
                >
                  Buy / Long
                </Button>
                <Button
                  className={`${direction === "sell" ? "bg-red-500 hover:bg-red-600 text-black" : "bg-zinc-800 hover:bg-zinc-700"}`}
                  onClick={() => setDirection("sell")}
                >
                  Sell / Short
                </Button>
              </div>

              <div className="space-y-2">
                <Label className="text-zinc-400">Size</Label>
                <div className="flex gap-2">
                  <Input
                    type="text"
                    value={size}
                    onChange={(e) => setSize(e.target.value)}
                    className="bg-zinc-800 border-zinc-700 text-white"
                  />
                  <Select defaultValue="hype">
                    <SelectTrigger className="w-[100px] bg-zinc-800 border-zinc-700 text-white">
                      <SelectValue placeholder="Token" />
                    </SelectTrigger>
                    <SelectContent className="bg-zinc-800 border-zinc-700 text-white">
                      <SelectItem value="hype">HYPE</SelectItem>
                      <SelectItem value="eth">ETH</SelectItem>
                      <SelectItem value="btc">BTC</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label className="text-zinc-400">Amount</Label>
                  <span className="text-sm text-zinc-400">{percentage}%</span>
                </div>
                <Slider
                  value={[percentage]}
                  onValueChange={(value) => setPercentage(value[0])}
                  min={0}
                  max={100}
                  step={25}
                  className="[&>span]:bg-teal-500"
                />
                <div className="flex justify-between text-xs text-zinc-500">
                  <span>0%</span>
                  <span>25%</span>
                  <span>50%</span>
                  <span>75%</span>
                  <span>100%</span>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="reduce-only"
                    checked={reduceOnly}
                    onCheckedChange={(checked) => setReduceOnly(checked === true)}
                  />
                  <Label htmlFor="reduce-only" className="text-sm">
                    Reduce Only
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="tpsl" checked={tpsl} onCheckedChange={(checked) => setTpsl(checked === true)} />
                  <Label htmlFor="tpsl" className="text-sm">
                    Take Profit / Stop Loss
                  </Label>
                </div>
              </div>

              <Button className="w-full bg-teal-500 hover:bg-teal-600 text-black font-medium">Enable Trading</Button>

              <div className="rounded-lg border border-zinc-800 p-4 space-y-2">
                <div className="flex justify-between">
                  <span className="text-zinc-400">Liquidation Price</span>
                  <span>$41,234.56</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-400">Order Value</span>
                  <span>$1,245.67</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-400">Margin Required</span>
                  <span>$415.22</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-400">Slippage Estimate</span>
                  <span>0.05%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-400">Fees</span>
                  <span>$3.74</span>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="limit" className="mt-4">
              <div className="h-[400px] flex items-center justify-center text-zinc-500">
                Limit order form placeholder
              </div>
            </TabsContent>
            <TabsContent value="pro" className="mt-4">
              <div className="h-[400px] flex items-center justify-center text-zinc-500">Pro order form placeholder</div>
            </TabsContent>
          </Tabs>
        </div>
      </CardContent>
    </Card>
  )
}

