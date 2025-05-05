import readEventById from "@/app/_lib/db/controller/events/getSingleEvent";
import generateIcsFile from "@/app/_lib/ics/generateIcsFIle";

export async function GET(
  request: Request,
  context: { params: Promise<{ event_id: string }> }
) {
  const { event_id: id } = await context.params;

  const result = await readEventById({ id });

  if (!result.success) {
    return new Response(JSON.stringify(result));
  }

  const ics = await generateIcsFile(result.event);

  return new Response(ics, {
    headers: {
      "Content-Type": ics.type,
      "Content-Disposition": `attachment; filename="${ics.name}"`,
    },
  });
}
