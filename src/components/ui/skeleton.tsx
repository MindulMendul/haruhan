import { cn } from "@/lib/utils";
import { View } from "react-native";
import * as React from "react";

function Skeleton({ className, ...props }: React.ComponentProps<typeof View> & React.RefAttributes<View>) {
  return <View className={cn("bg-accent animate-pulse rounded-md", className)} {...props} />;
}

export { Skeleton };
