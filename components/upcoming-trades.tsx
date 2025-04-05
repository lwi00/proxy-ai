import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

const trades = [
  {
    id: "trade-1",
    pair: "SOL/USDT",
    type: "Limit Buy",
    price: "$123.45",
    size: "10 SOL",
    value: "$1,234.50",
    status: "Queued",
  },
  {
    id: "trade-2",
    pair: "AVAX/USDT",
    type: "Take Profit",
    price: "$32.10",
    size: "25 AVAX",
    value: "$802.50",
    status: "Pending",
  },
]

export default function UpcomingTrades() {
  return (
    <div className="rounded-lg border border-zinc-800 bg-zinc-900">
      <Table>
        <TableHeader>
          <TableRow className="border-zinc-800 hover:bg-zinc-900">
            <TableHead className="text-zinc-400">Pair</TableHead>
            <TableHead className="text-zinc-400">Type</TableHead>
            <TableHead className="text-zinc-400">Target Price</TableHead>
            <TableHead className="text-zinc-400">Size</TableHead>
            <TableHead className="text-zinc-400">Value</TableHead>
            <TableHead className="text-right text-zinc-400">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {trades.map((trade) => (
            <TableRow key={trade.id} className="border-zinc-800 hover:bg-zinc-800">
              <TableCell className="font-medium">{trade.pair}</TableCell>
              <TableCell>{trade.type}</TableCell>
              <TableCell>{trade.price}</TableCell>
              <TableCell>{trade.size}</TableCell>
              <TableCell>{trade.value}</TableCell>
              <TableCell className="text-right">
                <Badge variant="outline" className="border-zinc-700 text-zinc-400">
                  {trade.status}
                </Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

