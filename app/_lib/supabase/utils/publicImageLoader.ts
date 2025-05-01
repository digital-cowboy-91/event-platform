import getEnvVars from "./getEnvVars";

interface Args {
  src: string;
  width: number;
  quality?: number;
}

const publicImageLoader = ({ src }: Args) =>
  src === "#"
    ? "https://placehold.co/1200x800/png?text=NO+IMAGE"
    : `${getEnvVars().SUPABASE_URL}/storage/v1/object/public/${src}`;

export default publicImageLoader;
