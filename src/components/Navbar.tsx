import React, { useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { Menu, X } from 'lucide-react';
import styled from 'styled-components';
import ThemeSwitch from './ThemeSwitch';
import { useTheme } from '../context/ThemeContext';
import { Link, useLocation } from 'react-router-dom';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const { theme } = useTheme();
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  useEffect(() => {
    // Animate navbar items on initial load
    gsap.fromTo(
      '.nav-item',
      { y: -20, opacity: 0 },
      { 
        y: 0, 
        opacity: 1, 
        stagger: 0.1, 
        duration: 0.8, 
        ease: 'power2.out',
        delay: 0.5
      }
    );

    // Handle navbar background change on scroll
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    // Track active section on scroll
    const handleSectionObserver = () => {
      if (!isHomePage) return;
      
      const sections = document.querySelectorAll('section[id]');
      const scrollY = window.scrollY;
      
      sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = (section as HTMLElement).offsetTop - 100;
        const sectionId = section.getAttribute('id') || '';
        
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
          setActiveSection(sectionId);
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('scroll', handleSectionObserver);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('scroll', handleSectionObserver);
    };
  }, [isHomePage]);

  // Update active section based on current route
  useEffect(() => {
    if (location.pathname === '/contact') {
      setActiveSection('contact');
    } else if (location.pathname === '/projects') {
      setActiveSection('projects');
    } else if (location.pathname === '/') {
      // When back on homepage, try to detect the current section
      const sections = document.querySelectorAll('section[id]');
      const scrollY = window.scrollY;
      
      let foundSection = false;
      sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = (section as HTMLElement).offsetTop - 100;
        const sectionId = section.getAttribute('id') || '';
        
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
          setActiveSection(sectionId);
          foundSection = true;
        }
      });
      
      if (!foundSection) {
        setActiveSection('home');
      }
    }
  }, [location.pathname]);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleNavigation = (sectionId: string) => {
    setMobileMenuOpen(false);
    
    if (location.pathname !== '/' && sectionId !== 'contact' && sectionId !== 'projects') {
      // Will navigate to homepage first, then scroll
      setActiveSection(sectionId);
    }
  };

  return (
    <Header 
      className={isScrolled ? 'scrolled' : ''}
      data-theme={theme}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Logo 
          as={Link}
          to="/" 
          className="nav-item text-heading"
        >
          Rushi<span className="dot">.</span>
        </Logo>

        {/* Desktop Navigation */}
        <DesktopNav>
          <NavLinks>
            <NavItem
              as={Link}
              to="/"
              className={`nav-item text-accent ${activeSection === 'home' ? 'active' : ''}`}
              onClick={() => handleNavigation('home')}
            >
              Home
            </NavItem>
            
            {isHomePage ? (
              <>
                <NavItem
                  as="a"
                  href="#about"
                  className={`nav-item text-accent ${activeSection === 'about' ? 'active' : ''}`}
                >
                  About
                </NavItem>
                <NavItem
                  as="a"
                  href="#work"
                  className={`nav-item text-accent ${activeSection === 'work' ? 'active' : ''}`}
                >
                  Work
                </NavItem>
              </>
            ) : (
              <>
                <NavItem
                  as={Link}
                  to="/#about"
                  className={`nav-item text-accent ${activeSection === 'about' ? 'active' : ''}`}
                  onClick={() => handleNavigation('about')}
                >
                  About
                </NavItem>
                <NavItem
                  as={Link}
                  to="/#work"
                  className={`nav-item text-accent ${activeSection === 'work' ? 'active' : ''}`}
                  onClick={() => handleNavigation('work')}
                >
                  Work
                </NavItem>
              </>
            )}
            
            <NavItem
              as={Link}
              to="/projects"
              className={`nav-item text-accent ${activeSection === 'projects' ? 'active' : ''}`}
              onClick={() => handleNavigation('projects')}
            >
              Projects
            </NavItem>
            
            <NavItem
              as={Link}
              to="/contact"
              className={`nav-item text-accent ${activeSection === 'contact' ? 'active' : ''}`}
              onClick={() => handleNavigation('contact')}
            >
              Contact
            </NavItem>
          </NavLinks>
          <ThemeSwitchWrapper className="nav-item">
            <ThemeSwitch />
          </ThemeSwitchWrapper>
        </DesktopNav>

        {/* Mobile Menu Button */}
        <MobileMenuButton 
          className="md:hidden text-dark-50 focus:outline-none nav-item"
          onClick={toggleMobileMenu}
          aria-label="Toggle mobile menu"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </MobileMenuButton>
      </div>

      {/* Mobile Menu */}
      <MobileMenu 
        className={mobileMenuOpen ? 'open' : ''}
        data-theme={theme}
      >
        <div className="container mx-auto px-4 flex flex-col space-y-4">
          <MobileNavItem
            as={Link}
            to="/"
            className={`${activeSection === 'home' ? 'active' : ''}`}
            onClick={() => handleNavigation('home')}
          >
            Home
          </MobileNavItem>
          
          {isHomePage ? (
            <>
              <MobileNavItem
                as="a"
                href="#about"
                className={`${activeSection === 'about' ? 'active' : ''}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                About
              </MobileNavItem>
              <MobileNavItem
                as="a"
                href="#work"
                className={`${activeSection === 'work' ? 'active' : ''}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Work
              </MobileNavItem>
            </>
          ) : (
            <>
              <MobileNavItem
                as={Link}
                to="/#about"
                className={`${activeSection === 'about' ? 'active' : ''}`}
                onClick={() => handleNavigation('about')}
              >
                About
              </MobileNavItem>
              <MobileNavItem
                as={Link}
                to="/#work"
                className={`${activeSection === 'work' ? 'active' : ''}`}
                onClick={() => handleNavigation('work')}
              >
                Work
              </MobileNavItem>
            </>
          )}
          
          <MobileNavItem
            as={Link}
            to="/projects"
            className={`${activeSection === 'projects' ? 'active' : ''}`}
            onClick={() => handleNavigation('projects')}
          >
            Projects
          </MobileNavItem>
          
          <MobileNavItem
            as={Link}
            to="/contact"
            className={`${activeSection === 'contact' ? 'active' : ''}`}
            onClick={() => handleNavigation('contact')}
          >
            Contact
          </MobileNavItem>
          
          <div className="py-2">
            <ThemeSwitch />
          </div>
        </div>
      </MobileMenu>
    </Header>
  );
};

