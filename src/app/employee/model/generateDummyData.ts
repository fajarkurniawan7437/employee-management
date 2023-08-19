const fs = require('fs');
const Chance = require('chance');
import { Employee } from './employee.model';


const chance = new Chance();

const generateRandomBirthDate = (): Date => {
  // Menghasilkan tanggal lahir antara 1950 dan tahun sekarang
  const currentYear = new Date().getFullYear();
  const birthYear = chance.integer({ min: 1950, max: currentYear });
  const birthMonth = chance.integer({ min: 1, max: 12 });
  const birthDay = chance.integer({ min: 1, max: 28 }); // 28 untuk menghindari masalah bulan Februari

  return new Date(birthYear, birthMonth - 1, birthDay);
};

const generateDummyData = (): Employee[] => {
  const employees: Employee[] = [];

  for (let i = 1; i <= 100; i++) {
    const employee: Employee = {
      username: chance.string({ length: 8, alpha: true, numeric: true }),
      firstName: chance.first(),
      lastName: chance.last(),
      email: chance.email(),
      birthDate: generateRandomBirthDate(),
      basicSalary: chance.integer({ min: 3000000, max: 10000000 }),
      status: chance.pickone(['Active', 'InActive']),
      group: chance.pickone(
        ['Full Stack Developer',
        'Back-End Developer',
        'Front-End Developer',
        'QA',
        'Design',
        'Software Engineer',
        'IT Support',
        'Data Center',
        'Data Scientist',
        'Database Administrator']),
      description: chance.sentence(),
      id: i,
    };
    employees.push(employee);
  }

  return employees;
};

const dummyData = generateDummyData();
fs.writeFileSync('dummyData.json', JSON.stringify(dummyData, null, 2));
console.log('Data dummy telah dibuat dan disimpan dalam dummyData.json');
