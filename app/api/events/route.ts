import getEventList from "@/app/_lib/db/controller/events/getEventList";

export async function GET() {
  return await getEventList();
}
