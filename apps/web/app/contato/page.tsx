import { SiteShell } from "@/components/site-shell";
import { SectionHeading } from "@/components/section-heading";
import { ContactForm } from "@/components/public-forms";
import { siteConfig } from "@/lib/site";

export default function ContatoPage() {
  return (
    <SiteShell>
      <section className="container-shell py-10">
        <div className="grid gap-6 lg:grid-cols-[1fr_1.05fr]">
          <div className="panel p-6 sm:p-8">
            <SectionHeading title="Contato" subtitle="Fale com o time comercial/técnico e descreva sua necessidade. O lead entra no painel e aciona a automação." />
            <div className="space-y-4 text-sm text-muted">
              <p>Email: {siteConfig.email}</p>
              {siteConfig.units.map((unit) => (
                <div key={unit.city} className="rounded-2xl border border-line bg-white/5 p-4">
                  <h3 className="font-semibold text-white">{unit.city}</h3>
                  <p>{unit.address}</p>
                  <p>{unit.phone}</p>
                </div>
              ))}
            </div>
          </div>
          <ContactForm />
        </div>
      </section>
    </SiteShell>
  );
}
