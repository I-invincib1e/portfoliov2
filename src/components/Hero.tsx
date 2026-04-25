import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from 'react-router-dom';
import { fetchAvailability } from '../lib/supabase';

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [availMsg, setAvailMsg] = useState('Available for select Q3 collaborations');

  useEffect(() => {
    fetchAvailability().then(a => { if (a?.message) setAvailMsg(a.message); });
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>('.hero-mask').forEach((el, i) => {
        const inner = el.querySelector('span');
        gsap.fromTo(inner, { yPercent: 110 }, {
          yPercent: 0,
          duration: 1.1,
          delay: 0.1 + i * 0.08,
          ease: 'expo.out',
        });
      });
      gsap.fromTo('.hero-fade', { opacity: 0, y: 16 }, {
        opacity: 1, y: 0, duration: 1, delay: 0.6, stagger: 0.08, ease: 'power2.out',
      });

      gsap.to('.hero-strip', {
        xPercent: -50,
        duration: 40,
        ease: 'none',
        repeat: -1,
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={ref}
      style={{
        minHeight: '100vh',
        position: 'relative',
        paddingTop: '120px',
        paddingBottom: '60px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        background: 'var(--paper)',
      }}
    >
      <div className="container-ed">
        <div className="hero-fade" style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16, marginBottom: 28 }}>
          <div className="eyebrow">Portfolio / 2026 Edition</div>
          <span className="pill"><span className="dot" />{availMsg}</span>
        </div>

        <h1
          style={{
            fontSize: 'clamp(3.2rem, 13vw, 14rem)',
            lineHeight: 0.92,
            letterSpacing: '-0.04em',
            margin: 0,
          }}
        >
          <div className="mask hero-mask" style={{ display: 'block' }}>
            <span style={{ fontWeight: 300 }}>Frontend</span>
          </div>
          <div className="mask hero-mask" style={{ display: 'block' }}>
            <span style={{ fontStyle: 'italic', fontWeight: 400 }}>
              craft<span style={{ color: 'var(--ember)' }}>,</span>
            </span>
          </div>
          <div className="mask hero-mask" style={{ display: 'block', textAlign: 'right' }}>
            <span style={{ fontWeight: 500 }}>
              for the AI<span style={{ color: 'var(--ember)' }}>—</span>era.
            </span>
          </div>
        </h1>
      </div>

      <div className="container-ed hero-fade" style={{ marginTop: 60 }}>
        <div className="editorial-grid">
          <div style={{ gridColumn: 'span 4' }}>
            <div className="hairline" style={{ marginBottom: 14 }}>About</div>
            <p style={{
              fontFamily: 'var(--font-sans)',
              fontSize: 16,
              color: 'var(--ink-soft)',
              maxWidth: 380,
              lineHeight: 1.55,
            }}>
              Rushikesh Pawar — an aspiring frontend engineer designing
              <em> calm, kinetic interfaces</em> at the intersection of React,
              TypeScript and large language models. Based out of Mumbai, working worldwide.
            </p>
          </div>

          <div style={{ gridColumn: 'span 4' }}>
            <div className="hairline" style={{ marginBottom: 14 }}>Currently</div>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--ink-soft)', lineHeight: 1.9, letterSpacing: '0.04em' }}>
              <li>· Shipping LLM-driven tools with LangChain & Groq</li>
              <li>· Refining a typographic UI system in React + Tailwind</li>
              <li>· Reading: <em>Designing Programmes</em>, K. Gerstner</li>
            </ul>
          </div>

          <div style={{ gridColumn: 'span 4', display: 'flex', flexDirection: 'column', alignItems: 'flex-end', justifyContent: 'flex-end', gap: 14 }}>
            <Link to="/projects" className="btn-ink" data-magnetic>
              Selected Work <span aria-hidden>→</span>
            </Link>
            <Link to="/contact" className="ed-link" style={{ fontSize: 13 }}>
              Or start a conversation
            </Link>
          </div>
        </div>
      </div>

      <div style={{
        marginTop: 80,
        borderTop: '1px solid var(--rule)',
        borderBottom: '1px solid var(--rule)',
        overflow: 'hidden',
        padding: '24px 0',
      }}>
        <div className="hero-strip" style={{ display: 'flex', whiteSpace: 'nowrap', gap: 48, willChange: 'transform' }}>
          {Array.from({ length: 2 }).map((_, k) => (
            <div key={k} style={{ display: 'flex', gap: 48, paddingRight: 48 }}>
              {['React', 'TypeScript', 'Tailwind', 'GSAP', 'Supabase', 'LangChain', 'Groq', 'Next.js', 'Framer Motion', 'Python'].map(t => (
                <span key={t} style={{
                  fontFamily: 'var(--font-display)',
                  fontStyle: 'italic',
                  fontSize: 'clamp(2rem, 5vw, 3.5rem)',
                  letterSpacing: '-0.02em',
                  color: 'var(--ink)',
                }}>
                  {t} <span style={{ color: 'var(--ember)' }}>✦</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
