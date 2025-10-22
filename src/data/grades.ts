import type { AcademicYear } from '@/types'

export const monParcours = {
  bachelor: { years: 3, credits: 180, period: '2021-2024' },
  master: { years: 2, credits: 120, period: '2024-2026' },
}

export const bachelorYears: AcademicYear[] = [
  {
    yearKey: 'academics.bachelor_y1',
    grades: [
      { courseCode: 'LANGL1181', courseNameKey: 'Anglais pour informaticiens I', courseUrl: 'https://uclouvain.be/cours-LANGL1181', note: 13, total: 20, credits: 2 },
      { courseCode: 'LCOPS1115B', courseNameKey: 'Economie politique', courseUrl: 'https://uclouvain.be/cours-LCOPS1115B', note: 14, total: 20, credits: 5 },
      { courseCode: 'LCOPS1124B', courseNameKey: 'Philosophie', courseUrl: 'https://uclouvain.be/cours-LCOPS1124B', note: 13, total: 20, credits: 5 },
      { courseCode: 'LESPO1113C', courseNameKey: 'Sociologie et anthropologie des mondes contemporains', courseUrl: 'https://uclouvain.be/cours-LESPO1113C', note: 12, total: 20, credits: 5 },
      { courseCode: 'LESPO1122C', courseNameKey: 'Fondements du droit public et priv\u00e9', courseUrl: 'https://uclouvain.be/cours-LESPO1122C', note: 18, total: 20, credits: 5 },
      { courseCode: 'LINFO1001', courseNameKey: 'Projets en informatique 1', courseUrl: 'https://uclouvain.be/cours-LINFO1001', note: 19, total: 20, credits: 6 },
      { courseCode: 'LINFO1002', courseNameKey: 'Projets en informatique 2', courseUrl: 'https://uclouvain.be/cours-LINFO1002', note: 15, total: 20, credits: 5 },
      { courseCode: 'LINFO1101', courseNameKey: 'Introduction \u00e0 la programmation', courseUrl: 'https://uclouvain.be/cours-LINFO1101', note: 13, total: 20, credits: 5 },
      { courseCode: 'LINFO1103', courseNameKey: "Introduction \u00e0 l'algorithmique", courseUrl: 'https://uclouvain.be/cours-LINFO1103', note: 14, total: 20, credits: 5 },
      { courseCode: 'LINFO1111', courseNameKey: 'Analyse', courseUrl: 'https://uclouvain.be/cours-LINFO1111', note: 10, total: 20, credits: 7 },
      { courseCode: 'LINFO1112', courseNameKey: 'Alg\u00e8bre', courseUrl: 'https://uclouvain.be/cours-LINFO1112', note: 14, total: 20, credits: 5 },
      { courseCode: 'LINFO1140', courseNameKey: "\u00c9lectronique de l'informatique", courseUrl: 'https://uclouvain.be/cours-LINFO1140', note: 15, total: 20, credits: 5 },
    ],
  },
  {
    yearKey: 'academics.bachelor_y2',
    grades: [
      { courseCode: 'LANGL1282', courseNameKey: 'Anglais pour informaticiens II', courseUrl: 'https://uclouvain.be/cours-LANGL1282', note: 13, total: 20, credits: 3 },
      { courseCode: 'LBIR1212', courseNameKey: 'Probabilit\u00e9s et statistiques (I)', courseUrl: 'https://uclouvain.be/cours-LBIR1212', note: 10, total: 20, credits: 4 },
      { courseCode: 'LECGE1222C', courseNameKey: 'Micro\u00e9conomie', courseUrl: 'https://uclouvain.be/cours-LECGE1222C', note: 14, total: 20, credits: 5 },
      { courseCode: 'LEPL1402', courseNameKey: 'Informatique 2', courseUrl: 'https://uclouvain.be/cours-LEPL1402', note: 12, total: 20, credits: 5 },
      { courseCode: 'LEPL1503', courseNameKey: 'Projet 3', courseUrl: 'https://uclouvain.be/cours-LEPL1503', note: 12, total: 20, credits: 5 },
      { courseCode: 'LINFO1104', courseNameKey: 'Concepts des langages de programmation', courseUrl: 'https://uclouvain.be/cours-LINFO1104', note: 15, total: 20, credits: 5 },
      { courseCode: 'LINFO1113', courseNameKey: 'Algorithmique num\u00e9rique', courseUrl: 'https://uclouvain.be/cours-LINFO1113', note: 13, total: 20, credits: 6 },
      { courseCode: 'LINFO1114', courseNameKey: 'Math\u00e9matiques discr\u00e8tes', courseUrl: 'https://uclouvain.be/cours-LINFO1114', note: 12, total: 20, credits: 5 },
      { courseCode: 'LINFO1123', courseNameKey: 'Calculabilit\u00e9 logique et complexit\u00e9', courseUrl: 'https://uclouvain.be/cours-LINFO1123', note: 16, total: 20, credits: 5 },
      { courseCode: 'LINFO1210', courseNameKey: "Syst\u00e8mes d'information et gestion de projets informatiques", courseUrl: 'https://uclouvain.be/cours-LINFO1210', note: 15, total: 20, credits: 5 },
      { courseCode: 'LINFO1212', courseNameKey: "Projet d'approfondissement en sciences informatiques", courseUrl: 'https://uclouvain.be/cours-LINFO1212', note: 15, total: 20, credits: 5 },
      { courseCode: 'LINFO1311', courseNameKey: 'Interface homme-machine', courseUrl: 'https://uclouvain.be/cours-LINFO1311', note: 13, total: 20, credits: 5 },
      { courseCode: 'LTECO2100', courseNameKey: 'Soci\u00e9t\u00e9s cultures religions : lectures bibliques', courseUrl: 'https://uclouvain.be/cours-LTECO2100', note: 17, total: 20, credits: 2 },
    ],
  },
  {
    yearKey: 'academics.bachelor_y3',
    grades: [
      { courseCode: 'LANGL1383', courseNameKey: 'Anglais pour informaticiens III', courseUrl: 'https://uclouvain.be/cours-LANGL1383', note: 17, total: 20, credits: 2 },
      { courseCode: 'LELEC1930', courseNameKey: 'Introduction aux t\u00e9l\u00e9communications', courseUrl: 'https://uclouvain.be/cours-LELEC1930', note: 16, total: 20, credits: 5 },
      { courseCode: 'LEPL1109', courseNameKey: 'Statistiques et science des donn\u00e9es', courseUrl: 'https://uclouvain.be/cours-LEPL1109', note: 12, total: 20, credits: 5 },
      { courseCode: 'LEPL1509', courseNameKey: 'Projet 4 (en informatique)', courseUrl: 'https://uclouvain.be/cours-LEPL1509', note: 17, total: 20, credits: 5 },
      { courseCode: 'LEPL1805', courseNameKey: 'Gestion des personnes', courseUrl: 'https://uclouvain.be/cours-LEPL1805', note: 16, total: 20, credits: 3 },
      { courseCode: 'LINFO1115', courseNameKey: 'Graphes, jeux et r\u00e9seaux', courseUrl: 'https://uclouvain.be/cours-LINFO1115', note: 18, total: 20, credits: 5 },
      { courseCode: 'LINFO1121', courseNameKey: 'Algorithmique et structures de donn\u00e9es', courseUrl: 'https://uclouvain.be/cours-LINFO1121', note: 11, total: 20, credits: 5 },
      { courseCode: 'LINFO1122', courseNameKey: 'M\u00e9thodes de conception de programmes', courseUrl: 'https://uclouvain.be/cours-LINFO1122', note: 10, total: 20, credits: 5 },
      { courseCode: 'LINFO1131', courseNameKey: 'Concurrent programming concepts', courseUrl: 'https://uclouvain.be/cours-LINFO1131', note: 15, total: 20, credits: 5 },
      { courseCode: 'LINFO1252', courseNameKey: 'Syst\u00e8mes informatiques', courseUrl: 'https://uclouvain.be/cours-LINFO1252', note: 12, total: 20, credits: 5 },
      { courseCode: 'LINFO1341', courseNameKey: 'R\u00e9seaux informatiques', courseUrl: 'https://uclouvain.be/cours-LINFO1341', note: 15, total: 20, credits: 5 },
      { courseCode: 'LINFO1361', courseNameKey: 'Intelligence artificielle', courseUrl: 'https://uclouvain.be/cours-LINFO1361', note: 12, total: 20, credits: 5 },
    ],
  },
]

