import { Card, Skeleton } from "@nextui-org/react";

const Loading = () => {
  return (
    <div className="p-4">
      <Card className="space-y-5 p-4 bg-[#1E293B]" radius="lg">
        {[...Array(15)].map((_, index) => (
          <div
            key={index}
            className=" w-full flex items-center gap-3"
          >
            <Skeleton className="flex rounded-full w-12 h-12" />
            <div className="w-full flex flex-col gap-2">
              <Skeleton className="h-3 w-3/5 rounded-lg" />
              <Skeleton className="h-3 w-4/5 rounded-lg" />
            </div>
          </div>
        ))}
        
      </Card>
    </div>
  );
};

export default Loading;
