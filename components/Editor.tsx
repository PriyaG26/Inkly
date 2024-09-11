"use client";

import { PartialBlock } from "@blocknote/core";
import {useCreateBlockNote} from "@blocknote/react"
import { BlockNoteView } from "@blocknote/mantine";
import { useTheme } from "next-themes";
import { useState } from "react";
import { useEdgeStore } from "@/lib/edgestore";

import "@blocknote/core/style.css";

interface EditorProps {
  onChange: (value: string) => void;
  initialContent?: string;
  editable?: boolean;
}

export default function Editor({
  onChange,
  initialContent,
  editable,
}: EditorProps) {
  const { resolvedTheme } = useTheme();
  const { edgestore } = useEdgeStore();

  async function handleUpload(file: File) {
    const response = await edgestore.publicFiles.upload({
      file,
    });

    return response.url;
  }
  const initialBlocks = initialContent ? JSON.parse(initialContent) : undefined;
  const [blocks, setBlocks] = useState<PartialBlock[]>(initialBlocks);
  const editor = useCreateBlockNote({
    // initialContent: initialContent
    //   ? (JSON.parse(initialContent) as PartialBlock[])
    //   : undefined,
    initialContent:blocks,
    uploadFile: handleUpload,
  });

  return (
    <div>
      <BlockNoteView
      editable={editable}
        editor={editor}
        theme={resolvedTheme === "dark" ? "dark" : "light"}
        onChange={ () => {
            setBlocks(editor.document);
            onChange(JSON.stringify(blocks));
          }}
      />
    </div>
  );
}