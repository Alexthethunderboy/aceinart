import { GeometricSkeleton } from "@/components/ui/GeometricSkeleton";

export default function Loading() {
  return (
    <div className="h-screen w-full flex items-center justify-center bg-background">
      <div className="flex gap-4">
        <GeometricSkeleton variant="circle" className="h-12 w-12" />
        <GeometricSkeleton variant="rectangle" className="h-12 w-12" />
        <GeometricSkeleton variant="pill" className="h-12 w-12" />
      </div>
      <div className="sr-only">Loading Digital Archive...</div>
    </div>
  );
}
