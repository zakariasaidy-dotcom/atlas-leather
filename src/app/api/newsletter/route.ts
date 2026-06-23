import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/server";
import { newsletterSchema } from "@/lib/validations/schemas";
import { z } from "zod";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const data = newsletterSchema.parse(body);

    const supabase = await createAdminClient();

    const { error } = await supabase
      .from("newsletter_subscribers")
      .upsert({ email: data.email, is_active: true }, { onConflict: "email" });

    if (error) {
      console.error("[newsletter]", error);
      return NextResponse.json({ error: "Erreur lors de l'inscription" }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: "E-mail invalide", details: err.errors }, { status: 400 });
    }
    console.error("[newsletter]", err);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const body = await req.json();
    const { email } = z.object({ email: z.string().email() }).parse(body);

    const supabase = await createAdminClient();

    const { error } = await supabase
      .from("newsletter_subscribers")
      .update({ is_active: false })
      .eq("email", email);

    if (error) {
      console.error("[newsletter/unsubscribe]", error);
      return NextResponse.json({ error: "Erreur lors de la désinscription" }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: "E-mail invalide" }, { status: 400 });
    }
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
