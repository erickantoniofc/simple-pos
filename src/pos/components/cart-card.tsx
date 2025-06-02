import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Trash2, X, Minus, Plus, Send } from "lucide-react"
import type { CartItem } from "../../mocks/types/carditem"



export const CartCard = ({
  items
}: {items: CartItem[]}) => {
  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.qty, 0)
  const tax = subtotal * 0.05
  const total = subtotal + tax

  return (
    <Card className="w-full h-full flex flex-col">
      <CardContent className="p-4 flex flex-col flex-1 h-full gap-4">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Comprobante</h2>
          <Button variant="ghost" className="text-destructive cursor-pointer">
            <Trash2 className="w-4 h-4 mr-1" />
            Limpiar
          </Button>
        </div>

        {/* Cart Items */}
        <div className="space-y-3 overflow-y-auto flex-1 pr-2">
          {items.map(item => (
            <div key={item.id} className="flex items-center gap-2 border-b pb-2">
              <img src={item.product.imageUrl} alt={item.product.name} className="w-10 h-10 rounded object-cover" />
              <div className="flex-1">
                <p className="font-medium">{item.product.name}</p>
                <p className="text-xs text-muted-foreground">{item.product.name}</p>
              </div>
              <div className="flex items-center gap-1">
                <Button size="icon" variant="outline" className="cursor-pointer" >
                  <Minus className="w-4 h-4" />
                </Button>
                <input className="w-4 text-center" value={item.qty}/>
                <Button size="icon" variant="outline" className="cursor-pointer">
                  <Plus className="w-3 h-3" />
                </Button>
              </div>
              <div className="space-x-1">
              <span className="w-14 text-right font-medium">
                ${(item.product.price * item.qty).toFixed(2)}
              </span>
              <Button size="icon" variant="ghost" className="text-destructive cursor-pointer" >
                <X className="w-4 h-4" />
              </Button>

              </div>
            </div>
          ))}
        </div>

        {/* Totals */}
        <div className="space-y-1 text-sm text-right mt-auto">
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
          <Button className="w-full h-10 text-accent-foreground cursor-pointer">
            <Send className="h-4 w-4"/>
            <p>Enviar DTE</p>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}