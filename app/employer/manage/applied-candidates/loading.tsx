import { Skeleton } from "@/components/ui/skeleton";

export default function CandidatesTableLoading() {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-950">
      {/* Header */}
      <header className="bg-blue-950 text-white">
        <div className="container mx-auto px-4 md:px-8 flex items-center justify-between py-4">
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-2">
              <span className="bg-orange-500 px-2 py-1 rounded font-bold text-white">
                Job
              </span>
              <span className="font-bold text-lg text-white">Wise</span>
            </div>
            <div className="hidden md:flex items-center gap-6">
              <Skeleton className="h-4 w-20 bg-white/20" />
              <Skeleton className="h-4 w-20 bg-white/20" />
              <Skeleton className="h-4 w-20 bg-white/20" />
              <Skeleton className="h-4 w-20 bg-white/20" />
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Skeleton className="h-4 w-32 bg-white/20" />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
            <Skeleton className="h-8 w-40" />
            <div className="flex items-center gap-2">
              <Skeleton className="h-9 w-24" />
              <Skeleton className="h-9 w-36" />
            </div>
          </div>

          {/* Filter Bar */}
          <Skeleton className="h-16 w-full rounded-lg mb-6" />

          {/* Results info */}
          <div className="flex justify-between items-center mb-4">
            <Skeleton className="h-5 w-48" />
          </div>

          {/* Candidates Table */}
          <div className="bg-white dark:bg-gray-900 rounded-lg shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-800">
                <thead className="bg-gray-50 dark:bg-gray-800">
                  <tr>
                    {Array(7)
                      .fill(0)
                      .map((_, index) => (
                        <th
                          key={index}
                          scope="col"
                          className="px-6 py-3 text-left"
                        >
                          <Skeleton className="h-4 w-24" />
                        </th>
                      ))}
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-800">
                  {Array(10)
                    .fill(0)
                    .map((_, index) => (
                      <tr key={index}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <Skeleton className="h-10 w-10 rounded-full" />
                            <div className="ml-4">
                              <Skeleton className="h-4 w-32 mb-2" />
                              <Skeleton className="h-3 w-40" />
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <Skeleton className="h-4 w-32 mb-2" />
                          <Skeleton className="h-3 w-24" />
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <Skeleton className="h-4 w-32" />
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <Skeleton className="h-4 w-24 mb-2" />
                          <Skeleton className="h-3 w-16" />
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <Skeleton className="h-6 w-24 rounded-full" />
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <Skeleton className="h-6 w-16 rounded" />
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center gap-2">
                            {Array(4)
                              .fill(0)
                              .map((_, btnIndex) => (
                                <Skeleton
                                  key={btnIndex}
                                  className="h-4 w-4 rounded"
                                />
                              ))}
                          </div>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
