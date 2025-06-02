import React, { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import { useTheme } from '../context/ThemeContext';
import Footer from '../components/Footer';
import { ExternalLink, Github, Search, Code, Briefcase, Filter, TagsIcon, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { allProjects } from '../config/siteConfig';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const ProjectsPage: React.FC = () => {
  const { theme } = useTheme();
  const [filter, setFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredProjects, setFilteredProjects] = useState(allProjects);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const pageRef = useRef<HTMLDivElement>(null);
  const backgroundRef = useRef<HTMLDivElement>(null);
  
  // Extract all unique tags from projects
  const allTags = Array.from(
    new Set(
      allProjects.flatMap(project => project.tags)
    )
  ).sort();

  // Filter projects based on category, search query, and tags
  useEffect(() => {
    let result = allProjects;
    
    // Apply category filter
    if (filter === 'featured') {
      result = result.filter(project => project.featured);
    }
    
    // Apply search filter
    if (searchQuery.trim() !== '') {
      const query = searchQuery.toLowerCase().trim();
      result = result.filter(project => 
        project.title.toLowerCase().includes(query) || 
        project.description.toLowerCase().includes(query) ||
        project.tags.some(tag => tag.toLowerCase().includes(query))
      );
    }
    
    // Apply tag filters
    if (selectedTags.length > 0) {
      result = result.filter(project => 
        selectedTags.some(tag => project.tags.includes(tag))
      );
    }
    
    setFilteredProjects(result);
  }, [filter, searchQuery, selectedTags]);

  useEffect(() => {
    // Scroll to top when page loads
    window.scrollTo(0, 0);
    
    // Register GSAP plugins
    gsap.registerPlugin(ScrollTrigger);
    
    // Create floating background elements
    const createBackgroundElements = () => {
      if (!backgroundRef.current) return;
      
      // Create floating code symbols
      const symbols = ['{ }', '</>', '()', '[]', '/**/'];
      
      for (let i = 0; i < 8; i++) {
        const element = document.createElement('div');
        element.className = 'floating-code';
        element.textContent = symbols[i % symbols.length];
        
        const size = 24 + Math.random() * 16;
        element.style.cssText = `
          position: absolute;
          font-family: monospace;
          font-size: ${size}px;
          color: ${theme === 'dark' 
            ? 'rgba(249, 115, 22, 0.1)' 
            : 'rgba(142, 125, 190, 0.1)'};
          top: ${Math.random() * 100}%;
          left: ${Math.random() * 100}%;
          z-index: -1;
          opacity: 0.5;
          transform: rotate(${Math.random() * 40 - 20}deg);
        `;
        
        backgroundRef.current.appendChild(element);
        
        // Animate each element
        gsap.to(element, {
          y: Math.random() * 100 - 50,
          x: Math.random() * 100 - 50,
          rotation: `${Math.random() * 40 - 20}`,
          opacity: Math.random() * 0.3 + 0.2,
          duration: 15 + Math.random() * 15,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut"
        });
      }
    };
    
    // Hero section animations
    const animateHero = () => {
      const tl = gsap.timeline();
      
      tl.fromTo(".hero-title", 
        { opacity: 0, y: 50 }, 
        { opacity: 1, y: 0, duration: 0.8, ease: "back.out(1.4)" }
      )
      .fromTo(".hero-subtitle", 
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.7, ease: "power2.out" },
        "-=0.5"
      );
    };
    
    // Filter bar animation
    const animateFilters = () => {
      gsap.fromTo(".filter-element",
        { opacity: 0, y: 20 },
        { 
          opacity: 1, 
          y: 0, 
          stagger: 0.1, 
          duration: 0.6, 
          ease: "power2.out",
          delay: 0.3
        }
      );
    };
    
    // Project cards animation
    const animateProjects = () => {
      gsap.fromTo(".project-card",
        { opacity: 0, y: 30 },
        { 
          opacity: 1, 
          y: 0, 
          stagger: 0.1, 
          duration: 0.6, 
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".projects-grid",
            start: "top bottom-=100",
            toggleActions: "play none none none"
          }
        }
      );
    };
    
    // Initialize all animations
    createBackgroundElements();
    animateHero();
    animateFilters();
    animateProjects();
    
    // Cleanup function
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      
      // Clean up background elements
      if (backgroundRef.current) {
        backgroundRef.current.innerHTML = '';
      }
    };
  }, [theme]);

  const handleFilterChange = (newFilter: string) => {
    setFilter(newFilter);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };
  
  const toggleTag = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter(t => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };
  
  const clearFilters = () => {
    setFilter('all');
    setSearchQuery('');
    setSelectedTags([]);
  };

  return (
    <PageContainer ref={pageRef} data-theme={theme}>
      <BackgroundElements ref={backgroundRef} />
      
      <HeroSection data-theme={theme}>
        <HeroContent>
          <HeroTitle className="hero-title">
            My <GradientText data-theme={theme}>Projects</GradientText>
            <TitleDot data-theme={theme}>.</TitleDot>
          </HeroTitle>
          <HeroSubtitle className="hero-subtitle">
            A showcase of my coding journey, featuring web applications, AI integrations,
            and data analysis projects that demonstrate my skills and creativity.
          </HeroSubtitle>
        </HeroContent>
      </HeroSection>

      <ContentSection>
        <FiltersContainer className="filters-container" data-theme={theme}>
          <FilterSection>
            <FilterGroup className="filter-element">
              <FilterLabel data-theme={theme}>
                <Filter size={16} />
                <span>Filter by:</span>
              </FilterLabel>
              <FilterButtons>
                <FilterButton 
                  active={filter === 'all'} 
                  onClick={() => handleFilterChange('all')}
                  data-theme={theme}
                  className="filter-btn"
                >
                  All Projects
                </FilterButton>
                <FilterButton 
                  active={filter === 'featured'} 
                  onClick={() => handleFilterChange('featured')}
                  data-theme={theme}
                  className="filter-btn"
                >
                  Featured
                </FilterButton>
              </FilterButtons>
            </FilterGroup>
            
            <SearchContainer className="filter-element" data-theme={theme}>
              <SearchIconWrapper>
                <Search size={18} />
              </SearchIconWrapper>
              <SearchInput 
                type="text" 
                placeholder="Search projects..."
                value={searchQuery}
                onChange={handleSearchChange}
                data-theme={theme}
              />
              {searchQuery && (
                <ClearButton 
                  onClick={() => setSearchQuery('')}
                  data-theme={theme}
                >
                  &times;
                </ClearButton>
              )}
            </SearchContainer>
          </FilterSection>
          
          <TagsSection className="filter-element">
            <TagsHeader data-theme={theme}>
              <TagsIcon size={16} />
              <span>Filter by tags:</span>
              {(selectedTags.length > 0 || searchQuery || filter !== 'all') && (
                <ClearFiltersButton 
                  onClick={clearFilters}
                  data-theme={theme}
                >
                  Clear All Filters
                </ClearFiltersButton>
              )}
            </TagsHeader>
            <TagsContainer>
              {allTags.map(tag => (
                <TagBadge 
                  key={tag}
                  selected={selectedTags.includes(tag)}
                  onClick={() => toggleTag(tag)}
                  data-theme={theme}
                >
                  {tag}
                </TagBadge>
              ))}
            </TagsContainer>
          </TagsSection>
        </FiltersContainer>
        
        {filteredProjects.length === 0 ? (
          <NoResults data-theme={theme}>
            <Code size={48} />
            <h3>No projects found</h3>
            <p>Try adjusting your search criteria or clearing filters</p>
            <ClearFiltersButton 
              onClick={clearFilters}
              data-theme={theme}
              large
            >
              Clear All Filters
            </ClearFiltersButton>
          </NoResults>
        ) : (
          <ProjectsGrid className="projects-grid">
            {filteredProjects.map((project, index) => (
              <ProjectCard 
                key={index} 
                className="project-card"
                data-theme={theme}
              >
                <ProjectImageContainer>
                  <ProjectImage 
                    src={project.image} 
                    alt={project.title} 
                    loading="lazy" 
                  />
                  <ProjectOverlay>
                    <ProjectLinks>
                      <ProjectLink 
                        href={project.link} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        data-theme={theme}
                        title="View Live Demo"
                      >
                        <ExternalLink size={20} />
                      </ProjectLink>
                      {project.github && (
                        <ProjectLink 
                          href={project.github} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          data-theme={theme}
                          title="View Source Code"
                        >
                          <Github size={20} />
                        </ProjectLink>
                      )}
                    </ProjectLinks>
                  </ProjectOverlay>
                  {project.featured && (
                    <FeaturedBadge data-theme={theme}>
                      <Sparkles size={14} />
                      <span>Featured</span>
                    </FeaturedBadge>
                  )}
                </ProjectImageContainer>
                
                <ProjectContent>
                  <ProjectHeader>
                    <ProjectTitle data-theme={theme}>{project.title}</ProjectTitle>
                  </ProjectHeader>
                  
                  <ProjectDescription data-theme={theme}>
                    {project.description}
                  </ProjectDescription>
                  
                  <ProjectTags>
                    {project.tags.map((tag, idx) => (
                      <ProjectTag 
                        key={idx} 
                        data-theme={theme}
                        onClick={(e) => {
                          e.stopPropagation();
                          if (!selectedTags.includes(tag)) {
                            setSelectedTags([...selectedTags, tag]);
                          }
                        }}
                      >
                        {tag}
                      </ProjectTag>
                    ))}
                  </ProjectTags>
                </ProjectContent>
                
                <ProjectActions data-theme={theme}>
                  <ProjectButton 
                    as="a"
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-theme={theme}
                    primary
                  >
                    Live Demo
                    <ExternalLink size={14} />
                  </ProjectButton>
                  
                  {project.github && (
                    <ProjectButton 
                      as="a"
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      data-theme={theme}
                    >
                      <Github size={14} />
                      GitHub
                    </ProjectButton>
                  )}
                </ProjectActions>
              </ProjectCard>
            ))}
          </ProjectsGrid>
        )}
      </ContentSection>

      <Footer />
    </PageContainer>
  );
};

