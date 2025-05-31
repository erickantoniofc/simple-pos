import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Trash2, X, Minus, Plus } from "lucide-react"
import type { CartItem } from "../types/carditem"




export const CartCard = ({
  items
}: {items: CartItem[]}) => {
  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.qty, 0)
  const tax = subtotal * 0.05
  const total = subtotal + tax

  return (
    <Card className="w-full h-full flex flex-col">
      <CardContent className="p-4 flex flex-col flex-1">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Cart</h2>
          <Button variant="ghost" className="text-destructive">
            <Trash2 className="w-4 h-4 mr-1" />
            Clear
          </Button>
        </div>

        {/* Cart Items */}
        <div className="space-y-3 overflow-y-auto max-h-[300px] pr-2">
          {items.map(item => (
            <div key={item.id} className="flex items-center gap-2 border-b pb-2">
              <img src={item.product.imageUrl} alt={item.product.name} className="w-10 h-10 rounded object-cover" />
              <div className="flex-1">
                <p className="font-medium">{item.product.name}</p>
                <p className="text-xs text-muted-foreground">{item.product.name}</p>
              </div>
              <div className="flex items-center gap-1">
                <Button size="icon" variant="outline" >
                  <Minus className="w-4 h-4" />
                </Button>
                <span className="w-4 text-center">{item.qty}</span>
                <Button size="icon" variant="outline" >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
              <span className="w-14 text-right font-medium">
                ${(item.product.price * item.qty).toFixed(2)}
              </span>
              <Button size="icon" variant="ghost" className="text-destructive" >
                <X className="w-4 h-4" />
              </Button>
            </div>
          ))}
        </div>

        {/* Totals */}
        <div className="mt-4 space-y-1 text-sm text-right">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>Tax (5%)</span>
            <span>${tax.toFixed(2)}</span>
          </div>
          <div className="flex justify-between font-bold text-primary text-base">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}