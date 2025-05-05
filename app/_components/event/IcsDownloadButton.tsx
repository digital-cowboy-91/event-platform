"use client";

import { Button } from "@radix-ui/themes";
import { useState } from "react";

interface Props {
  eventId: string;
}

export default function IcsDownloadButton({ eventId }: Props) {
  const [isProcessing, setIsProcessing] = useState(false);

  const downloadHandler_workaround = async () => {
    setIsProcessing(true);

    await fetch(`/api/events/${eventId}/ics`).then((res) => {
      const el = document.createElement("a");
      el.href = res.url;
      document.body.appendChild(el);
      el.click();
      document.body.removeChild(el);
      window.URL.revokeObjectURL(res.url);
    });

    setIsProcessing(false);
  };

  return (
    <Button
      variant="outline"
      onClick={downloadHandler_workaround}
      disabled={isProcessing}
      loading={isProcessing}
    >
      Add To Calendar
    </Button>
  );
}
