import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-950">
      {/* Header Skeleton */}
      <div className="bg-blue-950 text-white">
        <div className="container mx-auto px-4 md:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-8">
              <div className="flex items-center gap-2">
                <div className="bg-orange-500 px-2 py-1 rounded font-bold text-white">
                  Job
                </div>
                <div className="font-bold text-lg text-white">Wise</div>
              </div>
              <div className="hidden md:flex items-center gap-6">
                <Skeleton className="h-4 w-20 bg-blue-800" />
                <Skeleton className="h-4 w-20 bg-blue-800" />
                <Skeleton className="h-4 w-20 bg-blue-800" />
              </div>
            </div>
            <Skeleton className="h-4 w-32 bg-blue-800" />
          </div>
        </div>
      </div>

      {/* Main Content Skeleton */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
            <Skeleton className="h-8 w-40" />
            <Skeleton className="h-10 w-36" />
          </div>

          {/* Search Bar Skeleton */}
          <div className="bg-white dark:bg-gray-900 rounded-lg shadow-sm p-4 mb-6">
            <div className="flex flex-col md:flex-row gap-4">
              <Skeleton className="h-10 flex-1" />
              <Skeleton className="h-10 w-24" />
              <Skeleton className="h-10 w-24" />
            </div>
          </div>

          {/* Stats Summary Skeleton */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="bg-white dark:bg-gray-900 rounded-lg shadow-sm p-4"
              >
                <Skeleton className="h-4 w-24 mb-2" />
                <Skeleton className="h-8 w-16" />
              </div>
            ))}
          </div>

          {/* Table Skeleton */}
          <div className="bg-white dark:bg-gray-900 rounded-lg shadow-sm overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-gray-800">
              <Skeleton className="h-6 w-32" />
              <Skeleton className="h-4 w-40" />
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-800">
                <thead className="bg-gray-50 dark:bg-gray-800">
                  <tr>
                    {[...Array(6)].map((_, i) => (
                      <th key={i} scope="col" className="px-6 py-3">
                        <Skeleton className="h-4 w-full max-w-[100px]" />
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-800">
                  {[...Array(5)].map((_, i) => (
                    <tr key={i}>
                      <td className="px-6 py-4">
                        <Skeleton className="h-5 w-32 mb-1" />
                        <Skeleton className="h-4 w-24" />
                      </td>
                      <td className="px-6 py-4 hidden md:table-cell">
                        <Skeleton className="h-4 w-28" />
                      </td>
                      <td className="px-6 py-4 hidden md:table-cell">
                        <Skeleton className="h-4 w-24 mb-1" />
                        <Skeleton className="h-3 w-16" />
                      </td>
                      <td className="px-6 py-4">
                        <Skeleton className="h-4 w-16" />
                      </td>
                      <td className="px-6 py-4">
                        <Skeleton className="h-5 w-16 rounded-full" />
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-end gap-2">
                          <Skeleton className="h-4 w-4 rounded-full" />
                          <Skeleton className="h-4 w-4 rounded-full" />
                          <Skeleton className="h-4 w-4 rounded-full" />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination Skeleton */}
            <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-800 flex items-center justify-between">
              <Skeleton className="h-4 w-48" />
              <div className="flex items-center space-x-2">
                <Skeleton className="h-8 w-20" />
                <Skeleton className="h-8 w-20" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