const Header = styled.header`
  position: fixed;
  top: 1.5rem;
  left: 50%;
  transform: translateX(-50%);
  width: calc(100% - 3rem);
  max-width: 1200px;
  z-index: 50;
  transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
  padding: 0.75rem 1rem;
  background: rgba(2, 6, 23, 0.85);
  backdrop-filter: blur(12px);
  border-radius: 1rem;
  border: 1px solid rgba(51, 65, 85, 0.2);
  
  &.scrolled {
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  }
  
  &[data-theme="light"] {
    background-color: rgba(244, 248, 211, 0.85);
    box-shadow: 0 4px 20px rgba(142, 125, 190, 0.15);
    border: 1px solid rgba(166, 214, 214, 0.4);
  }
  
  @media (min-width: 640px) {
    padding: 1rem 1.5rem;
    width: calc(100% - 2rem);
  }
  
  @media (max-width: 375px) {
    width: calc(100% - 1rem);
    top: 0.5rem;
    border-radius: 0.75rem;
  }
`;

const Logo = styled(Link)`
  font-size: 1.2rem;
  font-weight: 500;
  color: var(--text-color, #f8fafc);
  text-decoration: none;
  letter-spacing: -0.02em;
  position: relative;
  transition: transform 0.3s ease;
  display: inline-block;
  
  @media (min-width: 640px) {
    font-size: 1.5rem;
  }
  
  &:hover {
    transform: translateY(-2px);
  }
  
  .dot {
    color: var(--accent-500, #f97316);
  }
  
  [data-theme="light"] & .dot {
    color: var(--light-lavender, #8E7DBE);
  }
`;

const DesktopNav = styled.nav`
  display: none;
  align-items: center;
  gap: 2rem;
  
  @media (min-width: 768px) {
    display: flex;
  }
`;

const NavLinks = styled.div`
  display: flex;
  gap: 2.5rem;
  
  @media (min-width: 768px) and (max-width: 1024px) {
    gap: 1.5rem;
  }
`;

const NavItem = styled.a`
  position: relative;
  font-size: 0.9rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--text-color, #f8fafc);
  text-decoration: none;
  transition: color 0.3s ease;
  padding: 0.5rem 0;
  white-space: nowrap;
  font-weight: 500;
  
  &:after {
    content: '';
    position: absolute;
    width: 0;
    height: 2px;
    bottom: 0;
    left: 0;
    background-color: var(--accent-500, #f97316);
    transition: width 0.3s ease;
  }
  
  &:hover, &.active {
    color: var(--accent-500, #f97316);
  }
  
  &:hover:after, &.active:after {
    width: 100%;
  }
  
  [data-theme="light"] & {
    color: #2d3748;
    
    &:after {
      background-color: var(--light-lavender, #8E7DBE);
    }
    
    &:hover, &.active {
      color: var(--light-lavender, #8E7DBE);
    }
  }
  
  @media (min-width: 768px) and (max-width: 1024px) {
    font-size: 0.8rem;
  }
`;

const ThemeSwitchWrapper = styled.div`
  margin-left: 1rem;
`;

const MobileMenuButton = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;
  
  @media (min-width: 768px) {
    display: none;
  }
  
  [data-theme="light"] & {
    color: #2d3748;
  }
`;

const MobileMenu = styled.div`
  display: none;
  background-color: rgba(15, 23, 42, 0.95);
  backdrop-filter: blur(12px);
  position: absolute;
  width: 100%;
  transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
  max-height: 0;
  opacity: 0;
  padding: 0;
  overflow: hidden;
  border-radius: 0 0 1rem 1rem;
  left: 0;
  
  &.open {
    display: block;
    max-height: 60vh;
    opacity: 1;
    padding: 1.5rem 0;
  }
  
  &[data-theme="light"] {
    background-color: rgba(244, 248, 211, 0.95);
  }
  
  @media (min-width: 768px) {
    display: none;
  }
`;

const MobileNavItem = styled.a`
  font-size: 1.2rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--text-color, #f8fafc);
  text-decoration: none;
  transition: color 0.3s ease;
  padding: 0.75rem 0;
  display: block;
  text-align: center;
  
  &:hover, &.active {
    color: var(--accent-500, #f97316);
  }
  
  [data-theme="light"] & {
    color: #2d3748;
    
    &:hover, &.active {
      color: var(--light-lavender, #8E7DBE);
    }
  }
`;

export default Navbar;