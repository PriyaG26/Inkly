"use client";

import { ChevronsLeft, PlusCircle } from "lucide-react";
import { UserItem } from "./user-item";
import { Item } from "./item";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { toast } from "sonner";
import { DocumentList } from "./document-list";

export const Navigation = () =>{
    const create=useMutation(api.documents.create);
    const handleCreate = () =>{
        const promise=create({title:"Untitled"});
        toast.promise(promise,{
            loading:"Creating a new note...",
            success: "New Note created!",
            error: "Failed to create a new node"
        });
    };
    return (
        <>
            <aside className="group/sidebar h-full bg-secondary overflow-y-auto relative flex w-60 flex-col z-[99999]">
                <div role="button" className="h-6 w-6 text-muted-foreground rounded-sm hover:bg-neutral-300 dark-hover:bg-neutral-600 absolute top-3 right-2 opacity-0 group-hover/sidebar:opacity-100 transition">
                    <ChevronsLeft className="h-6 w-6" />
                </div>
                <div>
                    <UserItem />
                    <Item onClick={handleCreate} label="New Page" icon={PlusCircle} />
                </div>
                <div className="mt-4">
                    <DocumentList  />
                </div>
                <div className="opacity-0 group-hover/sidebar:opacity-100 transition-cursor-ew-resize absolute h-full w-1 bg-primary/10 right-0 top-0" />
            </aside>
        </>
    )
}