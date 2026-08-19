export default function Loading() {
  return (
    <div className="container-main min-h-[70vh] flex flex-col items-center justify-center py-20">
      <div className="w-12 h-12 rounded-full border-4 border-border border-t-accent animate-spin mb-4" role="status" aria-label="Loading" />
      <p className="text-sm text-text-muted">Loading...</p>
    </div>
  );
}