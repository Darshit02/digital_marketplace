"use client";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { useCart } from "@/hooks/use-cart";
import { Product } from "@/payload-types";

const AddToCartButton = ({product} : {product: Product}) => {
  const {addItem} = useCart()
  const [isSuccsess, setIsSuccsess] = useState<boolean>(false);
  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsSuccsess(false);
    }, 2000);
    return () => clearTimeout(timeout);
  }, [isSuccsess]);

  return (
    <Button onClick={() => {
      addItem(product)
        setIsSuccsess(true);
    }} size="lg" className="w-full">
   {isSuccsess ? "Added" : "Add to cart"}
    </Button>
  );
};

export default AddToCartButton;
