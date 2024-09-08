"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { LucideIcon } from "lucide-react";

interface ItemProps{
    label:string;
    onClick:()=>void;
    icon:LucideIcon;
};

export const Item =({
    label,
    onClick,
    icon: Icon,
}: ItemProps) => {
    return (
        <div onClick={onClick} role="button" style={{ paddingLeft: "12px"}} className="group min-h-[27px] text-sm py-1 pr-3 w-full hover:bg-primary/5 flex items-center text-muted-foreground font-medium">
            <Icon className="shrink-0 h-[18px] mr-2 text-muted-foreground" />
            <span className="truncate">
                {label}
            </span>
        </div>
    )
}

Item.Skeleton = function ItemSkeleton({ level }: { level?:number }){
    return(
        <div style={{paddingLeft: level ? `${(level * 12) + 25} px`: "12px"}} className="flex gap-x-2 py-[3px]">
            <Skeleton className="h-4 w-4" />
            <Skeleton className="h-4 w-[30%]" />
        </div>
    )
}