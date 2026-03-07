import type { AcademicYear } from '@/types'

const _u = (c: string) => atob('aHR0cHM6Ly91Y2xvdXZhaW4uYmUvY291cnMt') + c

export const monParcours = {
  bachelor: { years: 3, credits: 180, period: '2021-2024' },
  master: { years: 2, credits: 120, period: '2024-2026' },
}

export const bachelorYears: AcademicYear[] = [
  {
    yearKey: 'academics.bachelor_y1',
    grades: [
      { courseCode: 'LANGL1181', courseNameKey: 'Anglais pour informaticiens I', courseUrl: _u('LANGL1181'), note: 13, total: 20, credits: 2 },
      { courseCode: 'LCOPS1115B', courseNameKey: 'Economie politique', courseUrl: _u('LCOPS1115B'), note: 14, total: 20, credits: 5 },
      { courseCode: 'LCOPS1124B', courseNameKey: 'Philosophie', courseUrl: _u('LCOPS1124B'), note: 13, total: 20, credits: 5 },
      { courseCode: 'LESPO1113C', courseNameKey: 'Sociologie et anthropologie des mondes contemporains', courseUrl: _u('LESPO1113C'), note: 12, total: 20, credits: 5 },
      { courseCode: 'LESPO1122C', courseNameKey: 'Fondements du droit public et priv\u00e9', courseUrl: _u('LESPO1122C'), note: 18, total: 20, credits: 5 },
      { courseCode: 'LINFO1001', courseNameKey: 'Projets en informatique 1', courseUrl: _u('LINFO1001'), note: 19, total: 20, credits: 6 },
      { courseCode: 'LINFO1002', courseNameKey: 'Projets en informatique 2', courseUrl: _u('LINFO1002'), note: 15, total: 20, credits: 5 },
      { courseCode: 'LINFO1101', courseNameKey: 'Introduction \u00e0 la programmation', courseUrl: _u('LINFO1101'), note: 13, total: 20, credits: 5 },
      { courseCode: 'LINFO1103', courseNameKey: "Introduction \u00e0 l'algorithmique", courseUrl: _u('LINFO1103'), note: 14, total: 20, credits: 5 },
      { courseCode: 'LINFO1111', courseNameKey: 'Analyse', courseUrl: _u('LINFO1111'), note: 10, total: 20, credits: 7 },
      { courseCode: 'LINFO1112', courseNameKey: 'Alg\u00e8bre', courseUrl: _u('LINFO1112'), note: 14, total: 20, credits: 5 },
      { courseCode: 'LINFO1140', courseNameKey: "\u00c9lectronique de l'informatique", courseUrl: _u('LINFO1140'), note: 15, total: 20, credits: 5 },
    ],
  },
  {
    yearKey: 'academics.bachelor_y2',
    grades: [
      { courseCode: 'LANGL1282', courseNameKey: 'Anglais pour informaticiens II', courseUrl: _u('LANGL1282'), note: 13, total: 20, credits: 3 },
      { courseCode: 'LBIR1212', courseNameKey: 'Probabilit\u00e9s et statistiques (I)', courseUrl: _u('LBIR1212'), note: 10, total: 20, credits: 4 },
      { courseCode: 'LECGE1222C', courseNameKey: 'Micro\u00e9conomie', courseUrl: _u('LECGE1222C'), note: 14, total: 20, credits: 5 },
      { courseCode: 'LEPL1402', courseNameKey: 'Informatique 2', courseUrl: _u('LEPL1402'), note: 12, total: 20, credits: 5 },
      { courseCode: 'LEPL1503', courseNameKey: 'Projet 3', courseUrl: _u('LEPL1503'), note: 12, total: 20, credits: 5 },
      { courseCode: 'LINFO1104', courseNameKey: 'Concepts des langages de programmation', courseUrl: _u('LINFO1104'), note: 15, total: 20, credits: 5 },
      { courseCode: 'LINFO1113', courseNameKey: 'Algorithmique num\u00e9rique', courseUrl: _u('LINFO1113'), note: 13, total: 20, credits: 6 },
      { courseCode: 'LINFO1114', courseNameKey: 'Math\u00e9matiques discr\u00e8tes', courseUrl: _u('LINFO1114'), note: 12, total: 20, credits: 5 },
      { courseCode: 'LINFO1123', courseNameKey: 'Calculabilit\u00e9 logique et complexit\u00e9', courseUrl: _u('LINFO1123'), note: 16, total: 20, credits: 5 },
      { courseCode: 'LINFO1210', courseNameKey: "Syst\u00e8mes d'information et gestion de projets informatiques", courseUrl: _u('LINFO1210'), note: 15, total: 20, credits: 5 },
      { courseCode: 'LINFO1212', courseNameKey: "Projet d'approfondissement en sciences informatiques", courseUrl: _u('LINFO1212'), note: 15, total: 20, credits: 5 },
      { courseCode: 'LINFO1311', courseNameKey: 'Interface homme-machine', courseUrl: _u('LINFO1311'), note: 13, total: 20, credits: 5 },
      { courseCode: 'LTECO2100', courseNameKey: 'Soci\u00e9t\u00e9s cultures religions : lectures bibliques', courseUrl: _u('LTECO2100'), note: 17, total: 20, credits: 2 },
    ],
  },
  {
    yearKey: 'academics.bachelor_y3',
    grades: [
      { courseCode: 'LANGL1383', courseNameKey: 'Anglais pour informaticiens III', courseUrl: _u('LANGL1383'), note: 17, total: 20, credits: 2 },
      { courseCode: 'LELEC1930', courseNameKey: 'Introduction aux t\u00e9l\u00e9communications', courseUrl: _u('LELEC1930'), note: 16, total: 20, credits: 5 },
      { courseCode: 'LEPL1109', courseNameKey: 'Statistiques et science des donn\u00e9es', courseUrl: _u('LEPL1109'), note: 12, total: 20, credits: 5 },
      { courseCode: 'LEPL1509', courseNameKey: 'Projet 4 (en informatique)', courseUrl: _u('LEPL1509'), note: 17, total: 20, credits: 5 },
      { courseCode: 'LEPL1805', courseNameKey: 'Gestion des personnes', courseUrl: _u('LEPL1805'), note: 16, total: 20, credits: 3 },
      { courseCode: 'LINFO1115', courseNameKey: 'Graphes, jeux et r\u00e9seaux', courseUrl: _u('LINFO1115'), note: 18, total: 20, credits: 5 },
      { courseCode: 'LINFO1121', courseNameKey: 'Algorithmique et structures de donn\u00e9es', courseUrl: _u('LINFO1121'), note: 11, total: 20, credits: 5 },
      { courseCode: 'LINFO1122', courseNameKey: 'M\u00e9thodes de conception de programmes', courseUrl: _u('LINFO1122'), note: 10, total: 20, credits: 5 },
      { courseCode: 'LINFO1131', courseNameKey: 'Concurrent programming concepts', courseUrl: _u('LINFO1131'), note: 15, total: 20, credits: 5 },
      { courseCode: 'LINFO1252', courseNameKey: 'Syst\u00e8mes informatiques', courseUrl: _u('LINFO1252'), note: 12, total: 20, credits: 5 },
      { courseCode: 'LINFO1341', courseNameKey: 'R\u00e9seaux informatiques', courseUrl: _u('LINFO1341'), note: 15, total: 20, credits: 5 },
      { courseCode: 'LINFO1361', courseNameKey: 'Intelligence artificielle', courseUrl: _u('LINFO1361'), note: 12, total: 20, credits: 5 },
    ],
  },
]