// Styled Components
const PageContainer = styled.div`
  min-height: 100vh;
  padding-top: 80px;
  position: relative;
  overflow-x: hidden;
  background: var(--dark-950, #020617);
  
  &[data-theme="light"] {
    background: #fcfcfc;
  }
  
  @media (max-width: 640px) {
    padding-top: 70px;
  }
`;

const BackgroundElements = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  pointer-events: none;
  z-index: 0;
`;

const HeroSection = styled.section`
  padding: 6rem 0 4rem;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 1px;
    background: linear-gradient(90deg, transparent, 
      rgba(249, 115, 22, 0.2), transparent);
  }
  
  &[data-theme="light"]::before {
    background: linear-gradient(90deg, transparent, 
      rgba(142, 125, 190, 0.2), transparent);
  }
`;

const HeroContent = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  padding: 0 2rem;
  text-align: center;
  position: relative;
  z-index: 1;
`;

const HeroTitle = styled.h1`
  font-size: clamp(2.5rem, 5vw, 4rem);
  font-weight: 200;
  margin-bottom: 1.5rem;
  color: var(--dark-50, #f8fafc);
  
  @media (max-width: 640px) {
    font-size: 2.5rem;
  }
`;

const GradientText = styled.span`
  background: ${props => props['data-theme'] === 'dark' 
    ? 'linear-gradient(135deg, #f97316, #ea580c)' 
    : 'linear-gradient(135deg, #8E7DBE, #7F8091)'};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  color: transparent;
  font-weight: 500;
`;

