import { Button } from "@/components/ui/button";
import prisma from "@/lib/database";
import {useTRPC} from "@/trpc/client";
import {dehydrate, useQuery, useSuspenseQuery} from "@tanstack/react-query";
import { getQueryClient, caller} from  "@/trpc/server";
import { HydrationBoundary } from "@tanstack/react-query";
import { Client } from "./client";
import { Suspense } from "react";


const Page = async () => {
  // fetch
  const data = await caller.hello({ text: "hello!" });
  const queryClient = getQueryClient();
  void queryClient.prefetchQuery({
    queryKey: ['hello', { text: "hello!" }],
    queryFn: () => caller.hello({ text: "hello!" })
  });
  return (
    <HydrationBoundary state = {dehydrate(queryClient)}>
      <Suspense fallback={<div>Loading...</div>}>
      <Client>

      </Client>
      </Suspense>
    </HydrationBoundary>
    
  );
};

export default Page;

