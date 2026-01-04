import { cn } from "@/lib/utils/cn";

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "text" | "circular" | "rounded";
}

export function Skeleton({ className, variant = "default", ...props }: SkeletonProps) {
  return (
    <div
      className={cn(
        "animate-pulse rounded-md bg-gray-200",
        {
          "h-4 w-full": variant === "default",
          "h-3 w-3/4 rounded": variant === "text",
          "h-12 w-12 rounded-full": variant === "circular",
          "h-20 w-full": variant === "rounded",
        },
        className
      )}
      {...props}
    />
  );
}

export function PlanCardSkeleton() {
  return (
    <div className="flex h-full flex-col rounded-3xl border p-6 text-left shadow-lg border-gray-200 bg-white">
      <div className="space-y-2">
        <Skeleton variant="text" className="h-4 w-1/2" />
        <Skeleton variant="text" className="h-8 w-3/4" />
      </div>
      
      <div className="mt-4">
        <Skeleton variant="text" className="h-6 w-1/3" />
      </div>
      
      <div className="mt-4 flex-1 space-y-2">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="flex items-center gap-2">
            <Skeleton variant="circular" className="h-4 w-4" />
            <Skeleton variant="text" className="h-4 flex-1" />
          </div>
        ))}
      </div>
      
      <div className="mt-6">
        <Skeleton className="h-12 w-full rounded-xl" />
      </div>
    </div>
  );
}

export function HeroSectionSkeleton() {
  return (
    <section className="text-center space-y-8 py-20">
      <Skeleton className="h-8 w-48 mx-auto rounded-full" />
      
      <div className="space-y-6">
        <Skeleton className="h-20 w-3/4 mx-auto" />
        <Skeleton className="h-8 w-full max-w-3xl mx-auto" />
      </div>
      
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
        <Skeleton className="h-12 w-48 rounded-xl" />
        <Skeleton className="h-12 w-40 rounded-xl" />
      </div>
      
      <Skeleton className="h-4 w-64 mx-auto" />
    </section>
  );
}
