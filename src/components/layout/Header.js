import React, { useState } from 'react';
import styled from 'styled-components';
import { Link, useLocation } from 'react-router-dom';
import { FiShoppingCart, FiHeart, FiUser, FiSearch, FiMenu, FiX, FiChevronDown } from 'react-icons/fi';
import Button from '../common/Button';
import categoryMeta from '../../constants/categoryMeta';
import { useCart } from '../../contexts/CartContext';

const HeaderContainer = styled.header`
  background: ${props => props.theme.colors.surface};
  box-shadow: ${props => props.theme.shadows.sm};
  position: sticky;
  top: 0;
  z-index: 100;
`;

const NavTrigger = styled.button`
  background: none;
  border: none;
  color: ${props => props.theme.colors.text.primary};
  font-weight: ${props => props.theme.typography.fontWeight.medium};
  padding: ${props => props.theme.spacing.xs} ${props => props.theme.spacing.sm};
  border-radius: ${props => props.theme.borderRadius.sm};
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: ${props => props.theme.spacing.xs};
  font-size: ${props => props.theme.typography.fontSize.sm};
  transition: all 0.2s ease;

  &:hover,
  &:focus-visible,
  &[aria-expanded='true'] {
    color: ${props => props.theme.colors.primary};
    background-color: ${props => props.theme.colors.background};
  }

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    width: 100%;
    justify-content: space-between;
    font-size: ${props => props.theme.typography.fontSize.lg};
    padding: ${props => props.theme.spacing.sm} 0;
  }
`;

const HeaderContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${props => props.theme.spacing.md} ${props => props.theme.spacing.lg};
  max-width: 1200px;
  margin: 0 auto;
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.md};
  }
`;

const Logo = styled(Link)`
  font-family: ${props => props.theme.typography.fontFamily.heading};
  font-size: ${props => props.theme.typography.fontSize.xl};
  font-weight: ${props => props.theme.typography.fontWeight.bold};
  color: ${props => props.theme.colors.primary};
  text-decoration: none;
  
  &:hover {
    color: ${props => props.theme.colors.primary};
  }
`;

const Navigation = styled.nav`
  display: flex;
  gap: ${props => props.theme.spacing.md};
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    display: ${props => props.isOpen ? 'flex' : 'none'};
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: ${props => props.theme.colors.background};
    flex-direction: column;
    padding: ${props => props.theme.spacing.xl};
    z-index: 200;
  }
`;

const NavList = styled.ul`
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;
  gap: ${props => props.theme.spacing.lg};
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    flex-direction: column;
    margin-top: ${props => props.theme.spacing.xl};
  }
`;

const NavItem = styled.li`
  position: relative;
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    margin: ${props => props.theme.spacing.md} 0;
  }
`;

const NavLink = styled(Link)`
  color: ${props => props.active 
    ? props.theme.colors.primary 
    : props.theme.colors.text.primary};
  text-decoration: none;
  font-weight: ${props => props.active 
    ? props.theme.typography.fontWeight.semiBold 
    : props.theme.typography.fontWeight.medium};
  padding: ${props => props.theme.spacing.xs} ${props => props.theme.spacing.sm};
  border-radius: ${props => props.theme.borderRadius.sm};
  transition: all 0.2s ease;
  
  &:hover {
    color: ${props => props.theme.colors.primary};
    background-color: ${props => props.theme.colors.background};
  }
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    display: block;
    padding: ${props => props.theme.spacing.sm} 0;
    font-size: ${props => props.theme.typography.fontSize.lg};
  }
`;

const Actions = styled.div`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.sm};
`;

const IconButton = styled.button`
  background: none;
  border: none;
  color: ${props => props.theme.colors.text.primary};
  font-size: 1.25rem;
  padding: ${props => props.theme.spacing.xs};
  margin-left: ${props => props.theme.spacing.sm};
  cursor: pointer;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  
  &:hover {
    color: ${props => props.theme.colors.primary};
  }
`;

const Badge = styled.span`
  position: absolute;
  top: -5px;
  right: -5px;
  background-color: ${props => props.theme.colors.secondary};
  color: white;
  font-size: 0.7rem;
  font-weight: ${props => props.theme.typography.fontWeight.bold};
  width: 18px;
  height: 18px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const MobileMenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  color: ${props => props.theme.colors.text.primary};
  font-size: 1.5rem;
  cursor: pointer;
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    display: block;
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: ${props => props.theme.spacing.md};
  right: ${props => props.theme.spacing.md};
  background: none;
  border: none;
  color: ${props => props.theme.colors.text.primary};
  font-size: 1.5rem;
  cursor: pointer;
