import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="flex min-h-screen bg-white">
      {/* Left side - Login form skeleton */}
      <div className="flex w-full flex-col p-8 md:w-1/2 md:p-12 lg:p-16">
        <div className="mb-12">
          <Skeleton className="h-10 w-32" />
        </div>

        <div className="flex-1">
          <Skeleton className="mb-2 h-10 w-32" />
          <Skeleton className="mb-8 h-5 w-64" />

          <div className="space-y-6">
            <div>
              <Skeleton className="mb-1 h-5 w-16" />
              <Skeleton className="h-12 w-full rounded-full" />
            </div>

            <div>
              <Skeleton className="mb-1 h-5 w-20" />
              <Skeleton className="h-12 w-full rounded-full" />
            </div>

            <div className="flex items-center justify-between">
              <Skeleton className="h-5 w-32" />
              <Skeleton className="h-5 w-32" />
            </div>

            <Skeleton className="h-12 w-full rounded-full" />

            <div className="text-center">
              <Skeleton className="mx-auto mb-4 h-5 w-24" />
              <div className="flex justify-center space-x-4">
                <Skeleton className="h-10 w-32 rounded-full" />
                <Skeleton className="h-10 w-32 rounded-full" />
                <Skeleton className="h-10 w-32 rounded-full" />
              </div>
            </div>

            <div className="pt-6 text-center">
              <Skeleton className="mx-auto mb-4 h-5 w-20" />
              <div className="flex justify-center space-x-4">
                <Skeleton className="h-10 w-24 rounded-full" />
                <Skeleton className="h-10 w-24 rounded-full" />
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 text-center">
          <Skeleton className="mx-auto h-4 w-64" />
        </div>
      </div>

      {/* Right side - Image and tagline skeleton */}
      <div className="hidden bg-gray-50 md:block md:w-1/2">
        <div className="flex h-full flex-col items-center justify-between p-8 md:p-12 lg:p-16">
          <Skeleton className="h-6 w-32 self-start" />

          <div className="flex flex-col items-center">
            <Skeleton className="mb-8 h-64 w-64 rounded-full" />
            <Skeleton className="mb-2 h-8 w-80" />
          </div>

          <Skeleton className="h-2 w-24" />
        </div>
      </div>
    </div>
  )
}
