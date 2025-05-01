import imageUpload from "@/app/_lib/storage/controller/imageUpload.action";
import ImageUploadSchema from "@/app/_lib/storage/controller/imageUpload.schema";
import { Box, Flex, Text } from "@radix-ui/themes";
import { Label } from "radix-ui";
import { ChangeEvent, useCallback, useState } from "react";
import { ZodError } from "zod";
import InputError from "./InputError";

// TODO: Handle selection of existing images

interface Props {
  label: string;
  value: string;
  onChange: (value: string) => void;
}

export default function ImageUploader({ label, value, onChange }: Props) {
  const [imgProps, setImgProps] = useState(generateImgProps(value));
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<{ message: string } | null>(null);

  const handleChange = useCallback(
    async (imgEvent: ChangeEvent<HTMLInputElement>) => {
      try {
        const file = ImageUploadSchema.parse(imgEvent.target.files?.[0]);

        const reader = new FileReader();

        reader.onload = (readerEvent) =>
          setImgProps(generateImgProps(readerEvent.target?.result));
        reader.readAsDataURL(file);

        const res = await imageUpload(file, "/events/covers");

        console.log({ res });

        if (!res.success) {
          throw res.error;
        }

        onChange(res.storage.path);
      } catch (e) {
        setImgProps(generateImgProps(null));
        onChange("");

        if (e instanceof ZodError) {
          setError(e.issues[0]);
        } else if (e.message) {
          setError({ message: e.message });
        } else {
          setError({
            message:
              "Something went wrong, please try again, or use a different file",
          });
        }
      }
    },
    [onChange]
  );

  return (
    <>
      <Label.Root>
        {label && <Text>{label}</Text>}
        <Box
          maxHeight="500px"
          width="100%"
          className="aspect-4/3 bg-gray-50"
          style={{ borderRadius: "var(--radius-3)" }}
          p="3"
          position="relative"
        >
          {imgProps.hidden || uploading ? (
            <Flex
              className="absolute inset-0 z-0"
              height="100%"
              justify="center"
              align="center"
            >
              <Text> {uploading ? "Uploading..." : "Upload Image"}</Text>
            </Flex>
          ) : (
            <img {...imgProps} className="w-full h-full object-contain" />
          )}
        </Box>
        <input
          hidden
          type="file"
          onChange={async (e) => {
            setUploading(true);
            setError(null);
            await handleChange(e);
            setUploading(false);
          }}
        />
      </Label.Root>
      <InputError error={error} />
    </>
  );
}

// Helpers
function generateImgProps(src?: string | ArrayBuffer | null) {
  const _src = typeof src === "string" && src.length > 0 ? src : null;
  return _src
    ? {
        src: _src,
        alt: "Preview of uploaded image",
        style: { display: "block" },
        hidden: false,
      }
    : {
        src: _src,
        alt: "No Image",
        style: { display: "none" },
        hidden: true,
      };
}
