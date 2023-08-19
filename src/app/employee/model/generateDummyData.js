"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require('fs');
var Chance = require('chance');
var chance = new Chance();
var generateRandomBirthDate = function () {
    // Menghasilkan tanggal lahir antara 1950 dan tahun sekarang
    var currentYear = new Date().getFullYear();
    var birthYear = chance.integer({ min: 1950, max: currentYear });
    var birthMonth = chance.integer({ min: 1, max: 12 });
    var birthDay = chance.integer({ min: 1, max: 28 }); // 28 untuk menghindari masalah bulan Februari
    return new Date(birthYear, birthMonth - 1, birthDay);
};
var generateDummyData = function () {
    var employees = [];
    for (var i = 1; i <= 100; i++) {
        var employee = {
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
var dummyData = generateDummyData();
fs.writeFileSync('dummyData.json', JSON.stringify(dummyData, null, 2));
console.log('Data dummy telah dibuat dan disimpan dalam dummyData.json');
