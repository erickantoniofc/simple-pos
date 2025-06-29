import { useCartSaleLogic } from "@/hooks/use-cart-sale-logic";

import { DocumentStatus, type Sale } from "@/data/types/sale"

import { Card, CardContent } from "@/components/ui/card"
import { Button, ScrollArea } from "@/components"
import { Trash2} from "lucide-react"
import { CartCardItem, CartCardFooter } from "@/pos-app/components/pos"


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
          <h2 className="text-lg font-semibold">{sale?.id ? "Editar venta" : "Nueva venta"}</h2>
          {sale?.id && (
            <p className="text-xs text-muted-foreground">ID: {sale.id}</p>
          )}
          {(sale?.status === DocumentStatus.INIT || sale?.status === DocumentStatus.SAVE) && (
            <Button onClick={clearCart} variant="ghost" className="text-destructive cursor-pointer">
              <Trash2 className="w-4 h-4 mr-1" />
              Limpiar
            </Button>
          )}
        </div>

  
        {/* Cart Items */}
        <ScrollArea className="flex-1 pr-2 overflow-y-auto">

          <div className="space-y-3">
            {saleItems.map(item => (
              <CartCardItem
                key={item.product.id}
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
        <CartCardFooter documentType={documentType} subtotal={subtotal} tax={tax} total={total} status={sale?.status}/>
        
      </CardContent>
    </Card>
  )
}