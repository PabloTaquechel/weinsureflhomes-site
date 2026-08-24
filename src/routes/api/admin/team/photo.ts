import { randomUUID } from "node:crypto";
import { put } from "@vercel/blob";
import { createFileRoute } from "@tanstack/react-router";
import { requireAdmin } from "@/lib/admin-auth.server";

const MAX_BYTES = 5 * 1024 * 1024;

function detectedImage(bytes: Uint8Array) {
  if (bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff) {
    return { extension: "jpg", contentType: "image/jpeg" };
  }
  if (bytes[0] === 0x89 && bytes[1] === 0x50 && bytes[2] === 0x4e && bytes[3] === 0x47) {
    return { extension: "png", contentType: "image/png" };
  }
  if (
    String.fromCharCode(...bytes.slice(0, 4)) === "RIFF" &&
    String.fromCharCode(...bytes.slice(8, 12)) === "WEBP"
  ) {
    return { extension: "webp", contentType: "image/webp" };
  }
  return null;
}

export const Route = createFileRoute("/api/admin/team/photo")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        if (!requireAdmin(request, true)) {
          return Response.json({ error: "Not authorized." }, { status: 401 });
        }
        const form = await request.formData().catch(() => null);
        const file = form?.get("photo");
        if (!(file instanceof File) || file.size < 1 || file.size > MAX_BYTES) {
          return Response.json(
            { error: "Choose a JPG, PNG, or WebP image under 5 MB." },
            { status: 400 },
          );
        }
        const bytes = new Uint8Array(await file.arrayBuffer());
        const image = detectedImage(bytes);
        if (!image) {
          return Response.json(
            { error: "Choose a valid JPG, PNG, or WebP image." },
            { status: 400 },
          );
        }
        try {
          const blob = await put(
            `team/photos/${randomUUID()}.${image.extension}`,
            Buffer.from(bytes),
            {
              access: "public",
              addRandomSuffix: false,
              contentType: image.contentType,
              cacheControlMaxAge: 31536000,
            },
          );
          return Response.json({ url: blob.url });
        } catch (error) {
          console.error("[team] photo upload failed", error);
          return Response.json({ error: "The photo could not be uploaded." }, { status: 500 });
        }
      },
    },
  },
});
