import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container px-4 h-full mx-auto py-8">
        <div className="flex w-full gap-4">
          <div className="w-full bg-white p-6 rounded-sm border border-gray-100">
            <div className="mb-4">
              <div className="flex gap-4">
                <Skeleton className="h-[120px] w-[120px] rounded-lg" />
                <div className="space-y-2">
                  <Skeleton className="h-8 w-[300px]" />
                  <Skeleton className="h-6 w-[200px]" />
                </div>
              </div>
            </div>

            <div className="mb-4">
              <Skeleton className="h-5 w-full" />
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 py-4">
              <div className="flex items-center">
                <Skeleton className="h-8 w-8 mr-2 rounded-full" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-[80px]" />
                  <Skeleton className="h-5 w-[100px]" />
                </div>
              </div>
              <div className="flex items-center">
                <Skeleton className="h-8 w-8 mr-2 rounded-full" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-[80px]" />
                  <Skeleton className="h-5 w-[100px]" />
                </div>
              </div>
              <div className="flex items-center">
                <Skeleton className="h-8 w-8 mr-2 rounded-full" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-[80px]" />
                  <Skeleton className="h-5 w-[100px]" />
                </div>
              </div>
            </div>

            <div className="flex items-center gap-6 mb-8">
              <Skeleton className="h-11 w-32 rounded-md" />
              <Skeleton className="h-11 w-11 rounded-md" />
              <Skeleton className="h-11 w-11 rounded-md" />
            </div>

            <div className="space-y-4">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-[80%]" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-[60%]" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
