"use client";
import { Product } from "@/payload-types";
import { useEffect, useState } from "react";
import { Skeleton } from "./ui/skeleton";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { PRODUCTS_CATEGORIES } from "@/config";

interface ProductListingProps {
  product: Product | null;
  index: number;
}

const ProductListing = ({ product, index }: ProductListingProps) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, index * 75);
    return () => clearTimeout(timer);
  }, [index]);

  if (!product || !isVisible) return <ProductPlaceholder />;
  const label = PRODUCTS_CATEGORIES.find(
    ({value}) => value === product.category
  )?.label
  if (isVisible && product) {
    return (
      <Link
        href={`/product/${product.id}`}
        className={cn("invisible h-full w-full cursor-pointer group/main", {
          "visible animate-in fade-in-5": isVisible,
        })}
      >
        <div className="flex flex-col w-full">
            <h3 className="mt-4 font-medium text-sm text-gray-700">
                {product.name}
            </h3>
            <p className="mt-1 text-sm text-gray-500">
                {label}
            </p>
        </div>
      </Link>
    );
  }
};
const ProductPlaceholder = () => {
  return (
    <div className="flex flex-col w-full">
      <div className="return  bg-zinc-100 aspect-square w-full overflow-hidden">
        <Skeleton className="w-full h-full" />
      </div>
      <Skeleton className="mt-4 w-2/3 h-4 rounded-lg" />
      <Skeleton className="mt-2 w-16 h-4 rounded-lg" />
      <Skeleton className="mt-2 w-12 h-4 rounded-lg" />
    </div>
  );
};

export default ProductListing;
