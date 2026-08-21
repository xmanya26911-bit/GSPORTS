import { getAllCustomers } from "@/lib/customers";
import { getAllOrders } from "@/lib/orders";
import { formatCurrency, formatDate } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

export const dynamic = "force-dynamic";

export default async function CustomersPage() {
  const customers = await getAllCustomers();
  const orders = await getAllOrders();
  const spentByPhone = new Map<string, number>();
  for (const o of orders) {
    if (o.customerPhone && o.customerPhone !== "guest") {
      spentByPhone.set(o.customerPhone, (spentByPhone.get(o.customerPhone) ?? 0) + o.total);
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-text">Customers</h1>
        <p className="text-sm text-text-tertiary mt-0.5">{customers.length} customers</p>
      </div>

      {customers.length === 0 ? (
        <div className="glass rounded-2xl border border-border p-16 text-center">
          <h3 className="text-lg font-semibold text-text mb-2">No customers yet</h3>
          <p className="text-sm text-text-tertiary max-w-sm mx-auto">Customer profiles will appear here once people start placing orders. Each customer shows their order history, total spent, and loyalty status.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {customers.map((customer) => (
            <div key={customer.id} className="glass-card rounded-2xl p-5">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent to-purple flex items-center justify-center text-sm font-bold text-white">
                    {(customer.name ?? customer.phone).split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase() || customer.phone.slice(-2)}
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-text">{customer.name ?? "—"}</h3>
                    <p className="text-xs text-text-tertiary">{customer.phone}</p>
                  </div>
                </div>
                <Badge variant={customer.orderIds.length > 0 ? "success" : "neutral"}>
                  {customer.orderIds.length > 0 ? "buyer" : "new"}
                </Badge>
              </div>
              <div className="grid grid-cols-3 gap-4 pt-4 border-t border-border">
                <div>
                  <div className="text-xs text-text-tertiary">Orders</div>
                  <div className="text-sm font-semibold text-text mt-0.5">{customer.orderIds.length}</div>
                </div>
                <div>
                  <div className="text-xs text-text-tertiary">Spent</div>
                  <div className="text-sm font-semibold text-text mt-0.5">{formatCurrency(spentByPhone.get(customer.phone) ?? 0)}</div>
                </div>
                <div>
                  <div className="text-xs text-text-tertiary">Joined</div>
                  <div className="text-sm font-semibold text-text mt-0.5">{formatDate(new Date(customer.createdAt))}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
