import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

const orders = [
  {
    id: "ord-1",
    pair: "ETH/USDT",
    type: "Long",
    size: "0.5 ETH",
    entry: "$2,345.67",
    leverage: "3x",
    status: "Open",
    pnl: "+$45.32",
  },
  {
    id: "ord-2",
    pair: "BTC/USDT",
    type: "Short",
    size: "0.02 BTC",
    entry: "$43,210.98",
    leverage: "5x",
    status: "Open",
    pnl: "-$12.45",
  },
]

export default function ActiveOrders() {
  return (
    <div className="rounded-lg border border-zinc-800 bg-zinc-900">
      <Table>
        <TableHeader>
          <TableRow className="border-zinc-800 hover:bg-zinc-900">
            <TableHead className="text-zinc-400">Pair</TableHead>
            <TableHead className="text-zinc-400">Type</TableHead>
            <TableHead className="text-zinc-400">Size</TableHead>
            <TableHead className="text-zinc-400">Entry Price</TableHead>
            <TableHead className="text-zinc-400">Leverage</TableHead>
            <TableHead className="text-zinc-400">Status</TableHead>
            <TableHead className="text-right text-zinc-400">PnL</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.map((order) => (
            <TableRow key={order.id} className="border-zinc-800 hover:bg-zinc-800">
              <TableCell className="font-medium">{order.pair}</TableCell>
              <TableCell>
                <Badge
                  variant={order.type === "Long" ? "default" : "destructive"}
                  className={order.type === "Long" ? "bg-teal-500 hover:bg-teal-600" : ""}
                >
                  {order.type}
                </Badge>
              </TableCell>
              <TableCell>{order.size}</TableCell>
              <TableCell>{order.entry}</TableCell>
              <TableCell>{order.leverage}</TableCell>
              <TableCell>
                <Badge variant="outline" className="border-zinc-700 text-zinc-400">
                  {order.status}
                </Badge>
              </TableCell>
              <TableCell className={`text-right ${order.pnl.startsWith("+") ? "text-teal-500" : "text-red-500"}`}>
                {order.pnl}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