const TitleDot = styled.span`
  color: var(--accent-500, #f97316);
  
  &[data-theme="light"] {
    color: var(--light-lavender, #8E7DBE);
  }
`;

const HeroSubtitle = styled.p`
  font-size: 1.25rem;
  max-width: 700px;
  margin: 0 auto;
  color: var(--dark-300, #cbd5e1);
  line-height: 1.6;
  
  @media (max-width: 640px) {
    font-size: 1.125rem;
  }
  
  [data-theme="light"] & {
    color: #4a5568;
  }
`;

const ContentSection = styled.section`
  max-width: 1400px;
  margin: 0 auto;
  padding: 4rem 2rem;
  position: relative;
  z-index: 1;
  
  @media (max-width: 640px) {
    padding: 3rem 1rem;
  }
`;

const FiltersContainer = styled.div`
  background: rgba(30, 41, 59, 0.4);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(51, 65, 85, 0.3);
  border-radius: 1.25rem;
  padding: 1.5rem;
  margin-bottom: 3rem;
  
  &[data-theme="light"] {
    background: rgba(255, 255, 255, 0.8);
    border: 1px solid rgba(142, 125, 190, 0.2);
  }
`;

const FilterSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  gap: 1rem;
  
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;
  }
`;

const FilterGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  
  @media (max-width: 640px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }
`;

