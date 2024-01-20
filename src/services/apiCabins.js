import supabase, { supabaseUrl } from "./supabase";

export async function getCabins() {
  const { data, error } = await supabase.from("cabins").select("*");

  if (error) throw new Error("Cabins could not be loaded");

  return data;
}

export async function deleteCabin(id) {
  const { data, error } = await supabase.from("cabins").delete().eq("id", id);

  if (error) throw new Error("Cabin could not be deleted");

  return data;
}

export async function createEditCabin(newCabin, id) {
  const isNewImage = typeof newCabin.image !== "string";

  const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
    "/",
    ""
  );

  const imagePath = `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  let query = supabase.from("cabins");

  if (!id)
    query = query.insert([
      { ...newCabin, image: isNewImage ? imagePath : newCabin.image },
    ]);
  else
    query = query
      .update({ ...newCabin, image: isNewImage ? imagePath : newCabin.image })
      .eq("id", id);

  const { data, error } = await query.select().single();

  if (error) {
    throw new Error(`Cabin could not be ${id ? "editted" : "created"}`);
  }

  if (!isNewImage) return data;

  const { error: storageError } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, newCabin.image);

  if (storageError) {
    await supabase.from("cabins").delete().eq("id", data.id);
    console.log(storageError);
    throw new Error(
      `There was an error uploading the image, cabin was not ${
        id ? "editted" : "created"
      }`
    );
  }

  return data;
}
