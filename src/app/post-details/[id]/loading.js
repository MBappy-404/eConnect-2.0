import { Card, Skeleton } from "@nextui-org/react";
const loading = () => {
  return (
    <div>
      <Card
        className="space-y-5 p-4 mt-5 min-h-[100vh] bg-[#1E293B]"
        radius="lg"
      >
        <div className="max-w-[300px] w-full flex items-center gap-3">
          <div>
            <Skeleton className="flex rounded-full w-12 h-12" />
          </div>
          <div className="w-full flex flex-col gap-2">
            <Skeleton className="h-3 w-3/5 rounded-lg" />
            <Skeleton className="h-3 w-4/5 rounded-lg" />
          </div>
        </div>
        <Skeleton className=" bg-gray-500 rounded-lg">
          <div className=" h-72 rounded-lg "></div>
        </Skeleton>
        <div className="space-y-3">
          <Skeleton className=" bg-gray-500 w-3/5 rounded-lg">
            <div className="h-3 w-5/5 rounded-lg "></div>
          </Skeleton>
        </div>
        <div className="max-w-[300px] w-full flex items-center gap-3">
          <div>
            <Skeleton className="flex rounded-full w-12 h-12" />
          </div>
          <div className="w-full flex flex-col gap-2">
            <Skeleton className="h-3 w-3/5 rounded-lg" />
            <Skeleton className="h-3 w-4/5 rounded-lg" />
          </div>
        </div>
        <div className="max-w-[300px] w-full flex items-center gap-3">
          <div>
            <Skeleton className="flex rounded-full w-12 h-12" />
          </div>
          <div className="w-full flex flex-col gap-2">
            <Skeleton className="h-3 w-3/5 rounded-lg" />
            <Skeleton className="h-3 w-4/5 rounded-lg" />
          </div>
        </div>
      </Card>
    </div>
  );
};

export default loading;
