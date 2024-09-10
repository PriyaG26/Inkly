"use client";

import { useMutation } from "convex/react";
import { Doc } from "@/convex/_generated/dataModel";
import { api } from "@/convex/_generated/api";
import { useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

interface TitleProps {
  initialData: Doc<"documents">;
}

export default function Title({ initialData }: TitleProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const update = useMutation(api.documents.update);

  const [title, setTitle] = useState(initialData.title || "Untitled");
  const [isEditing, setIsEditing] = useState(false);

  function enableInput() {
    setTitle(initialData.title);
    setIsEditing(true);
    setTimeout(() => {
      inputRef.current?.focus();
      inputRef.current?.setSelectionRange(0, inputRef.current.value.length);
    }, 0);
  }

  function disableInput() {
    setIsEditing(false);
  }

  function onChange(event: React.ChangeEvent<HTMLInputElement>) {
    setTitle(event.target.value);
    update({
      id: initialData._id,
      title: event.target.value || "Untitled",
    });
  }

  function onKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Enter") {
      disableInput();
    }
  }

  return (
    <div className="flex items-center gap-x-1">
      {!!initialData.icon && <p>{initialData.icon}</p>}
      {isEditing ? (
        <Input
          ref={inputRef}
          onClick={enableInput}
          onBlur={disableInput}
          onChange={onChange}
          onKeyDown={onKeyDown}
          value={title}
          className="h-7 px-2 focus-visible:ring-transparent"
        />
      ) : (
        <Button
          size="sm"
          variant="ghost"
          className="font-normal h-auto p-1"
          onClick={enableInput}
        >
          <span className="truncate">{initialData?.title}</span>
        </Button>
      )}
    </div>
  );
}

Title.Skeleton = function TitleSkeleton() {
  return <Skeleton className="h-9 w-20 rounded-md" />;
};