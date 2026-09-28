import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({ component: Home });

const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Contact", href: "#contact" },
];

const SERVICES = [
  {
    icon: "🎨",
    title: "Web Design",
    desc: "Modern, beautiful and responsive websites designed with your brand in mind.",
  },
  {
    icon: "🚀",
    title: "Development",
    desc: "Fast, reliable web apps built with the latest technologies.",
  },
  {
    icon: "📈",
    title: "SEO & Marketing",
    desc: "Get found online and grow your audience with smart digital strategies.",
  },
];

const STATS = [
  { value: "120+", label: "Projects" },
  { value: "98%", label: "Happy Clients" },
  { value: "5+", label: "Years Experience" },
  { value: "24/7", label: "Support" },
];

function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) return;
    setSent(true);
    setForm({ name: "", email: "", message: "" });
    setTimeout(() => setSent(false), 4000);
  };

  return (
    <main id="home" className="min-h-screen bg-slate-950 text-slate-100">
      {/* Navbar */}
      <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-slate-950/80 backdrop-blur">
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <a href="#home" className="text-xl font-bold tracking-tight">
            My<span className="text-indigo-400">Site</span>
          </a>
          <div className="hidden items-center gap-8 md:flex">
            {NAV_LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="text-sm font-medium text-slate-300 transition hover:text-white"
              >
                {l.label}
              </a>
            ))}
            <a
              href="#contact"
              className="rounded-full bg-indigo-500 px-5 py-2 text-sm font-semibold text-white shadow-lg shadow-indigo-500/30 transition hover:bg-indigo-400"
            >
              Get Started
            </a>
          </div>
          <button
            aria-label="Toggle menu"
            onClick={() => setMenuOpen((o) => !o)}
            className="rounded-md p-2 text-slate-300 hover:bg-white/10 md:hidden"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              {menuOpen ? (
                <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
              ) : (
                <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
              )}
            </svg>
          </button>
        </nav>
        {menuOpen && (
          <div className="border-t border-white/10 bg-slate-950 px-6 py-4 md:hidden">
            {NAV_LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setMenuOpen(false)}
                className="block py-2 text-sm font-medium text-slate-300 hover:text-white"
              >
                {l.label}
              </a>
            ))}
          </div>
        )}
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden pt-40 pb-24">
        <div className="pointer-events-none absolute -top-32 left-1/2 h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-indigo-600/20 blur-3xl" />
        <div className="relative mx-auto max-w-6xl px-6 text-center">
          <span className="mb-6 inline-block rounded-full border border-indigo-400/30 bg-indigo-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-indigo-300">
            Welcome to MySite
          </span>
          <h1 className="text-4xl font-extrabold leading-tight tracking-tight sm:text-6xl">
            Build something{" "}
            <span className="bg-gradient-to-r from-indigo-400 via-sky-400 to-emerald-400 bg-clip-text text-transparent">
              amazing
            </span>{" "}
            together
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-400">
            We craft modern websites and digital experiences that help your
            business stand out, grow faster and reach more people.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a
              href="#services"
              className="w-full rounded-full bg-indigo-500 px-8 py-3.5 text-sm font-semibold text-white shadow-lg shadow-indigo-500/30 transition hover:bg-indigo-400 sm:w-auto"
            >
              Explore Services
            </a>
            <a
              href="#contact"
              className="w-full rounded-full border border-white/15 px-8 py-3.5 text-sm font-semibold text-slate-200 transition hover:bg-white/10 sm:w-auto"
            >
              Contact Us
            </a>
          </div>

          {/* Stats */}
          <div className="mx-auto mt-20 grid max-w-3xl grid-cols-2 gap-6 sm:grid-cols-4">
            {STATS.map((s) => (
              <div key={s.label} className="rounded-2xl border border-white/10 bg-white/5 p-6">
                <div className="text-3xl font-bold text-white">{s.value}</div>
                <div className="mt-1 text-xs font-medium uppercase tracking-wide text-slate-400">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="border-t border-white/10 py-24 scroll-mt-20">
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-6 md:grid-cols-2">
          <div>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              About <span className="text-indigo-400">Us</span>
            </h2>
            <p className="mt-6 leading-relaxed text-slate-400">
              We are a passionate team dedicated to creating high-quality
              digital products. From simple landing pages to complex web
              applications, we combine clean design with solid engineering to
              deliver results that matter.
            </p>
            <ul className="mt-6 space-y-3">
              {[
                "Responsive design on every device",
                "Fast performance & modern stack",
                "Friendly, reliable support",
              ].map((item) => (
                <li key={item} className="flex items-center gap-3 text-slate-300">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400">
                    ✓
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="relative">
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-tr from-indigo-600/30 to-emerald-500/30 blur-2xl" />
            <div className="relative grid grid-cols-2 gap-4 rounded-3xl border border-white/10 bg-white/5 p-6">
              {["💡", "⚡", "🛠️", "🤝"].map((emoji, i) => (
                <div
                  key={i}
                  className="flex aspect-square items-center justify-center rounded-2xl bg-slate-900/60 text-5xl"
                >
                  {emoji}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="border-t border-white/10 py-24 scroll-mt-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Our <span className="text-indigo-400">Services</span>
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-slate-400">
              Everything you need to launch and grow your online presence.
            </p>
          </div>
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {SERVICES.map((s) => (
              <div
                key={s.title}
                className="group rounded-3xl border border-white/10 bg-white/5 p-8 transition hover:-translate-y-1 hover:border-indigo-400/40 hover:bg-white/10"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-500/15 text-3xl">
                  {s.icon}
                </div>
                <h3 className="mt-6 text-xl font-semibold">{s.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-400">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="border-t border-white/10 py-24 scroll-mt-20">
        <div className="mx-auto max-w-2xl px-6">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Get in <span className="text-indigo-400">Touch</span>
            </h2>
            <p className="mt-4 text-slate-400">
              Have a project in mind? Send us a message!
            </p>
          </div>
          <form onSubmit={handleSubmit} className="mt-10 space-y-5">
            <div className="grid gap-5 sm:grid-cols-2">
              <input
                type="text"
                placeholder="Your name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:border-indigo-400 focus:outline-none"
              />
              <input
                type="email"
                placeholder="Your email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:border-indigo-400 focus:outline-none"
              />
            </div>
            <textarea
              rows={5}
              placeholder="Your message"
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              className="w-full resize-none rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:border-indigo-400 focus:outline-none"
            />
            <button
              type="submit"
              className="w-full rounded-xl bg-indigo-500 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-indigo-500/30 transition hover:bg-indigo-400"
            >
              Send Message
            </button>
            {sent && (
              <p className="text-center text-sm font-medium text-emerald-400">
                ✅ Thank you! Your message has been sent.
              </p>
            )}
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 py-10">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 text-sm text-slate-500 sm:flex-row">
          <span>© {new Date().getFullYear()} MySite. All rights reserved.</span>
          <div className="flex gap-6">
            {NAV_LINKS.map((l) => (
              <a key={l.href} href={l.href} className="transition hover:text-slate-300">
                {l.label}
              </a>
            ))}
          </div>
        </div>
      </footer>
    </main>
  );
}
