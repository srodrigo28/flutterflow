"use client";

import { motion, useReducedMotion } from "motion/react";
import type { Transition } from "motion/react";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import bankImage from "../vendas/Bank.png";
import crudImage from "../vendas/crud.png";
import barberImage from "../vendas/image.png";
import loginImage from "../vendas/login.png";

const DAY_IN_SECONDS = 24 * 60 * 60;
const OFFER_STORAGE_KEY = "flutterflow-offer-start";
const checkoutUrl = "https://pay.kiwify.com.br/3kg3E2k";

const projects = [
  {
    title: "Login profissional",
    description: "Cadastro, entrada e primeira experiência do usuário.",
    image: loginImage,
  },
  {
    title: "CRUD completo",
    description: "Telas para criar, editar, validar e gerenciar dados.",
    image: crudImage,
  },
  {
    title: "App estilo banco",
    description: "Interface mobile com visual forte para portfólio.",
    image: bankImage,
  },
];

const benefits = [
  "Do zero, sem presumir experiência anterior.",
  "Projetos práticos para aprender construindo.",
  "Contato direto com o professor pelo WhatsApp.",
  "Acesso vitalício e atualizações grátis por 1 ano.",
];

function getRemainingSeconds() {
  if (typeof window === "undefined") {
    return DAY_IN_SECONDS;
  }

  const now = Date.now();
  const saved = Number(window.localStorage.getItem(OFFER_STORAGE_KEY));
  const start = Number.isFinite(saved) && saved > 0 ? saved : now;

  if (!saved) {
    window.localStorage.setItem(OFFER_STORAGE_KEY, String(start));
  }

  return Math.max(DAY_IN_SECONDS - Math.floor((now - start) / 1000), 0);
}

function formatCountdown(totalSeconds: number) {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return [hours, minutes, seconds]
    .map((item) => String(item).padStart(2, "0"))
    .join(":");
}

function Countdown() {
  const [remaining, setRemaining] = useState(DAY_IN_SECONDS);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setRemaining(getRemainingSeconds());
    }, 1000);

    return () => window.clearInterval(timer);
  }, []);

  return (
    <div className="rounded-lg border border-emerald-400/25 bg-[#081712] p-4 shadow-lg shadow-emerald-950/20">
      <p className="text-xs font-black uppercase tracking-[0.18em] text-emerald-300">
        Bônus por 24 horas
      </p>
      <p className="mt-2 font-mono text-3xl font-black text-white">
        {formatCountdown(remaining)}
      </p>
      <p className="mt-2 text-sm leading-6 text-slate-300">
        Agende uma aula individual grátis. Valor normal: R$ 140.
      </p>
    </div>
  );
}

function FadeIn({
  children,
  className = "",
  id,
}: {
  children: React.ReactNode;
  className?: string;
  id?: string;
}) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.section
      className={className}
      id={id}
      initial={reduceMotion ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.45, ease: "easeOut" }}
    >
      {children}
    </motion.section>
  );
}

