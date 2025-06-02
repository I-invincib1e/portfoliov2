import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useTheme } from '../context/ThemeContext';
import Footer from '../components/Footer';
import { ExternalLink, Github, Search } from 'lucide-react';
import { Link } from 'react-router-dom';
import { allProjects } from '../config/siteConfig';

const ProjectsPage: React.FC = () => {
  const { theme } = useTheme();
  const [filter, setFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredProjects, setFilteredProjects] = useState(allProjects);

  // Filter projects based on category and search query
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
    
    setFilteredProjects(result);
  }, [filter, searchQuery]);

  useEffect(() => {
    // Scroll to top when page loads
    window.scrollTo(0, 0);
  }, []);

  const handleFilterChange = (newFilter: string) => {
    setFilter(newFilter);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  return (
    <ProjectsPageWrapper className="projects-page" data-theme={theme}>
      <ProjectsHero data-theme={theme}>
        <ProjectsHeroContent>
          <ProjectsHeroTitle className="text-heading">Projects</ProjectsHeroTitle>
          <ProjectsHeroSubtitle className="text-body">
            Explore my portfolio of projects spanning web development, AI integration, and data visualization.
          </ProjectsHeroSubtitle>
        </ProjectsHeroContent>
      </ProjectsHero>

      <ProjectsContainer>
        <ProjectsFilterBar>
          <FilterButtons>
            <FilterButton 
              active={filter === 'all'} 
              onClick={() => handleFilterChange('all')}
              data-theme={theme}
            >
              All Projects
            </FilterButton>
            <FilterButton 
              active={filter === 'featured'} 
              onClick={() => handleFilterChange('featured')}
              data-theme={theme}
            >
              Featured
            </FilterButton>
          </FilterButtons>
          
          <SearchContainer data-theme={theme}>
            <SearchIcon>
              <Search size={18} />
            </SearchIcon>
            <SearchInput 
              type="text" 
              placeholder="Search projects..."
              value={searchQuery}
              onChange={handleSearchChange}
              data-theme={theme}
            />
          </SearchContainer>
        </ProjectsFilterBar>

        {filteredProjects.length === 0 ? (
          <NoResultsMessage data-theme={theme}>
            No projects found matching your search criteria.
          </NoResultsMessage>
        ) : (
          <ProjectsGrid>
            {filteredProjects.map((project, index) => (
              <ProjectCard key={index} className="project-card" data-theme={theme}>
                <ProjectImageContainer>
                  <ProjectImage 
                    src={project.image} 
                    alt={project.title} 
                    loading="lazy" 
                  />
                  <ProjectOverlay>
                    <ProjectLinks>
                      <ProjectLink href={project.link} target="_blank" rel="noopener noreferrer" data-theme={theme}>
                        <ExternalLink size={20} />
                      </ProjectLink>
                      <ProjectLink href={project.github} target="_blank" rel="noopener noreferrer" data-theme={theme}>
                        <Github size={20} />
                      </ProjectLink>
                    </ProjectLinks>
                  </ProjectOverlay>
                </ProjectImageContainer>
                <ProjectContent>
                  <ProjectTitle className="text-heading">{project.title}</ProjectTitle>
                  <ProjectDescription className="text-body">
                    {project.description}
                  </ProjectDescription>
                  <ProjectTags>
                    {project.tags.map((tag, idx) => (
                      <ProjectTag key={idx} data-theme={theme}>
                        {tag}
                      </ProjectTag>
                    ))}
                  </ProjectTags>
                </ProjectContent>
              </ProjectCard>
            ))}
          </ProjectsGrid>
        )}
      </ProjectsContainer>

      <Footer />
    </ProjectsPageWrapper>
  );
};

const ProjectsPageWrapper = styled.main`
  min-height: 100vh;
  padding-top: 80px;
  
  @media (max-width: 640px) {
    padding-top: 60px;
  }
  
  @media (max-width: 375px) {
    padding-top: 50px;
  }
`;

const ProjectsHero = styled.div`
  padding: 6rem 0 3rem;
  text-align: center;
  position: relative;
  background-color: rgba(15, 23, 42, 0.3);
  
  &[data-theme="light"] {
    background-color: rgba(247, 207, 216, 0.1);
  }
  
  &::before {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(249, 115, 22, 0.3), transparent);
  }
  
  &[data-theme="light"]::before {
    background: linear-gradient(90deg, transparent, rgba(142, 125, 190, 0.3), transparent);
  }
  
  @media (max-width: 640px) {
    padding: 4rem 0 2rem;
  }
`;

const ProjectsHeroContent = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 0 1.5rem;
`;

const ProjectsHeroTitle = styled.h1`
  font-size: 3rem;
  font-weight: 300;
  margin-bottom: 1.5rem;
  
  @media (max-width: 640px) {
    font-size: 2.25rem;
  }
`;

const ProjectsHeroSubtitle = styled.p`
  font-size: 1.25rem;
  max-width: 600px;
  margin: 0 auto;
  opacity: 0.8;
  
  @media (max-width: 640px) {
    font-size: 1.125rem;
  }
