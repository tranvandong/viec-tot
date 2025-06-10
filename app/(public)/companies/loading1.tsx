import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header Skeleton */}
      <div className="bg-blue-950 text-white">
        <div className="container mx-auto px-4 md:px-8 flex items-center justify-between py-4">
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-2">
              <div className="bg-orange-500 px-2 py-1 rounded font-bold text-white">Job</div>
              <div className="font-bold text-lg text-white">Wise</div>
            </div>
            <div className="hidden md:flex items-center gap-6">
              <Skeleton className="h-4 w-16 bg-blue-800" />
              <Skeleton className="h-4 w-16 bg-blue-800" />
              <Skeleton className="h-4 w-16 bg-blue-800" />
              <Skeleton className="h-4 w-16 bg-blue-800" />
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Skeleton className="h-4 w-16 bg-blue-800" />
            <Skeleton className="h-10 w-24 rounded-full bg-blue-800" />
          </div>
        </div>
      </div>

      {/* Search Bar Skeleton */}
      <div className="py-6">
        <div className="container mx-auto px-4 md:px-8">
          <div className="border border-blue-200 rounded-md p-4">
            <div className="flex flex-col md:flex-row gap-2">
              <Skeleton className="h-10 w-full bg-gray-100" />
              <Skeleton className="h-10 w-full bg-gray-100" />
              <Skeleton className="h-10 w-24 bg-blue-500" />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Skeleton */}
      <div className="container mx-auto px-4 md:px-8 py-4">
        {/* Companies Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {Array(8)
            .fill(0)
            .map((_, i) => (
              <div key={i} className="border border-gray-200 rounded-md overflow-hidden">
                <Skeleton className="w-full h-40 bg-gray-200" />
                <div className="p-4 pt-0 relative">
                  <Skeleton className="absolute -top-6 left-4 w-12 h-12 rounded-md bg-gray-200" />
                  <div className="mt-8">
                    <Skeleton className="h-4 w-3/4 mb-2 bg-gray-200" />
                    <Skeleton className="h-3 w-full mb-2 bg-gray-200" />
                    <Skeleton className="h-3 w-1/2 mb-2 bg-gray-200" />
                    <Skeleton className="h-3 w-2/3 mb-2 bg-gray-200" />
                    <div className="flex justify-end">
                      <Skeleton className="h-3 w-16 bg-gray-200" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  )
}
