import { ShoppingCart } from "lucide-react";
interface product {
  id: number;
  product: string;
  product_image: string;
  price: number;
}
interface ProductsTypeCardProps {
  product: product;
}

export default function ProductsTypeCard({ product }: ProductsTypeCardProps) {
  return (
    <div className="flex flex-col items-center justify-between h-[240px] w-[200px] rounded-xl border-[3px] px-5 py-3 border-[#00000014]">
      <div className="flex items-center justify-center w-[100px] h-[100px]">
        <img
          src={product.product_image || "/images/slider.png"}
          className="w-full"
          alt="2"
        />
      </div>
      <h3 className="text-sm font-bold">{product.product}</h3>
      <h3 className="text-lg text-red-700 font-bold">{product.price} $</h3>
      <button className="cursor-pointer flex items-center justify-between hover:bg-gray-100 py-1 px-3 w-full border rounded-full">
        <ShoppingCart className="text-xs text-[#006D77] fill-[#006D77]" />
        <span className="text-gray-600 text-xs font-bold"></span> Add to cart
      </button>
    </div>
  );
}
