import type { Experience } from '@/types'

export const mesExperiences: Experience[] = [
  {
    id: 'sysadmin-creator',
    roleKey: 'experience.role_sysadmin',
    companyKey: 'experience.company_creator',
    companyUrl: 'https://www.youtube.com/@garryschool',
    period: '2020 - Present',
    descriptionKeys: [
      'experience.desc_sysadmin_1',
      'experience.desc_sysadmin_2',
      'experience.desc_sysadmin_3',
      'experience.desc_sysadmin_4',
      'experience.desc_sysadmin_5',
    ],
    tags: ['Linux', 'Docker', 'Lua', 'GLua', 'Cybersecurity', 'Project Management', 'Networking', 'Team Leadership'],
  },
  {
    id: 'video-editor',
    roleKey: 'experience.role_video',
    companyKey: 'experience.company_univ',
    period: 'Oct 2023 - Oct 2024',
    descriptionKeys: [
      'experience.desc_video_1',
      'experience.desc_video_2',
      'experience.desc_video_3',
    ],
    tags: ['Vegas Pro', 'Audacity', 'Pédagogie'],
  },
  {
    id: 'chef-projet',
    roleKey: 'experience.role_chef_projet',
    companyKey: 'experience.company_freelance',
    period: 'Juin 2023 - Sep 2023',
    descriptionKeys: [
      'experience.desc_chef_1',
      'experience.desc_chef_2',
      'experience.desc_chef_3',
      'experience.desc_chef_4',
    ],
    tags: ['Trello', 'Agile/SCRUM', 'React', 'Node.js', 'Lua', 'GLua', 'Team Management'],
  },
  {
    id: 'volunteer-it',
    roleKey: 'experience.role_volunteer',
    companyKey: 'experience.company_volunteer',
    period: '2022 - 2024',
    descriptionKeys: [
      'experience.desc_volunteer_1',
      'experience.desc_volunteer_2',
      'experience.desc_volunteer_3',
    ],
    tags: ['HTML', 'CSS', 'JavaScript', 'PHP', 'Bootstrap'],
  },
]
