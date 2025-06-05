import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Trash2, X, Minus, Plus, Send, Save } from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { DocumentType, type Sale } from "@/mocks/types/sale"
import { useDispatch } from "react-redux";
import { updateItemPrice } from "@/store/pos/sale-slice";

import {
  updateItemQuantity,
  removeItemFromActiveSale,
  resetActiveSale,
} from "@/store/pos/sale-slice";
import { Input } from "@/components/ui/input"


export const CartCard = ({
  sale
}: {sale: Sale | null}) => {

  const dispatch = useDispatch();
  const saleItems = sale?.saleItems ?? [];
  const documentType = sale?.documentType ?? DocumentType.FE;

  const subtotal = saleItems.reduce((sum, item) => sum + item.price * item.quantity, 0) / 1.13;
  const tax = documentType === DocumentType.CCF ? subtotal * 0.13 : 0;
  const total = subtotal + tax;

  const handleQuantityChange = (productId: string, quantity: number) => {
    dispatch(updateItemQuantity({ productId, quantity }));
  }

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>, productId: string) => {
    const newQuantity = parseInt(e.target.value);
    if (!isNaN(newQuantity) && newQuantity >= 1) {
      handleQuantityChange(productId, newQuantity);
    }
  }

  const onRemoveItem = (productId: string) => {
    dispatch(removeItemFromActiveSale(productId));
  }

  const clearCart = () => {
    dispatch(resetActiveSale());
  }

  return (
    <Card className="w-full h-full flex flex-col">
      <CardContent className="p-4 flex flex-col flex-1 h-full">
        {/* Header */}
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-lg font-semibold">Nueva venta</h2>
          <Button onClick={clearCart} variant="ghost" className="text-destructive cursor-pointer">
            <Trash2 className="w-4 h-4 mr-1" />
            Limpiar
          </Button>
        </div>

  
        {/* Cart Items */}
        <ScrollArea className="flex-1 pr-2 overflow-y-auto">

          <div className="space-y-3">
            {saleItems.map(item => (
              <div key={item.product._id} className="flex items-center gap-2 border-b pb-2">
                <img src={item.product.imageUrl} alt={item.product.name} className="w-10 h-10 rounded object-cover" />
                <div className="flex-1">
                  <p className="font-medium">{item.product.name}</p>
                  <p className="text-xs text-muted-foreground">{item.product.name}</p>
                </div>
                <div className="flex items-center gap-1">
                  <Button onClick={() => handleQuantityChange(item.product._id, (item.quantity > 1 ? item.quantity - 1 : 1))} size="icon" variant="outline" className="cursor-pointer" >
                    <Minus className="w-4 h-4" />
                  </Button>
                  <Input className="w-12 p-0 text-center" value={item.quantity} type="number" min={1} onChange={(event) => onInputChange(event, item.product._id)}/>
                  <Button onClick={() => handleQuantityChange(item.product._id, (item.quantity + 1))} size="icon" variant="outline" className="cursor-pointer">
                    <Plus className="w-3 h-3" />
                  </Button>
                  <div className="flex items-center gap-1">
                    <span className="text-xs text-muted-foreground">$/u:</span>
                    <Input
                      type="number"
                      className="w-16 p-0 text-center"
                      min={0.01}
                      step="0.01"
                      value={item.price}
                      onChange={(e) => {
                        const newPrice = parseFloat(e.target.value);
                        if (!isNaN(newPrice) && newPrice >= 0.01) {
                          dispatch(updateItemPrice({ productId: item.product._id, price: newPrice }));
                        }
                      }}
                    />
                </div>
                </div>
                <div className="space-x-1">
                <span className="w-14 text-right font-medium">
                  ${(item.price * item.quantity).toFixed(2)}
                </span>
                <Button onClick={() => onRemoveItem(item.product._id)} size="icon" variant="ghost" className="text-destructive cursor-pointer" >
                  <X className="w-4 h-4" />
                </Button>

                </div>
              </div>
            ))}
          </div>
        </ScrollArea>

        {/* Totals */}
        <div className="space-y-1 text-sm text-right mt-auto">
          <div className="flex justify-between ">
            <span>Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div className={`flex justify-between ${(documentType === DocumentType.CCF) ? "" : "hidden"}`}>
            <span>Impuestos (13%)</span>
            <span>${tax.toFixed(2)}</span>
          </div>
          <div className="flex justify-between font-bold text-primary text-base">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
          <div className="grid grid-cols-5 gap-2 w-full">
            <Button className="col-span-1 h-10 text-accent-foreground cursor-pointer">
              <Save className="h-4 w-4"/>
            </Button>
            <Button className="col-span-1 h-10 text-accent-foreground cursor-pointer">
              <Plus className="h-4 w-4"/>
            </Button>
            <Button className="col-span-3 h-10 text-accent-foreground cursor-pointer">
              <Send className="h-4 w-4"/>
              <p>Enviar DTE</p>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}