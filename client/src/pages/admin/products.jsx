import { Search, Plus, Pencil, Trash2 } from "lucide-react";

// Import your components from shadcn/ui
// Note: These imports would need to be adjusted based on your actual file structure
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";
import AddProduct from "@/components/admin/add-product";

const Products = () => {
  // Sample product data for UI display
  const sampleProducts = [
    {
      id: 1,
      name: "Wireless Headphones",
      category: "Electronics",
      price: 149.99,
      stock: 25,
    },
    {
      id: 2,
      name: "Organic Coffee Beans",
      category: "Groceries",
      price: 12.99,
      stock: 100,
    },
    { id: 3, name: "Yoga Mat", category: "Fitness", price: 29.99, stock: 50 },
    {
      id: 4,
      name: "Leather Wallet",
      category: "Accessories",
      price: 39.99,
      stock: 45,
    },
    {
      id: 5,
      name: "Stainless Steel Water Bottle",
      category: "Home",
      price: 19.99,
      stock: 75,
    },
  ];

  // State for sheet visibility
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Products</CardTitle>
          <Button
            className="flex items-center gap-2 bg-blue-500 hover:bg-blue-500 cursor-pointer"
            onClick={() => setIsSheetOpen(true)}
          >
            <Plus size={16} />
            Add Product
          </Button>
        </CardHeader>
        <CardContent>
          <div className="mb-6 relative">
            <div className="flex items-center border rounded-md">
              <Search className="ml-2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search products..."
                className="border-0 focus-visible:ring-0"
              />
            </div>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Stock</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sampleProducts.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell className="font-medium">
                      {product.name}
                    </TableCell>
                    <TableCell>{product.category}</TableCell>
                    <TableCell>${product.price.toFixed(2)}</TableCell>
                    <TableCell>{product.stock}</TableCell>
                    <TableCell className="text-right space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="inline-flex items-center gap-1"
                      >
                        <Pencil size={14} />
                        Edit
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        className="inline-flex items-center gap-1"
                      >
                        <Trash2 size={14} />
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <AddProduct open={isSheetOpen} onOpenChange={setIsSheetOpen} />
    </div>
  );
};

export default Products;
