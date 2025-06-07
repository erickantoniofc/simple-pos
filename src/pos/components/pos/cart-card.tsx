import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Trash2} from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { type Sale } from "@/mocks/types/sale"
import { CartCardItem } from "./cart-card-item"
import { CartCardFooter } from "./cart-card-footer"
import { useCartSaleLogic } from "@/hooks/use-cart-sale-logic";


export const CartCard = ({
  sale
}: {sale: Sale | null}) => {

 const {
    saleItems,
    documentType,
    subtotal,
    tax,
    total,
    handleQuantityChange,
    onInputChange,
    onRemoveItem,
    clearCart,
    updatePrice,
  } = useCartSaleLogic(sale);

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
              <CartCardItem
                key={item.product._id}
                item={item}
                handleQuantityChange={handleQuantityChange}
                onInputChange={onInputChange}
                onRemoveItem={onRemoveItem}
                updatePrice={updatePrice}
              />
            ))}
          </div>
        </ScrollArea>

        {/* Footer */}
        <CartCardFooter documentType={documentType} subtotal={subtotal} tax={tax} total={total} />
        
      </CardContent>
    </Card>
  )
}