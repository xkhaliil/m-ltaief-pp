"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export async function signOut() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/admin/login");
}

// Takes a project off the public site, or puts it back. Unlike
// deleteProject this keeps the row — text, layout and gallery all survive,
// so an offline project can be switched back on at any time.
export async function setProjectPublished(id: string, published: boolean) {
  const supabase = await createClient();
  const { error } = await supabase
    .from("projects")
    .update({ published })
    .eq("id", id);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/admin");
  revalidatePath("/admin/homepage");
  revalidatePath("/");
}

export async function deleteProject(id: string) {
  const supabase = await createClient();
  const { error } = await supabase.from("projects").delete().eq("id", id);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/admin");
  revalidatePath("/");
}
