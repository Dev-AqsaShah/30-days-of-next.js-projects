// src/components/ui/card.tsx

import React from 'react';

type CardProps = {
  children: React.ReactNode;
  className?: string;
};

export const Card: React.FC<CardProps> = ({ children, className }) => {
  return <div className={`card ${className}`}>{children}</div>;
};

export const CardHeader: React.FC<CardProps> = ({ children, className }) => {
  return <div className={`card-header ${className}`}>{children}</div>;
};

export const CardTitle: React.FC<CardProps> = ({ children, className }) => {
  return <h2 className={`card-title ${className}`}>{children}</h2>;
};

export const CardDescription: React.FC<CardProps> = ({ children, className }) => {
  return <p className={`card-description ${className}`}>{children}</p>;
};

export const CardContent: React.FC<CardProps> = ({ children, className }) => {
  return <div className={`card-content ${className}`}>{children}</div>;
};
