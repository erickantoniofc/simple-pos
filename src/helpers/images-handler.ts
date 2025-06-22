import imageCompression from "browser-image-compression";
import { supabase } from "@/lib/supabase";

export const uploadImageToSupabase = async (file: File, path: string) => {
  // Comprime la imagen
  const compressed = await imageCompression(file, {
    maxSizeMB: 0.1, // 100 KB
    maxWidthOrHeight: 100,
    useWebWorker: true,
  });

  const session = await supabase.auth.getSession();
  console.log("👤 session:", session);
  // Sube a Supabase
  const { data, error } = await supabase.storage
    .from("product-images")
    .upload(path, compressed, {
      cacheControl: "3600",
      upsert: true,
    });

    console.log({ data, error });


  if (error) throw error;

  const { data: publicUrlData } = supabase.storage
    .from("product-images")
    .getPublicUrl(data.path);

  return publicUrlData.publicUrl;
};