const FilterLabel = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 500;
  font-size: 0.875rem;
  color: var(--dark-200, #e2e8f0);
  white-space: nowrap;
  
  &[data-theme="light"] {
    color: #4a5568;
  }
`;

const FilterButtons = styled.div`
  display: flex;
  gap: 0.75rem;
`;

interface ActiveProps {
  active: boolean;
}

const FilterButton = styled.button<ActiveProps>`
  padding: 0.5rem 1.25rem;
  border-radius: 2rem;
  font-size: 0.875rem;
  font-weight: 500;
  transition: all 0.3s ease;
  cursor: pointer;
  background: ${props => props.active 
    ? 'var(--accent-500, #f97316)' 
    : 'rgba(51, 65, 85, 0.3)'};
  color: ${props => props.active 
    ? 'white' 
    : 'var(--dark-200, #e2e8f0)'};
  border: none;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: ${props => props.active 
      ? '0 6px 15px rgba(249, 115, 22, 0.3)' 
      : '0 6px 15px rgba(0, 0, 0, 0.1)'};
  }
  
  &[data-theme="light"] {
    background: ${props => props.active 
      ? 'var(--light-lavender, #8E7DBE)' 
      : 'rgba(255, 255, 255, 0.7)'};
    color: ${props => props.active 
      ? 'white' 
      : '#4a5568'};
    border: ${props => props.active 
      ? 'none' 
      : '1px solid rgba(142, 125, 190, 0.3)'};
    
    &:hover {
      background: ${props => props.active 
        ? 'var(--light-lavender, #8E7DBE)' 
        : 'rgba(255, 255, 255, 0.9)'};
      box-shadow: ${props => props.active 
        ? '0 6px 15px rgba(142, 125, 190, 0.3)' 
        : '0 6px 15px rgba(142, 125, 190, 0.1)'};
    }
  }
`;

const SearchContainer = styled.div`
  position: relative;
  width: 300px;
  
  @media (max-width: 768px) {
    width: 100%;
  }
  
  &[data-theme="light"] {
    color: #4a5568;
  }
