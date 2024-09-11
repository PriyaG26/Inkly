"use client";

import { BlockNoteEditor, PartialBlock } from "@blocknote/core";
import { BlockNoteViewRaw, useBlockNote } from "@blocknote/react";
import "@blocknote/core/style.css"
import { useTheme } from "next-themes";
// import { useEdgeStore } from "@/lib/edgestore";

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

  const editor: BlockNoteEditor = useBlockNote({
    editable,
    initialContent: initialContent
      ? (JSON.parse(initialContent) as PartialBlock[])
      : undefined,
    onEditorContentChange: (editor: BlockNoteEditor) => {
      onChange(JSON.stringify(editor.topLevelBlocks, null, 2));
    },
    uploadFile: handleUpload,
  });

  return (
    <div>
      <BlockNoteViewRaw
        editor={editor}
        theme={resolvedTheme === "dark" ? "dark" : "light"}
      />
    </div>
  );
}