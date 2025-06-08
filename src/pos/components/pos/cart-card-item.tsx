import type { SaleItem } from "@/data/types/sale-item";
import { Button, Input } from "@/components";
import { Minus, Plus, X } from "lucide-react";

export const CartCardItem = ({
  item,
  handleQuantityChange,
  updatePrice,
  onInputChange,
  onRemoveItem,
}: {
  item: SaleItem;
  handleQuantityChange: Function;
  updatePrice: Function;
  onInputChange: Function;
  onRemoveItem: Function;
}) => {
  const showImage = !!item.product.imageUrl?.trim();
  const initial = item.product.name.charAt(0).toUpperCase();

  return (
    <div
      key={item.product._id}
      className="flex items-center gap-2 border-b pb-2"
    >
      {showImage ? (
        <img
          src={item.product.imageUrl}
          alt={item.product.name}
          className="w-10 h-10 rounded object-cover"
        />
      ) : (
        <div className="w-10 h-10 rounded bg-muted text-muted-foreground flex items-center justify-center font-semibold">
          {initial}
        </div>
      )}

      <div className="flex-1">
        <p className="font-medium">{item.product.name}</p>
      </div>

      <div className="flex items-center gap-1">
        <Button
          onClick={() =>
            handleQuantityChange(
              item.product._id,
              item.quantity > 1 ? item.quantity - 1 : 1
            )
          }
          size="icon"
          variant="outline"
          className="cursor-pointer"
        >
          <Minus className="w-4 h-4" />
        </Button>
        <Input
          onFocus={(e) => e.target.select()}
          className="w-12 p-0 text-center"
          value={item.quantity}
          type="number"
          min={1}
          onChange={(event) => onInputChange(event, item.product._id)}
        />
        <Button
          onClick={() => handleQuantityChange(item.product._id, item.quantity + 1)}
          size="icon"
          variant="outline"
          className="cursor-pointer"
        >
          <Plus className="w-3 h-3" />
        </Button>

        <div className="flex items-center gap-1">
          <span className="text-xs text-muted-foreground">$/u:</span>
          <Input
            onFocus={(e) => e.target.select()}
            type="number"
            className="w-16 p-0 text-center"
            min={0.01}
            step="0.01"
            value={item.price}
            onChange={(e) => {
              updatePrice(item.product._id, e);
            }}
          />
        </div>
      </div>

      <div className="space-x-1">
        <span className="w-14 text-right font-medium">
          ${(item.price * item.quantity).toFixed(2)}
        </span>
        <Button
          onClick={() => onRemoveItem(item.product._id)}
          size="icon"
          variant="ghost"
          className="text-destructive cursor-pointer"
        >
          <X className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};