`;

const SearchIconWrapper = styled.div`
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: var(--dark-400, #94a3b8);
  pointer-events: none;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 0.75rem 1rem 0.75rem 2.5rem;
  border-radius: 2rem;
  background: rgba(30, 41, 59, 0.5);
  border: 1px solid rgba(51, 65, 85, 0.3);
  color: var(--dark-50, #f8fafc);
  font-size: 0.875rem;
  transition: all 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: var(--accent-500, #f97316);
    box-shadow: 0 0 0 2px rgba(249, 115, 22, 0.2);
  }
  
  &::placeholder {
    color: var(--dark-400, #94a3b8);
  }
  
  &[data-theme="light"] {
    background: rgba(255, 255, 255, 0.8);
    border: 1px solid rgba(142, 125, 190, 0.3);
    color: #2d3748;
    
    &:focus {
      border-color: var(--light-lavender, #8E7DBE);
      box-shadow: 0 0 0 2px rgba(142, 125, 190, 0.2);
    }
    
    &::placeholder {
      color: #a0aec0;
    }
  }
`;

const ClearButton = styled.button`
  position: absolute;
  right: 1rem;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: var(--dark-400, #94a3b8);
  font-size: 1.5rem;
  cursor: pointer;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  
  &:hover {
    color: var(--dark-50, #f8fafc);
  }
  
  &[data-theme="light"] {
    color: #a0aec0;
    
    &:hover {
      color: #2d3748;
    }
  }
`;

const TagsSection = styled.div`
  border-top: 1px solid rgba(51, 65, 85, 0.3);
  padding-top: 1.5rem;
  
  [data-theme="light"] & {
    border-top-color: rgba(142, 125, 190, 0.2);
  }
`;

const TagsHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
  color: var(--dark-200, #e2e8f0);
  font-weight: 500;
  font-size: 0.875rem;
  
  &[data-theme="light"] {
    color: #4a5568;
  }
`;

interface LargeProps {
  large?: boolean;
}

const ClearFiltersButton = styled.button<LargeProps>`
  background: transparent;
  border: none;
  color: var(--accent-500, #f97316);
  font-size: ${props => props.large ? '1rem' : '0.75rem'};
  font-weight: 600;
  padding: ${props => props.large ? '0.75rem 1.5rem' : '0.25rem 0.75rem'};
  border-radius: 2rem;
  cursor: pointer;
  margin-left: auto;
  transition: all 0.3s ease;
  ${props => props.large && 'border: 1px solid var(--accent-500, #f97316);'}
  
  &:hover {
    text-decoration: ${props => props.large ? 'none' : 'underline'};
    ${props => props.large && 'background: rgba(249, 115, 22, 0.1);'}
  }
  
  &[data-theme="light"] {
    color: var(--light-lavender, #8E7DBE);
    ${props => props.large && 'border-color: var(--light-lavender, #8E7DBE);'}
    
    &:hover {
      ${props => props.large && 'background: rgba(142, 125, 190, 0.1);'}
    }
  }
`;

const TagsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
`;

interface SelectedProps {
  selected: boolean;
}

const TagBadge = styled.div<SelectedProps>`
  padding: 0.375rem 0.75rem;
  border-radius: 2rem;
  font-size: 0.75rem;
  cursor: pointer;
  transition: all 0.3s ease;
  background: ${props => props.selected 
    ? 'var(--accent-500, #f97316)' 
    : 'rgba(51, 65, 85, 0.3)'};
  color: ${props => props.selected 
    ? 'white' 
    : 'var(--dark-300, #cbd5e1)'};
  font-weight: ${props => props.selected ? '600' : '400'};
  
  &:hover {
    transform: translateY(-2px);
    background: ${props => props.selected 
      ? 'var(--accent-600, #ea580c)' 
      : 'rgba(51, 65, 85, 0.5)'};
  }
  
  &[data-theme="light"] {
    background: ${props => props.selected 
      ? 'var(--light-lavender, #8E7DBE)' 
      : 'rgba(255, 255, 255, 0.5)'};
    color: ${props => props.selected 
      ? 'white' 
      : '#4a5568'};
    border: ${props => props.selected 
      ? 'none' 
      : '1px solid rgba(142, 125, 190, 0.3)'};
    
    &:hover {
      background: ${props => props.selected 
        ? 'var(--light-lavender, #8E7DBE)' 
        : 'rgba(142, 125, 190, 0.2)'};
    }
  }
`;

const NoResults = styled.div`
  text-align: center;
  padding: 5rem 0;
  background: rgba(30, 41, 59, 0.4);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(51, 65, 85, 0.3);
  border-radius: 1.25rem;
  color: var(--dark-300, #cbd5e1);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  
  h3 {
    font-size: 1.5rem;
    font-weight: 600;
    color: var(--dark-50, #f8fafc);
    margin-top: 1rem;
  }
  
  p {
    font-size: 1.125rem;
    margin-bottom: 1.5rem;
  }
  
  svg {
    color: var(--accent-500, #f97316);
    opacity: 0.5;
  }
  
  &[data-theme="light"] {
    background: rgba(255, 255, 255, 0.8);
    border: 1px solid rgba(142, 125, 190, 0.2);
    color: #4a5568;
    
    h3 {
      color: #2d3748;
    }
    
    svg {
      color: var(--light-lavender, #8E7DBE);
    }
  }
`;

const ProjectsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 2rem;
  
  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

const ProjectCard = styled.div`
  background: rgba(30, 41, 59, 0.4);
  backdrop-filter: blur(10px);
  border-radius: 1rem;
  overflow: hidden;
  transition: all 0.3s ease;
  height: 100%;
  display: flex;
  flex-direction: column;
  border: 1px solid rgba(51, 65, 85, 0.3);
  
  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
    border-color: rgba(249, 115, 22, 0.2);
  }
  
  &[data-theme="light"] {
    background: rgba(255, 255, 255, 0.8);
    border: 1px solid rgba(142, 125, 190, 0.2);
    
    &:hover {
      box-shadow: 0 20px 40px rgba(142, 125, 190, 0.15);
      border-color: rgba(142, 125, 190, 0.3);
    }
  }
`;

const ProjectImageContainer = styled.div`
  position: relative;
  height: 200px;
  overflow: hidden;
`;

const ProjectImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.6s ease;
  
  ${ProjectCard}:hover & {
    transform: scale(1.1);
  }
`;

const ProjectOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(15, 23, 42, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.4s ease;
  
  ${ProjectCard}:hover & {
    opacity: 1;
  }
`;

const ProjectLinks = styled.div`
  display: flex;
  gap: 1rem;
`;

const ProjectLink = styled.a`
  width: 45px;
  height: 45px;
  border-radius: 50%;
  background: var(--accent-500, #f97316);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  transform: translateY(20px);
  opacity: 0;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
  
  ${ProjectCard}:hover & {
    transform: translateY(0);
    opacity: 1;
  }
  
  &:nth-child(2) {
    transition-delay: 0.1s;
  }
  
  &:hover {
    background: var(--accent-600, #ea580c);
    transform: translateY(-3px);
  }
  
  &[data-theme="light"] {
    background: var(--light-lavender, #8E7DBE);
    
    &:hover {
      background: #7F8091;
    }
  }
`;

const FeaturedBadge = styled.div`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: var(--accent-500, #f97316);
  color: white;
  padding: 0.375rem 0.75rem;
  border-radius: 2rem;
  font-size: 0.75rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 0.375rem;
  box-shadow: 0 4px 15px rgba(249, 115, 22, 0.3);
  
  &[data-theme="light"] {
    background: var(--light-lavender, #8E7DBE);
    box-shadow: 0 4px 15px rgba(142, 125, 190, 0.3);
  }
`;

const ProjectContent = styled.div`
  padding: 1.5rem;
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const ProjectHeader = styled.div`
  margin-bottom: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`;

const ProjectTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--dark-50, #f8fafc);
  
  &[data-theme="light"] {
    color: #2d3748;
  }
`;

const ProjectDescription = styled.p`
  font-size: 0.9375rem;
  line-height: 1.6;
  color: var(--dark-300, #cbd5e1);
  margin-bottom: 1.5rem;
  flex-grow: 1;
  
  &[data-theme="light"] {
    color: #4a5568;
  }
`;

const ProjectTags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
`;

const ProjectTag = styled.div`
  font-size: 0.75rem;
  padding: 0.25rem 0.625rem;
  border-radius: 2rem;
  background: rgba(51, 65, 85, 0.3);
  color: var(--dark-300, #cbd5e1);
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(51, 65, 85, 0.5);
    transform: translateY(-2px);
  }
  
  &[data-theme="light"] {
    background: rgba(142, 125, 190, 0.1);
    color: #4a5568;
    border: 1px solid rgba(142, 125, 190, 0.2);
    
    &:hover {
      background: rgba(142, 125, 190, 0.2);
    }
  }
`;

const ProjectActions = styled.div`
  display: flex;
  gap: 0.75rem;
  padding: 0 1.5rem 1.5rem;
  
  &[data-theme="light"] {
    border-top-color: rgba(142, 125, 190, 0.1);
  }
  
  @media (max-width: 480px) {
    flex-direction: column;
  }
`;

interface ButtonProps {
  primary?: boolean;
}

const ProjectButton = styled.a<ButtonProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.75rem 1.25rem;
  border-radius: 0.5rem;
  font-weight: 600;
  font-size: 0.875rem;
  transition: all 0.3s ease;
  flex: 1;
  text-decoration: none;
  
  background: ${props => props.primary
    ? 'var(--accent-500, #f97316)'
    : 'transparent'};
  color: ${props => props.primary
    ? 'white'
    : 'var(--accent-500, #f97316)'};
  border: ${props => props.primary
    ? 'none'
    : '1px solid var(--accent-500, #f97316)'};
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: ${props => props.primary
      ? '0 8px 20px rgba(249, 115, 22, 0.3)'
      : 'none'};
    background: ${props => props.primary
      ? 'var(--accent-600, #ea580c)'
      : 'rgba(249, 115, 22, 0.1)'};
  }
  
  &[data-theme="light"] {
    background: ${props => props.primary
      ? 'var(--light-lavender, #8E7DBE)'
      : 'transparent'};
    color: ${props => props.primary
      ? 'white'
      : 'var(--light-lavender, #8E7DBE)'};
    border: ${props => props.primary
      ? 'none'
      : '1px solid var(--light-lavender, #8E7DBE)'};
    
    &:hover {
      box-shadow: ${props => props.primary
        ? '0 8px 20px rgba(142, 125, 190, 0.3)'
        : 'none'};
      background: ${props => props.primary
        ? '#7F8091'
        : 'rgba(142, 125, 190, 0.1)'};
    }
  }
`;

export default ProjectsPage;