export const masterYears: AcademicYear[] = [
  {
    yearKey: 'academics.master_y1',
    grades: [
      { courseCode: 'LINFO2132', courseNameKey: 'Languages and translators', courseUrl: 'https://uclouvain.be/cours-LINFO2132', note: 16, total: 20, credits: 6 },
      { courseCode: 'LINFO2142', courseNameKey: 'Computer networks: configuration and management', courseUrl: 'https://uclouvain.be/cours-LINFO2142', note: 16, total: 20, credits: 5 },
      { courseCode: 'LINFO2146', courseNameKey: 'Mobile and Embedded Computing', courseUrl: 'https://uclouvain.be/cours-LINFO2146', note: 13, total: 20, credits: 5 },
      { courseCode: 'LINFO2172', courseNameKey: 'Databases', courseUrl: 'https://uclouvain.be/cours-LINFO2172', note: 11, total: 20, credits: 6 },
      { courseCode: 'LINFO2255', courseNameKey: 'Software engineering project', courseUrl: 'https://uclouvain.be/cours-LINFO2255', note: 17, total: 20, credits: 6 },
      { courseCode: 'LINFO2315', courseNameKey: 'Design of Embedded and real-time systems', courseUrl: 'https://uclouvain.be/cours-LINFO2315', note: 10, total: 20, credits: 5 },
      { courseCode: 'LINFO2355', courseNameKey: 'Multicore programming', courseUrl: 'https://uclouvain.be/cours-LINFO2355', note: 12, total: 20, credits: 5 },
      { courseCode: 'LINFO2382', courseNameKey: 'Computer supported collaborative work', courseUrl: 'https://uclouvain.be/cours-LINFO2382', note: 15, total: 20, credits: 5 },
      { courseCode: 'LINFO2399', courseNameKey: 'Industrial seminar in computer science', courseUrl: 'https://uclouvain.be/cours-LINFO2399', note: 17, total: 20, credits: 3 },
    ],
  },
  {
    yearKey: 'academics.master_y2',
    grades: [
      { courseCode: 'LEPL2210', courseNameKey: 'Ethics and ICT', courseUrl: 'https://uclouvain.be/cours-LEPL2210', note: 0, total: 20, credits: 3 },
      { courseCode: 'LEPL2211', courseNameKey: 'Introduction to new venture management', courseUrl: 'https://uclouvain.be/cours-LEPL2211', note: 0, total: 20, credits: 3 },
      { courseCode: 'LEPL2214A', courseNameKey: 'Droit r\u00e9gulation contexte juridique', courseUrl: 'https://uclouvain.be/cours-LEPL2214A', note: 16, total: 20, credits: 3 },
      { courseCode: 'LINFO2145', courseNameKey: 'Cloud Computing', courseUrl: 'https://uclouvain.be/cours-LINFO2145', note: 16, total: 20, credits: 5 },
      { courseCode: 'LINFO2241', courseNameKey: 'Architecture and performance of computer systems', courseUrl: 'https://uclouvain.be/cours-LINFO2241', note: 15, total: 20, credits: 6 },
      { courseCode: 'LINFO2262', courseNameKey: 'Machine Learning : classification and evaluation', courseUrl: 'https://uclouvain.be/cours-LINFO2262', note: 0, total: 20, credits: 6 },
      { courseCode: 'LINFO2335', courseNameKey: 'Programming paradigms', courseUrl: 'https://uclouvain.be/cours-LINFO2335', note: 0, total: 20, credits: 5 },
      { courseCode: 'LINFO2347', courseNameKey: 'Computer system security', courseUrl: 'https://uclouvain.be/cours-LINFO2347', note: 0, total: 20, credits: 5 },
      { courseCode: 'LINFO2349', courseNameKey: 'Networking and security seminar', courseUrl: 'https://uclouvain.be/cours-LINFO2349', note: 17, total: 20, credits: 3 },
    ],
  },
]
