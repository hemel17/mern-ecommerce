import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetFooter,
  SheetClose,
} from "@/components/ui/sheet";

/**
 * Zod schema for validating product form
 */
const formSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  category: z.string().min(1, "Category is required"),
  brand: z.string().min(1, "Brand is required"),
  price: z
    .string()
    .refine((val) => !isNaN(Number(val)), { message: "Price must be a number" })
    .transform(Number)
    .refine((val) => val < 0, { message: "Price must be at least 0" }),
  salePrice: z
    .string()
    .refine((val) => !isNaN(Number(val)), {
      message: "Sale price must be a number",
    })
    .transform(Number)
    .refine((val) => val < 0, { message: "Sale price must be at least 0" }),
  stock: z
    .string()
    .refine((val) => !isNaN(Number(val)), { message: "Stock must be a number" })
    .transform(Number)
    .refine((val) => val >= 1, { message: "Stock must be at least 1" }),
});

// Dummy options
const categories = [
  "Electronics",
  "Groceries",
  "Fitness",
  "Accessories",
  "Home",
];
const brands = ["Apple", "Samsung", "Nike", "Adidas", "Generic"];

/**
 * Add Product Sheet Component
 *
 * @component
 * @param {Object} props
 * @param {boolean} props.open - Controls if the sheet is open
 * @param {Function} props.onOpenChange - Function to call when open state changes
 */
const AddProduct = ({ open, onOpenChange }) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      category: "",
      brand: "",
      price: "",
      salePrice: "",
      stock: "",
    },
  });

  const onSubmit = (data) => {
    console.log("Product submitted:", data);
    reset();
    onOpenChange(false);
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full max-w-md overflow-y-auto">
        <SheetHeader>
          <SheetTitle>Add New Product</SheetTitle>
          <SheetDescription>
            Fill in the details below to add a new product to your inventory.
          </SheetDescription>
        </SheetHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 px-5 py-4">
          {/* Title */}
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input id="title" {...register("title")} />
            {errors.title && (
              <p className="text-sm text-red-500">{errors.title.message}</p>
            )}
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea id="description" {...register("description")} />
            {errors.description && (
              <p className="text-sm text-red-500">
                {errors.description.message}
              </p>
            )}
          </div>

          {/* Category */}
          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <Select onValueChange={(value) => setValue("category", value)}>
              <SelectTrigger id="category" className="w-full">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat} value={cat}>
                    {cat}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.category && (
              <p className="text-sm text-red-500">{errors.category.message}</p>
            )}
          </div>

          {/* Brand */}
          <div className="space-y-2">
            <Label htmlFor="brand">Brand</Label>
            <Select onValueChange={(value) => setValue("brand", value)}>
              <SelectTrigger id="brand" className="w-full">
                <SelectValue placeholder="Select brand" />
              </SelectTrigger>
              <SelectContent>
                {brands.map((brand) => (
                  <SelectItem key={brand} value={brand}>
                    {brand}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.brand && (
              <p className="text-sm text-red-500">{errors.brand.message}</p>
            )}
          </div>

          {/* Price */}
          <div className="space-y-2">
            <Label htmlFor="price">Price ($)</Label>
            <Input type="text" id="price" {...register("price")} />
            {errors.price && (
              <p className="text-sm text-red-500">{errors.price.message}</p>
            )}
          </div>

          {/* Sale Price */}
          <div className="space-y-2">
            <Label htmlFor="salePrice">Sale Price ($)</Label>
            <Input type="text" id="salePrice" {...register("salePrice")} />
            {errors.salePrice && (
              <p className="text-sm text-red-500">{errors.salePrice.message}</p>
            )}
          </div>

          {/* Stock */}
          <div className="space-y-2">
            <Label htmlFor="stock">Total Stock</Label>
            <Input type="text" id="stock" {...register("stock")} />
            {errors.stock && (
              <p className="text-sm text-red-500">{errors.stock.message}</p>
            )}
          </div>

          {/* Action Buttons */}
          <SheetFooter className="mt-0 flex-col sm:flex-row gap-2 -ml-4">
            <Button className="w-full sm:w-auto bg-blue-500 hover:bg-blue-500 cursor-pointer">
              Save Product
            </Button>
            <SheetClose asChild>
              <Button className="w-full text-white hover:bg-red-500 bg-red-500 sm:w-auto cursor-pointer">
                Cancel
              </Button>
            </SheetClose>
          </SheetFooter>
        </form>
      </SheetContent>
    </Sheet>
  );
};

export default AddProduct;
