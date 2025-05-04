import ProfileForm from "@/app/_components/profile/ProfileForm";
import getCurrentProfile from "@/app/_lib/db/controller/profile/getCurrentProfile";

export default async function page() {
  const res = await getCurrentProfile();

  if (!res.success) {
    return <div>{JSON.stringify(res)}</div>;
  }

  return <ProfileForm profileData={res.profile} />;
}
