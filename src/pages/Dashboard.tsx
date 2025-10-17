import { Package, TrendingDown, ShoppingCart, Truck } from "lucide-react";
import { KPICard } from "@/components/KPICard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const stockTrendData = [
  { month: "Jan", stock: 4000 },
  { month: "Feb", stock: 3800 },
  { month: "Mar", stock: 4200 },
  { month: "Apr", stock: 3900 },
  { month: "May", stock: 4500 },
  { month: "Jun", stock: 4100 },
];

const topProductsData = [
  { name: "Widget A", sales: 420 },
  { name: "Gadget B", sales: 380 },
  { name: "Tool C", sales: 320 },
  { name: "Part D", sales: 280 },
  { name: "Component E", sales: 240 },
];

const categoryData = [
  { name: "Electronics", value: 400 },
  { name: "Tools", value: 300 },
  { name: "Parts", value: 200 },
  { name: "Materials", value: 150 },
];

const COLORS = ["hsl(221 83% 53%)", "hsl(38 92% 50%)", "hsl(142 71% 45%)", "hsl(0 84% 60%)"];

const recentActivity = [
  { id: 1, action: "Stock Added", item: "Widget A", quantity: "+50", time: "2 min ago" },
  { id: 2, action: "Stock Removed", item: "Gadget B", quantity: "-20", time: "15 min ago" },
  { id: 3, action: "New Order", item: "Tool C", quantity: "100", time: "1 hour ago" },
  { id: 4, action: "Stock Added", item: "Part D", quantity: "+75", time: "2 hours ago" },
  { id: 5, action: "Stock Updated", item: "Component E", quantity: "±0", time: "3 hours ago" },
];

export default function Dashboard() {
  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground">Overview of your warehouse operations</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <KPICard
          title="Total Items in Stock"
          value="12,458"
          change="+12% from last month"
          changeType="positive"
          icon={Package}
        />
        <KPICard
          title="Items Low in Stock"
          value="23"
          change="3 critical"
          changeType="negative"
          icon={TrendingDown}
        />
        <KPICard
          title="Total Orders"
          value="1,234"
          change="+8% from last month"
          changeType="positive"
          icon={ShoppingCart}
        />
        <KPICard
          title="Recent Shipments"
          value="45"
          change="Last 7 days"
          changeType="neutral"
          icon={Truck}
        />
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card className="bg-gradient-card border-border/50">
          <CardHeader>
            <CardTitle>Stock Trends</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={stockTrendData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
                <YAxis stroke="hsl(var(--muted-foreground))" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: "hsl(var(--popover))", 
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "0.5rem"
                  }} 
                />
                <Legend />
                <Line type="monotone" dataKey="stock" stroke="hsl(221 83% 53%)" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card border-border/50">
          <CardHeader>
            <CardTitle>Top Selling Products</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={topProductsData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" />
                <YAxis stroke="hsl(var(--muted-foreground))" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: "hsl(var(--popover))", 
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "0.5rem"
                  }} 
                />
                <Legend />
                <Bar dataKey="sales" fill="hsl(38 92% 50%)" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card className="bg-gradient-card border-border/50">
          <CardHeader>
            <CardTitle>Stock by Category</CardTitle>
          </CardHeader>
          <CardContent className="flex justify-center">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: "hsl(var(--popover))", 
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "0.5rem"
                  }} 
                />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card border-border/50">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-center justify-between border-b border-border pb-3 last:border-0">
                  <div className="space-y-1">
                    <p className="font-medium text-foreground">{activity.action}</p>
                    <p className="text-sm text-muted-foreground">{activity.item}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-foreground">{activity.quantity}</p>
                    <p className="text-xs text-muted-foreground">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
