import supabase, { supabaseUrl } from "./supabase";

export async function login({ email, password }) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    console.log(error);
    throw new Error(error.message);
  }

  return data?.user;
}

export async function getCurrentUser() {
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) return null;

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error) {
    console.log(error);
    throw new Error(error.message);
  }

  return user;
}

export async function logout() {
  const { error } = await supabase.auth.signOut();

  if (error) {
    console.log(error);
    throw new Error(error.message);
  }
}

export async function signup({ fullName, email, password }) {
  const { data, error } = await supabase.auth.signUp({
    password,
    email,
    options: { data: { fullName, avatar: "" } },
  });

  if (error) {
    console.log(error);
    throw new Error(error.message);
  }

  return data;
}
export async function updateUser({ fullName, avatar, password }) {
  let updatedData;
  if (password) updatedData = { password };
  if (fullName) updatedData = { data: { fullName } };

  const { data, error } = await supabase.auth.updateUser(updatedData);

  if (error) throw new Error(error.message);

  if (!avatar) return data?.user;

  const fileName = `avatar-${data.user.id}-${Math.random()}`;
  const filePath = `${supabaseUrl}/storage/v1/object/public/avatars/${fileName}`;

  const { error: storageError } = await supabase.storage
    .from("avatars")
    .upload(fileName, avatar);

  if (storageError) throw new Error(storageError.message);

  updatedData = { data: { avatar: filePath } };
  const {
    data: { user: updatedUser },
    error2,
  } = await supabase.auth.updateUser(updatedData);

  if (error2) throw new Error(error2.message);

  return updatedUser;
}
