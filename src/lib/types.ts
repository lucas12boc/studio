import type React from 'react';

export interface IncomeStrategy {
  id: string;
  title: string;
  description: string;
  potentialEarning: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}

export interface LearningResource {
  id: string;
  title: string;
  platform: string;
  url: string; 
  description: string;
  category: string;
  icon?: React.ElementType;
}

export interface JobListing {
  id: string;
  title: string;
  company: string;
  location: string;
  url: string;
  description: string;
  category: string;
  icon?: React.ElementType;
}

export interface Task {
  id: string;
  text: string;
  completed: boolean;
  dueDate?: Date;
}

export type RiskTolerance = "low" | "medium" | "high";
