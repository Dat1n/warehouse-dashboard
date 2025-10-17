import { useState, useEffect } from "react";
import { Camera, Plus, Minus, Package } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import { Scanner } from "@yudiel/react-qr-scanner";

interface ScannedItem {
  id: number;
  name: string;
  sku: string;
  quantity: number;
  time: string;
}

export default function ScannerPage() {
  const [scannedItems, setScannedItems] = useState<ScannedItem[]>([]);
  const [currentItem, setCurrentItem] = useState<ScannedItem | null>(null);
  const [adjustQuantity, setAdjustQuantity] = useState<number>(1);
  const [scanningEnabled, setScanningEnabled] = useState(true);

  // Mock item mapping for scanned QR codes
  const qrToItem = (qrText: string) => {
    const mapping: Record<string, { name: string; sku: string; quantity: number }> = {
      "WDG-001": { name: "Widget A", sku: "WDG-001", quantity: 150 },
      "GDG-002": { name: "Gadget B", sku: "GDG-002", quantity: 87 },
      "TOL-003": { name: "Tool C", sku: "TOL-003", quantity: 45 },
      "PRT-004": { name: "Part D", sku: "PRT-004", quantity: 230 },
    };
    return mapping[qrText] || { name: "Unknown Item", sku: qrText, quantity: 0 };
  };

  const handleScan = (detectedCodes: any[]) => {
    if (!scanningEnabled || detectedCodes.length === 0) return;

    const qrText = detectedCodes[0].rawValue;
    const itemData = qrToItem(qrText);

    const newItem: ScannedItem = {
      id: Date.now(),
      ...itemData,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setCurrentItem(newItem);
    setScanningEnabled(false); // temporarily disable scanning
    toast({ title: "Item Scanned", description: `${itemData.name} (${itemData.sku})` });
  };

  const handleError = (err: any) => {
    console.error("QR Scanner error:", err);
  };

  const addToStock = () => {
    if (!currentItem) return;
    toast({
      title: "Stock Added",
      description: `Added ${adjustQuantity} units to ${currentItem.name}`,
    });
    setScannedItems([currentItem, ...scannedItems]);
    resetScanner();
  };

  const removeFromStock = () => {
    if (!currentItem) return;
    toast({
      title: "Stock Removed",
      description: `Removed ${adjustQuantity} units from ${currentItem.name}`,
      variant: "destructive",
    });
    setScannedItems([currentItem, ...scannedItems]);
    resetScanner();
  };

  // Reset current item and re-enable scanning
  const resetScanner = () => {
    setCurrentItem(null);
    setAdjustQuantity(1);
    setScanningEnabled(true);
  };

  // Auto-reset after 5 seconds if user hasn't pressed add/remove
  useEffect(() => {
    if (!currentItem) return;
    const timer = setTimeout(() => {
      resetScanner();
      toast({ title: "Scanner Reset", description: "Ready for next scan" });
    }, 5000);

    return () => clearTimeout(timer);
  }, [currentItem]);

  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">QR Scanner</h1>
        <p className="text-muted-foreground">Scan items to update inventory in real-time</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Camera Feed */}
        <Card className="bg-gradient-card border-border/50">
          <CardHeader>
            <CardTitle>Camera Feed</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="aspect-video bg-secondary rounded-lg overflow-hidden">
              <div className="w-full h-full">
                <Scanner
                  onScan={handleScan}
                  onError={handleError}
                  constraints={{ facingMode: "environment" }}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Scanned Item Details */}
        <Card className="bg-gradient-card border-border/50">
          <CardHeader>
            <CardTitle>Scanned Item Details</CardTitle>
          </CardHeader>
          <CardContent>
            {currentItem ? (
              <div className="space-y-4">
                <div className="p-4 bg-primary/10 rounded-lg space-y-2">
                  <div className="flex items-center gap-2">
                    <Package className="h-5 w-5 text-primary" />
                    <h3 className="font-semibold text-lg">{currentItem.name}</h3>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <p className="text-muted-foreground">SKU</p>
                      <p className="font-medium">{currentItem.sku}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Current Stock</p>
                      <p className="font-medium">{currentItem.quantity} units</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Adjust Quantity</label>
                  <Input
                    type="number"
                    value={adjustQuantity}
                    onChange={(e) => setAdjustQuantity(Number(e.target.value))}
                    min={1}
                    className="bg-background"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <Button onClick={addToStock} className="bg-success hover:bg-success/90">
                    <Plus className="mr-2 h-4 w-4" />
                    Add to Stock
                  </Button>
                  <Button onClick={removeFromStock} variant="destructive">
                    <Minus className="mr-2 h-4 w-4" />
                    Remove
                  </Button>
                </div>
              </div>
            ) : (
              <div className="h-[300px] flex items-center justify-center text-muted-foreground">
                Scan a QR code to view item details
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Scan History */}
      <Card className="bg-gradient-card border-border/50">
        <CardHeader>
          <CardTitle>Scan History</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {scannedItems.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between p-4 bg-secondary/50 rounded-lg hover:bg-secondary transition-colors"
              >
                <div className="flex items-center gap-4">
                  <Package className="h-5 w-5 text-primary" />
                  <div>
                    <p className="font-medium">{item.name}</p>
                    <p className="text-sm text-muted-foreground">{item.sku}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium">{item.quantity} units</p>
                  <p className="text-xs text-muted-foreground">{item.time}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