export default function SalesPage() {
  const reduceMotion = useReducedMotion();
  const heroTransition = useMemo<Transition>(
    () => ({ duration: reduceMotion ? 0 : 0.55, ease: "easeOut" }),
    [reduceMotion],
  );

  return (
    <main className="min-h-screen bg-[#05070d] text-white">
      <header className="sticky top-0 z-20 border-b border-white/10 bg-[#060b10]/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3">
          <span className="text-sm font-black uppercase tracking-[0.16em] text-emerald-300">
            FlutterFlow Starter
          </span>
          <a
            href={checkoutUrl}
            className="rounded-lg bg-emerald-500 px-4 py-2 text-sm font-black text-white shadow-lg shadow-emerald-950/30 transition hover:bg-emerald-400"
          >
            Comprar por R$ 119
          </a>
        </div>
      </header>

      <section className="bg-[#07110f]">
        <div className="mx-auto grid max-w-6xl gap-8 px-5 py-12 md:grid-cols-[1.05fr_0.95fr] md:items-center md:py-16">
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={heroTransition}
          >
            <p className="text-sm font-black uppercase tracking-[0.18em] text-emerald-300">
              Curso para iniciantes
            </p>
            <h1 className="mt-4 max-w-3xl text-4xl font-black leading-[1.02] text-white sm:text-5xl lg:text-6xl">
              Aprenda FlutterFlow do zero e publique seus primeiros apps.
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-300">
              Um curso vitalício, direto ao ponto, com projetos reais e um
              professor que ama programação ensinando passo a passo.
            </p>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <a
                href={checkoutUrl}
                className="inline-flex min-h-13 items-center justify-center rounded-lg bg-emerald-500 px-6 text-base font-black text-white shadow-lg shadow-emerald-950/30 transition hover:-translate-y-0.5 hover:bg-emerald-400"
              >
                Comprar agora e garantir a aula grátis
              </a>
              <a
                href="#video"
                className="inline-flex min-h-13 items-center justify-center rounded-lg border border-white/20 bg-white/5 px-6 text-base font-black text-white transition hover:border-emerald-300 hover:bg-white/10"
              >
                Ver apresentação
              </a>
            </div>

            <div className="mt-7 grid gap-3 sm:grid-cols-2">
              {benefits.map((benefit) => (
                <div
                  key={benefit}
                  className="rounded-lg border border-white/10 bg-[#0b171c] p-4 text-sm font-bold leading-6 text-slate-200 shadow-sm"
                >
                  {benefit}
                </div>
              ))}
            </div>
          </motion.div>

          <motion.aside
            initial={reduceMotion ? false : { opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ ...heroTransition, delay: 0.08 }}
            className="rounded-lg border border-white/10 bg-[#0b1118] p-5 shadow-2xl shadow-black/30"
          >
            <div className="overflow-hidden rounded-lg bg-[#02040a]">
              <Image
                src={barberImage}
                alt="Projeto mobile desenvolvido no FlutterFlow"
                className="h-auto w-full object-contain"
                priority
              />
            </div>
            <div className="mt-5">
              <p className="text-sm font-black uppercase tracking-[0.18em] text-emerald-300">
                Oferta de lançamento
              </p>
              <div className="mt-2 flex items-end gap-3">
                <span className="text-5xl font-black text-white">R$ 119</span>
                <span className="pb-2 text-sm font-bold text-slate-400">
                  acesso vitalício
                </span>
              </div>
              <p className="mt-3 text-base leading-7 text-slate-300">
                Atualizações grátis por todo o ano e aula individual grátis nas
                primeiras 24 horas.
              </p>
            </div>
            <div className="mt-5">
              <Countdown />
            </div>
          </motion.aside>
        </div>
      </section>

      <FadeIn className="bg-[#0b1220] py-12" id="video">
        <div className="mx-auto grid max-w-6xl gap-8 px-5 md:grid-cols-[1.05fr_0.95fr] md:items-center">
          <div className="aspect-video overflow-hidden rounded-lg border border-white/10 bg-black shadow-2xl shadow-black/25">
            <iframe
              className="h-full w-full"
              src="https://www.youtube.com/embed/syskoNXbua4"
              title="Apresentação do curso de FlutterFlow"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
          </div>
          <div>
            <p className="text-sm font-black uppercase tracking-[0.18em] text-cyan-300">
              Estratégia da página
            </p>
            <h2 className="mt-3 text-3xl font-black leading-tight text-white sm:text-4xl">
              Simples, curta e focada na decisão.
            </h2>
            <p className="mt-4 text-lg leading-8 text-slate-300">
              A pessoa entende o que vai aprender, vê projetos reais, percebe o
              bônus limitado e tem um caminho claro para comprar agora.
            </p>
          </div>
        </div>
      </FadeIn>

      <FadeIn className="bg-[#09090b] py-12">
        <div className="mx-auto max-w-6xl px-5">
          <div className="max-w-2xl">
            <p className="text-sm font-black uppercase tracking-[0.18em] text-emerald-300">
              Projetos do curso
            </p>
            <h2 className="mt-3 text-3xl font-black leading-tight text-white sm:text-4xl">
              Aprenda criando telas que parecem produto de verdade.
            </h2>
          </div>

          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {projects.map((project) => (
              <article
                key={project.title}
                className="rounded-lg border border-white/10 bg-[#05070d] p-4 shadow-xl shadow-black/25"
              >
                <div className="relative mx-auto aspect-[9/16] max-h-[360px] overflow-hidden rounded-lg bg-black">
                  <Image
                    src={project.image}
                    alt={`Captura do projeto ${project.title}`}
                    fill
                    sizes="(min-width: 768px) 30vw, 90vw"
                    className="object-contain"
                  />
                </div>
                <h3 className="mt-4 text-xl font-black text-white">
                  {project.title}
                </h3>
                <p className="mt-2 text-base leading-7 text-slate-300">
                  {project.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </FadeIn>

      <FadeIn className="bg-[#03140f] py-12 text-white">
        <div className="mx-auto grid max-w-6xl gap-8 px-5 md:grid-cols-[0.9fr_1.1fr] md:items-center">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.18em] text-emerald-300">
              Professor presente
            </p>
            <h2 className="mt-3 text-3xl font-black leading-tight text-white sm:text-4xl">
              Você não compra e fica sozinho.
            </h2>
          </div>
          <div>
            <p className="text-lg leading-8 text-slate-300">
              Após a compra, você terá contato direto com o professor pelo
              WhatsApp para começar do jeito certo, tirar dúvidas e avançar nos
              projetos com mais segurança. Na oferta de lançamento, você ainda
              garante uma aula particular remota como brinde 100% grátis.
            </p>
            <a
              href={checkoutUrl}
              className="mt-6 inline-flex min-h-13 items-center justify-center rounded-lg bg-emerald-500 px-6 text-base font-black text-white shadow-lg shadow-emerald-950/30 transition hover:bg-emerald-400"
            >
              Comprar e garantir minha aula particular
            </a>
          </div>
        </div>
      </FadeIn>

      <div className="fixed inset-x-0 bottom-0 z-30 border-t border-white/10 bg-[#05070d]/95 p-3 shadow-2xl backdrop-blur md:hidden">
        <a
          href={checkoutUrl}
          className="flex min-h-12 items-center justify-center rounded-lg bg-emerald-500 px-4 text-center text-sm font-black text-white"
        >
          Comprar e garantir aula grátis
        </a>
      </div>
    </main>
  );
}
