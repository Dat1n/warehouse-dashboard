import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileDown, Filter } from "lucide-react";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { toast } from "@/hooks/use-toast";

const stockInOutData = [
  { month: "Jan", stockIn: 400, stockOut: 240 },
  { month: "Feb", stockIn: 300, stockOut: 139 },
  { month: "Mar", stockIn: 520, stockOut: 380 },
  { month: "Apr", stockIn: 450, stockOut: 308 },
  { month: "May", stockIn: 580, stockOut: 430 },
  { month: "Jun", stockIn: 510, stockOut: 390 },
];

const warehouseSectionData = [
  { section: "Section A", items: 120 },
  { section: "Section B", items: 98 },
  { section: "Section C", items: 86 },
  { section: "Section D", items: 75 },
  { section: "Section E", items: 110 },
];

export default function Reports() {
  const handleExport = (format: "csv" | "pdf") => {
    toast({
      title: "Export Started",
      description: `Generating ${format.toUpperCase()} report...`,
    });
  };

  return (
    <div className="space-y-6 p-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Reports</h1>
          <p className="text-muted-foreground">Analyze stock trends and generate reports</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2">
            <Filter className="h-4 w-4" />
            Filter
          </Button>
          <Button
            onClick={() => handleExport("csv")}
            variant="outline"
            className="gap-2"
          >
            <FileDown className="h-4 w-4" />
            Export CSV
          </Button>
          <Button
            onClick={() => handleExport("pdf")}
            className="gap-2 bg-primary hover:bg-primary/90"
          >
            <FileDown className="h-4 w-4" />
            Export PDF
          </Button>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card className="bg-gradient-card border-border/50">
          <CardHeader>
            <CardTitle>Stock In/Out Trends</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={350}>
              <LineChart data={stockInOutData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
                <YAxis stroke="hsl(var(--muted-foreground))" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--popover))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "0.5rem",
                  }}
                />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="stockIn"
                  stroke="hsl(142 71% 45%)"
                  strokeWidth={2}
                  name="Stock In"
                />
                <Line
                  type="monotone"
                  dataKey="stockOut"
                  stroke="hsl(0 84% 60%)"
                  strokeWidth={2}
                  name="Stock Out"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card border-border/50">
          <CardHeader>
            <CardTitle>Items by Warehouse Section</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={350}>
              <BarChart data={warehouseSectionData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="section" stroke="hsl(var(--muted-foreground))" />
                <YAxis stroke="hsl(var(--muted-foreground))" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--popover))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "0.5rem",
                  }}
                />
                <Legend />
                <Bar dataKey="items" fill="hsl(221 83% 53%)" name="Total Items" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-gradient-card border-border/50">
        <CardHeader>
          <CardTitle>Summary Statistics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="p-4 bg-secondary/50 rounded-lg">
              <p className="text-sm text-muted-foreground">Total Stock Movement</p>
              <p className="text-2xl font-bold text-foreground mt-1">2,763 units</p>
              <p className="text-sm text-success mt-1">+18% vs last period</p>
            </div>
            <div className="p-4 bg-secondary/50 rounded-lg">
              <p className="text-sm text-muted-foreground">Average Stock Turnover</p>
              <p className="text-2xl font-bold text-foreground mt-1">45 days</p>
              <p className="text-sm text-success mt-1">-5 days improvement</p>
            </div>
            <div className="p-4 bg-secondary/50 rounded-lg">
              <p className="text-sm text-muted-foreground">Stock Accuracy</p>
              <p className="text-2xl font-bold text-foreground mt-1">98.5%</p>
              <p className="text-sm text-success mt-1">+2.3% vs last period</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
