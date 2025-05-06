import { Skeleton } from "@/components/ui/skeleton"

export default function RegisterLoading() {
  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left side skeleton */}
      <div className="hidden md:flex md:w-1/2 bg-blue-600 relative">
        <div className="relative z-20 flex flex-col justify-center items-center p-12 w-full">
          <Skeleton className="h-10 w-3/4 mb-6 bg-white/20" />
          <Skeleton className="h-6 w-2/3 mb-8 bg-white/20" />
          <div className="grid grid-cols-2 gap-6 w-full max-w-md">
            <Skeleton className="h-24 w-full bg-white/20" />
            <Skeleton className="h-24 w-full bg-white/20" />
            <Skeleton className="h-24 w-full bg-white/20" />
            <Skeleton className="h-24 w-full bg-white/20" />
          </div>
        </div>
      </div>

      {/* Right side - Form skeleton */}
      <div className="flex-1 flex items-center justify-center p-6 bg-gray-50">
        <div className="w-full max-w-md border rounded-lg p-6">
          <Skeleton className="h-8 w-3/4 mb-2" />
          <Skeleton className="h-4 w-1/2 mb-8" />

          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Skeleton className="h-4 w-20 mb-2" />
                <Skeleton className="h-10 w-full" />
              </div>
              <div>
                <Skeleton className="h-4 w-20 mb-2" />
                <Skeleton className="h-10 w-full" />
              </div>
            </div>

            <div>
              <Skeleton className="h-4 w-16 mb-2" />
              <Skeleton className="h-10 w-full" />
            </div>

            <div>
              <Skeleton className="h-4 w-24 mb-2" />
              <Skeleton className="h-10 w-full" />
            </div>

            <div>
              <Skeleton className="h-4 w-36 mb-2" />
              <Skeleton className="h-10 w-full" />
            </div>

            <div className="flex items-center space-x-2">
              <Skeleton className="h-4 w-4 rounded" />
              <Skeleton className="h-4 w-40" />
            </div>

            <Skeleton className="h-10 w-full" />
          </div>

          <div className="mt-6">
            <Skeleton className="h-4 w-full mb-4" />
            <div className="grid grid-cols-2 gap-4">
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
            </div>
            <Skeleton className="h-4 w-40 mx-auto mt-4" />
          </div>
        </div>
      </div>
    </div>
  )
}
