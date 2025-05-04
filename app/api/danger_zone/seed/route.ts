import seed from "@/app/_lib/db/seeding/seed";

export async function GET() {
  try {
    await seed();
    return Response.json({ status: 200, success: true });
  } catch (error) {
    return Response.json({ status: 500, success: false, error });
  }
}
