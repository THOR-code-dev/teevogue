import React from 'react';
import styled, { css } from 'styled-components';

// Buton varyantları için stil tanımlamaları
const buttonVariants = {
  primary: css`
    background-color: ${props => props.theme.colors.primary};
    color: white;
    border: none;
    
    &:hover {
      background-color: ${props => props.theme.colors.primary}dd;
    }
  `,
  secondary: css`
    background-color: ${props => props.theme.colors.secondary};
    color: white;
    border: none;
    
    &:hover {
      background-color: ${props => props.theme.colors.secondary}dd;
    }
  `,
  outline: css`
    background-color: transparent;
    color: ${props => props.theme.colors.primary};
    border: 1px solid ${props => props.theme.colors.primary};
    
    &:hover {
      background-color: ${props => props.theme.colors.primary}11;
    }
  `,
  text: css`
    background-color: transparent;
    color: ${props => props.theme.colors.primary};
    border: none;
    padding: ${props => props.theme.spacing.xs} ${props => props.theme.spacing.sm};
    
    &:hover {
      background-color: ${props => props.theme.colors.primary}11;
    }
  `
};

// Buton boyutları için stil tanımlamaları
const buttonSizes = {
  small: css`
    font-size: ${props => props.theme.typography.fontSize.xs};
    padding: ${props => props.theme.spacing.xs} ${props => props.theme.spacing.md};
  `,
  medium: css`
    font-size: ${props => props.theme.typography.fontSize.sm};
    padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.lg};
  `,
  large: css`
    font-size: ${props => props.theme.typography.fontSize.md};
    padding: ${props => props.theme.spacing.md} ${props => props.theme.spacing.xl};
  `
};

// Temel StyledButton komponenti
const StyledButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: ${props => props.theme.borderRadius.md};
  font-family: ${props => props.theme.typography.fontFamily.body};
  font-weight: ${props => props.theme.typography.fontWeight.medium};
  cursor: pointer;
  transition: transform 0.18s ease, box-shadow 0.18s ease, background-color 0.18s ease;
  position: relative;
  overflow: hidden;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.08), 0 4px 12px rgba(0, 0, 0, 0.04);
  
  /* Varyant stilleri */
  ${props => buttonVariants[props.variant || 'primary']}
  
  /* Boyut stilleri */
  ${props => buttonSizes[props.size || 'medium']}
  
  /* Tam genişlik */
  ${props => props.fullWidth && css`
    width: 100%;
  `}
  
  /* Devre dışı durumu */
  ${props => props.disabled && css`
    opacity: 0.6;
    cursor: not-allowed;
    
    &:hover {
      opacity: 0.6;
    }
  `}
  
  /* Icon ile kullanım için */
  ${props => props.hasIcon && css`
    gap: ${props => props.theme.spacing.xs};
  `}

  &:focus-visible {
    outline: none;
    box-shadow:
      0 12px 30px rgba(0, 0, 0, 0.15),
      0 0 0 3px ${props => props.theme.colors.primary}44;
  }

  &:hover:not(:disabled) {
    transform: translateY(-2px) scale(1.01);
    box-shadow: 0 12px 28px rgba(0, 0, 0, 0.12);
  }

  &:active:not(:disabled) {
    transform: scale(0.98);
  }

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background: radial-gradient(circle, rgba(255, 255, 255, 0.25) 0%, transparent 60%);
    opacity: 0;
    transform: scale(0.4);
    transition: opacity 0.35s ease, transform 0.35s ease;
  }

  &:hover::after {
    opacity: 1;
    transform: scale(1.2);
  }
`;

// Button komponenti
const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'medium', 
  type = 'button',
  disabled = false,
  fullWidth = false,
  leftIcon,
  rightIcon,
  onClick,
  ...rest 
}) => {
  return (
    <StyledButton
      variant={variant}
      size={size}
      type={type}
      disabled={disabled}
      fullWidth={fullWidth}
      hasIcon={leftIcon || rightIcon}
      onClick={disabled ? undefined : onClick}
      {...rest}
    >
      {leftIcon && <span className="button-icon-left">{leftIcon}</span>}
      {children}
      {rightIcon && <span className="button-icon-right">{rightIcon}</span>}
    </StyledButton>
  );
};

export default Button;
