export interface Project {
  id: string
  titleKey: string
  descriptionKey: string
  image?: string
  tags: string[]
  category: 'professional' | 'personal' | 'academic'
  liveUrl?: string
  sourceUrl?: string
  featured?: boolean
  courseCode?: string
}

export interface Experience {
  id: string
  roleKey: string
  companyKey: string
  companyUrl?: string
  period: string
  descriptionKeys: string[]
  tags: string[]
}

export interface Grade {
  courseCode: string
  courseNameKey: string
  courseUrl?: string
  note: number
  total: number
  credits: number
}

export interface AcademicYear {
  yearKey: string
  grades: Grade[]
}

export interface Skill {
  name: string
  icon?: string
}

export interface SkillCategory {
  categoryKey: string
  skills: Skill[]
}

export interface SocialLink {
  name: string
  url: string
  icon: string
}

export interface NavItem {
  labelKey: string
  path: string
}