export const masterYears: AcademicYear[] = [
  {
    yearKey: 'academics.master_y1',
    grades: [
      { courseCode: 'LINFO2132', courseNameKey: 'Languages and translators', courseUrl: _u('LINFO2132'), note: 16, total: 20, credits: 6 },
      { courseCode: 'LINFO2142', courseNameKey: 'Computer networks: configuration and management', courseUrl: _u('LINFO2142'), note: 16, total: 20, credits: 5 },
      { courseCode: 'LINFO2146', courseNameKey: 'Mobile and Embedded Computing', courseUrl: _u('LINFO2146'), note: 13, total: 20, credits: 5 },
      { courseCode: 'LINFO2172', courseNameKey: 'Databases', courseUrl: _u('LINFO2172'), note: 11, total: 20, credits: 6 },
      { courseCode: 'LINFO2255', courseNameKey: 'Software engineering project', courseUrl: _u('LINFO2255'), note: 17, total: 20, credits: 6 },
      { courseCode: 'LINFO2315', courseNameKey: 'Design of Embedded and real-time systems', courseUrl: _u('LINFO2315'), note: 10, total: 20, credits: 5 },
      { courseCode: 'LINFO2355', courseNameKey: 'Multicore programming', courseUrl: _u('LINFO2355'), note: 12, total: 20, credits: 5 },
      { courseCode: 'LINFO2382', courseNameKey: 'Computer supported collaborative work', courseUrl: _u('LINFO2382'), note: 15, total: 20, credits: 5 },
      { courseCode: 'LINFO2399', courseNameKey: 'Industrial seminar in computer science', courseUrl: _u('LINFO2399'), note: 17, total: 20, credits: 3 },
    ],
  },
  {
    yearKey: 'academics.master_y2',
    grades: [
      { courseCode: 'LEPL2210', courseNameKey: 'Ethics and ICT', courseUrl: _u('LEPL2210'), note: 0, total: 20, credits: 3 },
      { courseCode: 'LEPL2211', courseNameKey: 'Introduction to new venture management', courseUrl: _u('LEPL2211'), note: 0, total: 20, credits: 3 },
      { courseCode: 'LEPL2214A', courseNameKey: 'Droit r\u00e9gulation contexte juridique', courseUrl: _u('LEPL2214A'), note: 16, total: 20, credits: 3 },
      { courseCode: 'LINFO2145', courseNameKey: 'Cloud Computing', courseUrl: _u('LINFO2145'), note: 16, total: 20, credits: 5 },
      { courseCode: 'LINFO2241', courseNameKey: 'Architecture and performance of computer systems', courseUrl: _u('LINFO2241'), note: 15, total: 20, credits: 6 },
      { courseCode: 'LINFO2262', courseNameKey: 'Machine Learning : classification and evaluation', courseUrl: _u('LINFO2262'), note: 0, total: 20, credits: 6 },
      { courseCode: 'LINFO2335', courseNameKey: 'Programming paradigms', courseUrl: _u('LINFO2335'), note: 0, total: 20, credits: 5 },
      { courseCode: 'LINFO2347', courseNameKey: 'Computer system security', courseUrl: _u('LINFO2347'), note: 0, total: 20, credits: 5 },
      { courseCode: 'LINFO2349', courseNameKey: 'Networking and security seminar', courseUrl: _u('LINFO2349'), note: 17, total: 20, credits: 3 },
    ],
  },
]
