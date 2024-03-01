import AddToCartButton from "@/components/AddToCartButton";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import ProductReel from "@/components/ProductReel";
import ImageSlider from "@/components/imageSlider";
import { PRODUCTS_CATEGORIES } from "@/config";
import { getPayloadClient } from "@/get-payload";
import { formatePrice } from "@/lib/utils";
import { Check, ChevronRight, Shield } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

interface PageProps {
  params: {
    productId: string;
  };
}

const BREADCRUMBS = [
  {
    id: 1,
    name: "Home",
    href: "/",
  },
  {
    id: 2,
    name: "Product",
    href: "/product",
  },
];

const page = async ({ params }: PageProps) => {
  const { productId } = params;
  const payload = await getPayloadClient();

  const { docs: products } = await payload.find({
    collection: "products",
    limit: 1,
    where: {
      id: {
        equals: productId,
      },
      approvedForSale: {
        equals: "approved",
      },
    },
  });
  const [product] = products;
  if (!product) return notFound();
  const label = PRODUCTS_CATEGORIES.find(
    ({ value }) => value === product.category
  )?.label;
  const validUrls = product.images
    .map(({ image }) => (typeof image === "string" ? image : image.url))
    .filter(Boolean) as string[];
  return (
    <MaxWidthWrapper className="bg-white">
      <div className="bg-white">
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:grid lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
          {/* Product Destails */}
          <div className="lg:max-w-lg lg:self-end">
            <ol className="flex items-center space-x-2">
              {BREADCRUMBS.map((item, index) => (
                <li key={item.href}>
                  <div className="flex items-center text-sm">
                    <Link
                      href={item.href}
                      className="font-medium text-sm text-muted-foreground hover:text-gray-900"
                    >
                      {item.name}
                    </Link>
                    {index !== BREADCRUMBS.length - 1 ? (
                      <ChevronRight className="h-4 ml-2 text-gray-500" />
                    ) : null}
                  </div>
                </li>
              ))}
            </ol>
            <div className="mt-4">
              <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                {product.name}
              </h1>
            </div>
            <section className="mt-4 ">
              <div className="flex items-center">
                <p className="font-medium">{formatePrice(product.price)}</p>

                <div className="ml-4 border-1 text-muted-foreground border-gray-300 pl-4">
                  {label}
                </div>
              </div>
              <div className="mt-4 space-y-6">
                <p className="text-base text-muted-foreground">
                  {product.description}
                </p>
              </div>
              <div className="mt-6 flex items-center">
                <Check
                  aria-hidden="true"
                  className="h-5 w-5 flex-shrink-0 text-green-500"
                />
                <p className="ml-2 text-sm text-muted-foreground">
                  Eligible for instant delivary
                </p>
              </div>
            </section>
          </div>
          {/* product Images */}
          <div className="mt-10 lg:col-start-2 lg:row-span-2 lg:mt-0 lg:self-center">
            <div className="aspect-square rounded-lg">
              <ImageSlider urls={validUrls} key={product.id} />
            </div>
          </div>
          {/* Add to Cart Part */}
          <div className="mt-10 lg:col-start-1 lg:row-start-2 lg:max-w-lg lg:self-start">
            <div>
              <div className="mt-10">
                <AddToCartButton product={product} key={product.id} />
              </div>
              <div className="mt-6 text-center">
                <div className="group inline-flex text-sm font-medium">
                  <Shield
                    aria-hidden="true"
                    className="mr-2 h-5 w-5 flex-shrink-0 text-gray-400"
                  />
                  <span className="text-muted-foreground hover:text-gray-700">
                    30 Day Return Guaranty
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ProductReel
        href="/product"
        query={{ catagory: product.category, limit: 4 }}
        title={`Similar ${label} Products`}
        subtitle={`Browse similar high-quality ${label}.`}
      />
    </MaxWidthWrapper>
  );
};

export default page;
