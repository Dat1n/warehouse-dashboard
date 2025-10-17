import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, AlertTriangle } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface InventoryItem {
  id: number;
  name: string;
  sku: string;
  quantity: number;
  category: string;
  location: string;
  lastUpdated: string;
  lowStock: boolean;
}

const initialInventory: InventoryItem[] = [
  {
    id: 1,
    name: "Widget A",
    sku: "WDG-001",
    quantity: 5,
    category: "Electronics",
    location: "A-12",
    lastUpdated: "2024-01-15",
    lowStock: true,
  },
  {
    id: 2,
    name: "Gadget B",
    sku: "GDG-002",
    quantity: 87,
    category: "Tools",
    location: "B-05",
    lastUpdated: "2024-01-14",
    lowStock: false,
  },
  {
    id: 3,
    name: "Tool C",
    sku: "TOL-003",
    quantity: 45,
    category: "Tools",
    location: "C-08",
    lastUpdated: "2024-01-13",
    lowStock: false,
  },
  {
    id: 4,
    name: "Part D",
    sku: "PRT-004",
    quantity: 8,
    category: "Parts",
    location: "D-15",
    lastUpdated: "2024-01-12",
    lowStock: true,
  },
  {
    id: 5,
    name: "Component E",
    sku: "CMP-005",
    quantity: 120,
    category: "Electronics",
    location: "E-03",
    lastUpdated: "2024-01-11",
    lowStock: false,
  },
  {
    id: 6,
    name: "Material F",
    sku: "MAT-006",
    quantity: 3,
    category: "Materials",
    location: "F-20",
    lastUpdated: "2024-01-10",
    lowStock: true,
  },
];

export default function Inventory() {
  const [inventory, setInventory] = useState<InventoryItem[]>(initialInventory);
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editValue, setEditValue] = useState("");

  const filteredInventory = inventory.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.sku.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      categoryFilter === "all" || item.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const handleEdit = (id: number, currentQuantity: number) => {
    setEditingId(id);
    setEditValue(currentQuantity.toString());
  };

  const handleSave = (id: number) => {
    const newQuantity = parseInt(editValue);
    if (isNaN(newQuantity) || newQuantity < 0) {
      toast({
        title: "Invalid Quantity",
        description: "Please enter a valid number",
        variant: "destructive",
      });
      return;
    }

    setInventory((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity: newQuantity,
              lowStock: newQuantity < 10,
              lastUpdated: new Date().toISOString().split("T")[0],
            }
          : item
      )
    );

    toast({
      title: "Stock Updated",
      description: "Inventory quantity has been updated successfully",
    });

    setEditingId(null);
  };

  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Inventory Management</h1>
        <p className="text-muted-foreground">View and manage all warehouse items</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search by name or SKU..."
            className="pl-10 bg-background"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Select value={categoryFilter} onValueChange={setCategoryFilter}>
          <SelectTrigger className="w-full sm:w-[200px] bg-background">
            <SelectValue placeholder="Filter by category" />
          </SelectTrigger>
          <SelectContent className="bg-popover">
            <SelectItem value="all">All Categories</SelectItem>
            <SelectItem value="Electronics">Electronics</SelectItem>
            <SelectItem value="Tools">Tools</SelectItem>
            <SelectItem value="Parts">Parts</SelectItem>
            <SelectItem value="Materials">Materials</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Card className="bg-gradient-card border-border/50">
        <CardHeader>
          <CardTitle>Inventory Items</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Item Name</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">SKU</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Quantity</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Category</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Location</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Last Updated</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredInventory.map((item) => (
                  <tr
                    key={item.id}
                    className={`border-b border-border hover:bg-secondary/50 transition-colors ${
                      item.lowStock ? "bg-destructive/5" : ""
                    }`}
                  >
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        {item.lowStock && <AlertTriangle className="h-4 w-4 text-warning" />}
                        <span className="font-medium">{item.name}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-muted-foreground">{item.sku}</td>
                    <td className="py-3 px-4">
                      {editingId === item.id ? (
                        <Input
                          type="number"
                          value={editValue}
                          onChange={(e) => setEditValue(e.target.value)}
                          className="w-24 bg-background"
                          autoFocus
                        />
                      ) : (
                        <span className={item.lowStock ? "text-warning font-semibold" : ""}>
                          {item.quantity}
                        </span>
                      )}
                    </td>
                    <td className="py-3 px-4">
                      <Badge variant="outline">{item.category}</Badge>
                    </td>
                    <td className="py-3 px-4 text-muted-foreground">{item.location}</td>
                    <td className="py-3 px-4 text-muted-foreground">{item.lastUpdated}</td>
                    <td className="py-3 px-4">
                      {editingId === item.id ? (
                        <div className="flex gap-2">
                          <Button size="sm" onClick={() => handleSave(item.id)}>
                            Save
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => setEditingId(null)}
                          >
                            Cancel
                          </Button>
                        </div>
                      ) : (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleEdit(item.id, item.quantity)}
                        >
                          Edit
                        </Button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
