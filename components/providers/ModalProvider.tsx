"use client";

import { useState, useEffect } from "react";
import {SettingsModal} from "@/components/modals/SetingsModal";
// import CoverImageModal from "@/components/modals/CoverImageModal";

export const ModalProvider=() => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <SettingsModal />
      {/* <CoverImageModal /> */}
    </>
  );
}