import seedDatabase from "@/app/_lib/db/seed";

export async function GET() {
  try {
    await seedDatabase();
    return Response.json({ status: 200, success: true });
  } catch (error) {
    return Response.json({ status: 500, success: false, error });
  }
}