`;

const MegaMenu = styled.div`
  position: absolute;
  top: calc(100% + 0.5rem);
  left: 0;
  width: 520px;
  background: ${props => props.theme.colors.surface};
  box-shadow: ${props => props.theme.shadows.lg};
  border-radius: ${props => props.theme.borderRadius.lg};
  padding: ${props => props.theme.spacing.lg};
  display: ${props => (props.open ? 'block' : 'none')};
  animation: fadeIn 0.2s ease;
  border: 1px solid ${props => props.theme.colors.muted};
  z-index: 150;

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    position: static;
    width: 100%;
    box-shadow: none;
    border: none;
    padding: ${props => props.theme.spacing.md} 0;
  }
`;

const MegaMenuGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: ${props => props.theme.spacing.md};

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
  }
`;

const MegaMenuCard = styled(Link)`
  border: 1px solid ${props => props.theme.colors.muted};
  border-radius: ${props => props.theme.borderRadius.md};
  padding: ${props => props.theme.spacing.md};
  text-decoration: none;
  color: ${props => props.theme.colors.text.primary};
  transition: transform 0.2s ease, border-color 0.2s ease;

  h4 {
    margin-bottom: ${props => props.theme.spacing.xs};
    font-size: ${props => props.theme.typography.fontSize.md};
  }

  p {
    margin: 0;
    color: ${props => props.theme.colors.text.secondary};
    font-size: ${props => props.theme.typography.fontSize.sm};
  }

  &:hover {
    transform: translateY(-2px);
    border-color: ${props => props.theme.colors.primary};
  }
`;

const NavLabel = styled.span`
  display: inline-flex;
  align-items: center;
  gap: ${props => props.theme.spacing.xs};
`;

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeMega, setActiveMega] = useState(null);
  const location = useLocation();
  const { summary } = useCart();
  
  const cartItemsCount = summary.itemCount;
  
  const toggleMenu = () => setIsMenuOpen(prev => !prev);
  const closeMenu = () => {
    setIsMenuOpen(false);
    setActiveMega(null);
  };

  const handleMegaToggle = (gender) => {
    setActiveMega(prev => (prev === gender ? null : gender));
  };

  const isActive = (path) => location.pathname === path;

  const renderMegaMenu = (gender) => {
    const meta = categoryMeta[gender];
    if (!meta) return null;

    return (
      <MegaMenu open={activeMega === gender}>
        <h3 style={{ marginTop: 0, marginBottom: '0.75rem' }}>{meta.hero.title}</h3>
        <p style={{ color: '#5F6368', marginBottom: '1.25rem' }}>{meta.hero.subtitle}</p>
        <MegaMenuGrid>
          {meta.subcategories.map((sub) => (
            <MegaMenuCard
              key={sub.slug}
              to={`/${gender}/${sub.slug}`}
              onClick={closeMenu}
            >
              <h4>{sub.label}</h4>
              <p>{sub.description}</p>
            </MegaMenuCard>
          ))}
        </MegaMenuGrid>
      </MegaMenu>
    );
  };
  
  return (
    <HeaderContainer>
      <HeaderContent>
        <Logo to="/">Becca Giyim</Logo>
        
        <MobileMenuButton onClick={toggleMenu}>
          <FiMenu />
        </MobileMenuButton>
        
        <Navigation isOpen={isMenuOpen}>
          {isMenuOpen && (
            <CloseButton onClick={closeMenu}>
              <FiX />
            </CloseButton>
          )}
          
          <NavList>
            <NavItem>
              <NavLink to="/" active={isActive('/')} onClick={closeMenu}>
                Ana Sayfa
              </NavLink>
            </NavItem>
            {['kadin', 'erkek'].map((gender) => (
              <NavItem key={gender}>
                <NavTrigger
                  onClick={() => handleMegaToggle(gender)}
                  aria-expanded={activeMega === gender}
                >
                  <NavLabel>
                    {categoryMeta[gender].label}
                    <FiChevronDown />
                  </NavLabel>
                </NavTrigger>
                {renderMegaMenu(gender)}
              </NavItem>
            ))}
            <NavItem>
              <NavLink to="/about" active={isActive('/about')} onClick={closeMenu}>
                Hakkımızda
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink to="/contact" active={isActive('/contact')} onClick={closeMenu}>
                İletişim
              </NavLink>
            </NavItem>
          </NavList>
        </Navigation>
        
        <Actions>
          <IconButton aria-label="Arama">
            <FiSearch />
          </IconButton>
          <IconButton aria-label="Favoriler">
            <FiHeart />
          </IconButton>
          <IconButton as={Link} to="/cart" aria-label="Sepet">
            <FiShoppingCart />
            {cartItemsCount > 0 && <Badge>{cartItemsCount}</Badge>}
          </IconButton>
          <IconButton aria-label="Hesabım">
            <FiUser />
          </IconButton>
          <Button
            variant="secondary"
            size="small"
            onClick={() => closeMenu()}
          >
            Kampanyalar
          </Button>
        </Actions>
      </HeaderContent>
    </HeaderContainer>
  );
};

export default Header;
