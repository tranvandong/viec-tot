import { Skeleton } from "@/components/ui/skeleton"

export default function CandidatesLoading() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto py-8 px-4">
        <div className="flex justify-between items-center mb-6">
          <Skeleton className="h-8 w-32" />
          <div className="flex items-center gap-2">
            <Skeleton className="h-10 w-10 rounded-md" />
            <Skeleton className="h-10 w-10 rounded-md" />
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-6">
          {/* Main content */}
          <div className="w-full md:w-3/4">
            {/* Search and filters */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 mb-6">
              <div className="flex flex-col sm:flex-row gap-4">
                <Skeleton className="h-10 w-full sm:w-2/3" />
                <div className="flex gap-2 w-full sm:w-1/3">
                  <Skeleton className="h-10 w-full" />
                  <Skeleton className="h-10 w-full" />
                  <Skeleton className="h-10 w-full" />
                </div>
              </div>
            </div>

            {/* Results info */}
            <div className="flex justify-between items-center mb-4">
              <Skeleton className="h-5 w-48" />
              <Skeleton className="h-5 w-32" />
            </div>

            {/* Candidates grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {Array(6)
                .fill(0)
                .map((_, index) => (
                  <div
                    key={index}
                    className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden border border-gray-100 dark:border-gray-700 p-4"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center">
                        <Skeleton className="w-12 h-12 rounded-lg mr-3" />
                        <div>
                          <Skeleton className="h-5 w-32 mb-1" />
                          <Skeleton className="h-4 w-24" />
                        </div>
                      </div>
                      <Skeleton className="h-6 w-16 rounded" />
                    </div>

                    <Skeleton className="h-4 w-full max-w-[200px] mb-3" />

                    <div className="flex flex-wrap gap-2 mb-3">
                      <Skeleton className="h-6 w-24 rounded-full" />
                      <Skeleton className="h-6 w-24 rounded-full" />
                      <Skeleton className="h-6 w-24 rounded-full" />
                    </div>

                    <Skeleton className="h-4 w-32 mb-3" />

                    <div className="flex justify-between items-center mt-4">
                      <Skeleton className="h-9 w-24 rounded-md" />
                      <Skeleton className="h-9 w-16 rounded-md" />
                    </div>
                  </div>
                ))}
            </div>
          </div>

          {/* Filters sidebar */}
          <div className="w-full md:w-1/4">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 sticky top-4">
              <div className="flex justify-between items-center mb-4">
                <Skeleton className="h-5 w-16" />
                <Skeleton className="h-5 w-16" />
              </div>

              {/* Location filter */}
              <div className="mb-4">
                <Skeleton className="h-5 w-24 mb-2" />
                <div className="space-y-2">
                  {Array(4)
                    .fill(0)
                    .map((_, index) => (
                      <div key={index} className="flex items-center">
                        <Skeleton className="h-4 w-4 rounded mr-2" />
                        <Skeleton className="h-4 w-24" />
                      </div>
                    ))}
                </div>
              </div>

              {/* Gender filter */}
              <div className="mb-4">
                <Skeleton className="h-5 w-24 mb-2" />
                <div className="space-y-2">
                  {Array(2)
                    .fill(0)
                    .map((_, index) => (
                      <div key={index} className="flex items-center">
                        <Skeleton className="h-4 w-4 rounded mr-2" />
                        <Skeleton className="h-4 w-16" />
                      </div>
                    ))}
                </div>
              </div>

              {/* Education filter */}
              <div className="mb-4">
                <Skeleton className="h-5 w-24 mb-2" />
                <div className="space-y-2">
                  {Array(5)
                    .fill(0)
                    .map((_, index) => (
                      <div key={index} className="flex items-center">
                        <Skeleton className="h-4 w-4 rounded mr-2" />
                        <Skeleton className="h-4 w-28" />
                      </div>
                    ))}
                </div>
              </div>

              <Skeleton className="h-10 w-full rounded-md mt-4" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
