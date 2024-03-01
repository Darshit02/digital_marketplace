import { PRODUCTS_CATEGORIES } from "@/config";
import { useCart } from "@/hooks/use-cart";
import { formatePrice } from "@/lib/utils";
import { Product } from "@/payload-types";
import { ImageIcon, Trash2, X } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

const CartItem = ({ product }: { product: Product }) => {
  const { image } = product.images[0];

  const [isMounted , setIsMounted] = useState(false)
  const {removeItem} = useCart()

  const label = PRODUCTS_CATEGORIES.find(({value}) => value === product.category)?.label
  return (
    <div className="space-y-3 py-2">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center space-x-4">
          <div className="relative aspect-square h-16 w-16 min-w-fit overflow-hidden rounded-sm">
            {typeof image !== "string" && image.url ? (
              <Image
                src={image.url}
                alt={product.name}
                fill
                className="absolute object-cover"
              />
            ) : (
              <div className="flex h-full items-center justify-center bg-secondary">
                <ImageIcon
                  aria-hidden="true"
                  className="h-4 w-4 text-muted-foreground"
                />
              </div>
            )}
          </div>
          <div className="flex flex-col self-start">
            <span className="line-clamp-1 text-sm font-medium mb-1">{product.name}</span>
          <span className="line-clamp-1 text-xs">
            {label}
          </span>
          <div className="mt-4 text-xs text-muted-foreground">
            <button onClick={() => removeItem(product.id)}className="flex justify-center items-center gap-1"><Trash2 className="w-3 h-3 text-red-500"/><span className="text-red-500">Remove</span></button>
          </div>
          </div>
        </div>
        <div className="flex flex-col space-y-1 font-medium">
            <span className="ml-auto line-clamp-1 text-sm">
                {formatePrice(product.price)}
            </span>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
