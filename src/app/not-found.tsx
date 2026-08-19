import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container-main min-h-[70vh] flex flex-col items-center justify-center text-center py-20">
      <p className="text-7xl font-black text-accent font-display mb-4">404</p>
      <h1 className="text-2xl md:text-3xl font-bold text-text mb-3">Page Not Found</h1>
      <p className="text-text-muted mb-8 max-w-md">
        The page you&apos;re looking for doesn&apos;t exist or may have been moved.
      </p>
      <Link
        href="/products"
        className="px-6 py-3 bg-accent text-white text-sm font-bold rounded-xl hover:bg-accent-dark transition-colors"
      >
        Browse Bats
      </Link>
    </div>
  );
}