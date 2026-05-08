import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';

const links = [
  { to: '/', label: 'Index', num: '01' },
  { to: '/projects', label: 'Work', num: '02' },
  { to: '/logs', label: 'Build Logs', num: '03' },
  { to: '/journal', label: 'Field Notes', num: '04' },
  { to: '/certifications', label: 'Archive', num: '05' },
  { to: '/contact', label: 'Contact', num: '06' },
];

const Navbar = () => {
  const { theme, toggleTheme } = useTheme();
  const [open, setOpen] = useState(false);
  const [time, setTime] = useState('');
  const loc = useLocation();

  useEffect(() => {
    const tick = () => {
      const f = new Date().toLocaleTimeString('en-US', {
        timeZone: 'Asia/Kolkata', hour: '2-digit', minute: '2-digit', hour12: false,
      });
      setTime(f);
    };
    tick();
    const id = setInterval(tick, 30000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => { setOpen(false); }, [loc.pathname]);

  return (
    <>
      <header
        className="nav-root"
        style={{
          position: 'fixed',
          top: 0, left: 0, right: 0,
          zIndex: 50,
          padding: '20px 32px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mixBlendMode: 'difference',
          color: '#efe9df',
          pointerEvents: 'none',
          gap: 12,
        }}
      >
        <Link to="/" style={{ pointerEvents: 'auto', textDecoration: 'none', color: 'inherit' }}>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: 22, lineHeight: 1, letterSpacing: '-0.02em' }}>
            Rushikesh<span style={{ color: '#e26a3d' }}>.</span>
          </div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, textTransform: 'uppercase', letterSpacing: '0.22em', opacity: 0.7 }}>
            AI Product Engineer
          </div>
        </Link>

        <nav className="desktop-nav" style={{ pointerEvents: 'auto' }}>
          {links.map(l => (
            <NavLink
              key={l.to}
              to={l.to}
              style={({ isActive }) => ({
                fontFamily: 'var(--font-mono)',
                fontSize: 11,
                textTransform: 'uppercase',
                letterSpacing: '0.2em',
                color: 'inherit',
                textDecoration: 'none',
                opacity: isActive ? 1 : 0.7,
                display: 'inline-flex',
                gap: 8,
              })}
            >
              <span style={{ opacity: 0.55 }}>{l.num}</span>
              <span>{l.label}</span>
            </NavLink>
          ))}
        </nav>

        <div style={{ display: 'flex', alignItems: 'center', gap: 14, pointerEvents: 'auto' }}>
          <span className="tabular hide-sm" style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.2em' }}>
            BOM — {time}
          </span>
          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            style={{
              background: 'transparent',
              border: '1px solid currentColor',
              color: 'inherit',
              borderRadius: 999,
              padding: '6px 12px',
              fontFamily: 'var(--font-mono)',
              fontSize: 10,
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              cursor: 'pointer',
            }}
          >
            {theme === 'dark' ? 'Day' : 'Night'}
          </button>
          <button
            onClick={() => setOpen(o => !o)}
            className="mobile-menu-btn"
            style={{
              background: 'transparent',
              border: '1px solid currentColor',
              color: 'inherit',
              borderRadius: 999,
              padding: '6px 12px',
              fontFamily: 'var(--font-mono)',
              fontSize: 10,
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              cursor: 'pointer',
            }}
          >
            {open ? 'Close' : 'Menu'}
          </button>
        </div>
      </header>

      <style>{`
        .desktop-nav { display: none; gap: 32px; }
        .mobile-menu-btn { display: inline-flex; }
        @media (min-width: 900px) {
          .desktop-nav { display: flex; }
          .mobile-menu-btn { display: none; }
        }
        @media (max-width: 600px) { .hide-sm { display: none; } }
        @media (max-width: 520px) {
          .nav-root { padding: 14px 18px !important; }
          .nav-root [aria-label="Toggle theme"] { display: none; }
        }
      `}</style>

      {open && (
        <div
          style={{
            position: 'fixed', inset: 0, zIndex: 49,
            background: 'var(--ink)', color: 'var(--paper)',
            display: 'flex', flexDirection: 'column',
            justifyContent: 'center', alignItems: 'flex-start',
            padding: '0 32px', gap: 12,
          }}
        >
          {links.map(l => (
            <Link
              key={l.to}
              to={l.to}
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(2.5rem, 9vw, 5rem)',
                color: 'inherit',
                textDecoration: 'none',
                fontStyle: 'italic',
                lineHeight: 1.05,
              }}
            >
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, fontStyle: 'normal', marginRight: 16, opacity: 0.6 }}>
                {l.num}
              </span>
              {l.label}
            </Link>
          ))}
        </div>
      )}
    </>
  );
};

export default Navbar;
