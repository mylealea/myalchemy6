import { useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/auth")({
  head: () => ({ meta: [
    { title: "Connexion — Ecoflux" },
    { name: "description", content: "Créez votre compte ou connectez-vous à votre atelier Ecoflux." },
    { property: "og:title", content: "Connexion — Ecoflux" },
    { property: "og:description", content: "Accédez à votre atelier d’ingénierie économique." },
    { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: AuthPage,
});

function AuthPage() {
  const [mode, setMode] = useState<"in" | "up">("in");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [pending, setPending] = useState(false);
  const navigate = useNavigate();
  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setPending(true);
    try {
      const { data, error } = mode === "up"
        ? await supabase.auth.signUp({ email, password, options: { emailRedirectTo: window.location.origin } })
        : await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      if (!data.session) { toast.info("Compte créé. Vérifiez votre e-mail pour le confirmer."); return; }
      await navigate({ to: "/", replace: true });
    } catch (err) { toast.error(err instanceof Error ? err.message : "Échec de la connexion."); }
    finally { setPending(false); }
  }
  return <main className="atelier-shell flex min-h-screen items-center justify-center p-5">
    <form onSubmit={submit} className="glass w-full max-w-sm space-y-4 rounded-lg p-6">
      <div className="flex items-center gap-3"><span className="aig size-8 rounded-lg" /><span className="text-xl font-semibold">Ecoflux</span></div>
      <h1 className="text-lg font-semibold">{mode === "up" ? "Créer un compte" : "Se connecter"}</h1>
      <label className="block text-sm">E-mail<input required type="email" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} className="mt-2 w-full rounded-lg border border-border bg-background p-3" /></label>
      <label className="block text-sm">Mot de passe<input required type="password" minLength={6} autoComplete={mode === "up" ? "new-password" : "current-password"} value={password} onChange={(e) => setPassword(e.target.value)} className="mt-2 w-full rounded-lg border border-border bg-background p-3" /></label>
      <Button type="submit" disabled={pending} className="w-full">{pending && <Loader2 className="animate-spin" />}{mode === "up" ? "Créer mon compte" : "Se connecter"}</Button>
      <button type="button" onClick={() => setMode(mode === "up" ? "in" : "up")} className="w-full text-center text-xs text-muted-foreground hover:text-foreground">
        {mode === "up" ? "Déjà un compte ? Se connecter" : "Pas encore de compte ? Créer un compte"}
      </button>
    </form>
  </main>;
}