`;

const ProjectsContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 4rem 1.5rem;
  
  @media (max-width: 640px) {
    padding: 3rem 1rem;
  }
`;

const ProjectsFilterBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 3rem;
  flex-wrap: wrap;
  gap: 1rem;
  
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;
  }
`;

const FilterButtons = styled.div`
  display: flex;
  gap: 1rem;
  
  @media (max-width: 480px) {
    width: 100%;
    justify-content: space-between;
  }
`;

interface FilterButtonProps {
  active: boolean;
}

const FilterButton = styled.button<FilterButtonProps>`
  padding: 0.5rem 1.25rem;
  border-radius: 0.375rem;
  font-size: 0.875rem;
  font-weight: 500;
  transition: all 0.3s ease;
  cursor: pointer;
  background-color: ${props => props.active ? 'var(--accent-500, #f97316)' : 'rgba(30, 41, 59, 0.5)'};
  color: ${props => props.active ? 'white' : 'var(--dark-200, #e2e8f0)'};
  border: none;
  
  &:hover {
    background-color: ${props => props.active ? 'var(--accent-600, #ea580c)' : 'rgba(51, 65, 85, 0.7)'};
    transform: translateY(-2px);
  }
  
  &[data-theme="light"] {
    background-color: ${props => props.active ? 'var(--light-lavender, #8E7DBE)' : 'rgba(255, 255, 255, 0.7)'};
    color: ${props => props.active ? 'white' : '#4a5568'};
    border: ${props => props.active ? 'none' : '1px solid rgba(166, 214, 214, 0.3)'};
    
    &:hover {
      background-color: ${props => props.active ? '#7d6eb0' : 'rgba(247, 207, 216, 0.3)'};
    }
  }
  
  @media (max-width: 480px) {
    flex: 1;
    text-align: center;
    padding: 0.5rem 0.5rem;
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

const SearchIcon = styled.div`
  position: absolute;
  left: 0.75rem;
  top: 50%;
  transform: translateY(-50%);
  color: var(--dark-400, #94a3b8);
  pointer-events: none;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 0.625rem 0.75rem 0.625rem 2.5rem;
  border-radius: 0.375rem;
  background-color: rgba(30, 41, 59, 0.5);
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
    background-color: rgba(255, 255, 255, 0.7);
    border: 1px solid rgba(166, 214, 214, 0.3);
    color: #2d3748;
    
    &:focus {
      border-color: var(--light-lavender, #8E7DBE);
      box-shadow: 0 0 0 2px rgba(142, 125, 190, 0.2);
    }
    
    &::placeholder {
      color: #718096;
    }
  }
`;

const NoResultsMessage = styled.div`
  text-align: center;
  padding: 4rem 0;
  font-size: 1.25rem;
  color: var(--dark-300, #cbd5e1);
  
  &[data-theme="light"] {
    color: #4a5568;
  }
`;

const ProjectsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 2rem;
  
  @media (min-width: 640px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (min-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const ProjectCard = styled.div`
  background-color: rgba(30, 41, 59, 0.3);
  border-radius: 0.75rem;
  overflow: hidden;
  transition: all 0.3s cubic-bezier(0.165, 0.84, 0.44, 1);
  height: 100%;
  display: flex;
  flex-direction: column;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  
  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 12px 30px rgba(0, 0, 0, 0.15);
  }
  
  &[data-theme="light"] {
    background-color: rgba(255, 255, 255, 0.8);
    box-shadow: 0 4px 20px rgba(142, 125, 190, 0.1);
    
    &:hover {
      box-shadow: 0 12px 30px rgba(142, 125, 190, 0.2);
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
    transform: scale(1.05);
  }
`;

const ProjectOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(15, 23, 42, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
  
  ${ProjectCard}:hover & {
    opacity: 1;
  }
`;

const ProjectLinks = styled.div`
  display: flex;
  gap: 1rem;
`;

const ProjectLink = styled.a`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: var(--accent-500, #f97316);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  transform: translateY(20px);
  opacity: 0;
  
  ${ProjectCard}:hover & {
    transform: translateY(0);
    opacity: 1;
  }
  
  &:nth-child(2) {
    transition-delay: 0.1s;
  }
  
  &:hover {
    background-color: var(--accent-600, #ea580c);
    transform: translateY(-3px);
  }
  
  &[data-theme="light"] {
    background-color: var(--light-lavender, #8E7DBE);
    
    &:hover {
      background-color: #7d6eb0;
    }
  }
`;

const ProjectContent = styled.div`
  padding: 1.5rem;
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const ProjectTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 500;
  margin-bottom: 0.75rem;
`;

const ProjectDescription = styled.p`
  font-size: 0.875rem;
  margin-bottom: 1.25rem;
  flex: 1;
`;

const ProjectTags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: auto;
`;

const ProjectTag = styled.span`
  font-size: 0.75rem;
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  background-color: rgba(51, 65, 85, 0.5);
  color: var(--dark-200, #e2e8f0);
  
  &[data-theme="light"] {
    background-color: rgba(142, 125, 190, 0.15);
    color: #4a5568;
  }
`;

export default ProjectsPage;