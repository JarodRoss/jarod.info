import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getFormattedNote(note: number, total: number = 20): string {
  return `${note}/${total}`
}

export function calculateAverage(grades: { note: number; credits: number }[]): number {
  const totalCredits = grades.reduce((sum, g) => sum + g.credits, 0)
  if (totalCredits === 0) return 0
  const weighted = grades.reduce((sum, g) => sum + g.note * g.credits, 0)
  return Math.round((weighted / totalCredits) * 100) / 100
}
