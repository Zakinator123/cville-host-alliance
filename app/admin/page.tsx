export default function AdminHomePage() {
  return (
    <div className="mx-auto max-w-4xl space-y-4 px-4 py-10">
      <h1 className="text-3xl font-semibold">Admin dashboard</h1>
      <p className="text-muted-foreground">
        Protect this route before production (e.g., Vercel password protection or env-based check).
      </p>
      <p className="text-sm text-muted-foreground">
        Links: /admin/supporters and /admin/petitions
      </p>
    </div>
  );
}
