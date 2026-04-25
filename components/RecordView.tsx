"use client";

import { useEffect } from "react";
import { addRecentProcedure } from "@/hooks/useRecentProcedures";

interface RecordViewProps {
  id: string;
}

export default function RecordView({ id }: RecordViewProps) {
  useEffect(() => {
    addRecentProcedure(id);
  }, [id]);

  return null;
}
