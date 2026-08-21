import { getAllOrders } from "@/lib/orders";
import { formatCurrency, formatRelative } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

export const dynamic = "force-dynamic";

const statusVariant = (status: string): "success" | "warning" | "danger" | "neutral" => {
  switch (status) {
    case "delivered": return "success";
    case "shipped": return "warning";
    case "cancelled": return "danger";
    default: return "neutral";
  }
};

export default async function OrdersPage() {
  const orders = await getAllOrders();
  const totalQty = (items: { quantity: number }[]) => items.reduce((n, i) => n + i.quantity, 0);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-text">Orders</h1>
        <p className="text-sm text-text-tertiary mt-0.5">{orders.length} orders</p>
      </div>

      {orders.length === 0 ? (
        <div className="glass rounded-2xl border border-border p-16 text-center">
          <h3 className="text-lg font-semibold text-text mb-2">No orders yet</h3>
          <p className="text-sm text-text-tertiary max-w-sm mx-auto">When customers start placing orders, they will appear here with their status, payment info, and tracking details.</p>
        </div>
      ) : (
        <div className="glass rounded-2xl border border-border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  {["Order ID", "Customer", "Items", "Total", "Status", "Payment", "Date", ""].map((h) => (
                    <th key={h} className="text-left text-[11px] font-semibold text-text-tertiary uppercase tracking-wider px-4 py-3.5">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order.id} className="border-b border-border/50 last:border-0 hover:bg-bg-hover/50 transition-colors">
                    <td className="px-4 py-3 text-xs font-mono font-medium text-text">{order.id}</td>
                    <td className="px-4 py-3"><div className="text-sm font-medium text-text">{order.customerPhone}</div></td>
                    <td className="px-4 py-3 text-xs text-text-secondary">{totalQty(order.items)}</td>
                    <td className="px-4 py-3 text-xs font-semibold text-text">{formatCurrency(order.total)}</td>
                    <td className="px-4 py-3"><Badge variant={statusVariant(order.status)}>{order.status}</Badge></td>
                    <td className="px-4 py-3"><span className="text-xs font-medium text-warning">pending</span></td>
                    <td className="px-4 py-3 text-xs text-text-tertiary">{formatRelative(new Date(order.createdAt))}</td>
                    <td className="px-4 py-3" />
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
