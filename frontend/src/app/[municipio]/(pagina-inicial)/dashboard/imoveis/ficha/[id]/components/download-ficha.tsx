"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { downloadDocumento } from "@/service/documentoService";

interface DownloadFichaProps {
  idDocumento: string;
}

export function DownloadFicha({ idDocumento }: DownloadFichaProps) {
  const [path, setPath] = useState<string>("");

  useEffect(() => {
    const fetchDownloadDocumento = async () => {
      const response = await downloadDocumento(idDocumento);
      setPath(response.data);
    };

    fetchDownloadDocumento();
  }, []);

  return (
    <Button asChild variant="default">
      <Link href={path} download>
        Download ficha
      </Link>
    </Button>
  );
}
