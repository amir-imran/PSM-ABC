import bcrypt from "bcryptjs";

const data = {
  users: [
    {
      firstName: "Abdoul Akhad",
      lastName: "Top",
      email: "akhad@gmail.com",
      isAdmin: true,
      password: bcrypt.hashSync("123456"),
    },
    {
      firstName: "Amir",
      lastName: "Chelsea",
      email: "amir@gmail.com",
      isAdmin: true,
      password: bcrypt.hashSync("123456"),
    },

    {
      firstName: "Ghani",
      lastName: "Chelsea",
      email: "ghani@gmail.com",
      isAdmin: false,
      password: bcrypt.hashSync("123456"),
    },
  ],
  students: [
    {
      id: 3,
      firstName: "Akmal",
      lastName: "Amirul",
      defaultPicture: "sdsad.jpeg",
      icNumber: 89992992,
      email: "amirula@gmail.com",
      dob: "2001-11-12T18:25:43.511Z",
      age: 21,
      phone: 12121212,
      grade: "Year 1",
      paymentdue: 200,
      numberOfClasses: 3,
      classes: ["c1", "c4", "c5"],
      performance: "average",
      comments: "This student is average",
    },
    {
      id: 4,
      firstName: "Amir",
      lastName: "Imran",
      defaultPicture: "sdsad.jpeg",
      icNumber: 9999999,
      email: "amirimran@gmail.com",
      dob: "1999-12-25T18:25:43.511Z",
      age: 23,
      phone: 12345678,
      grade: "Form 3",
      paymentdue: 0,
      numberOfClasses: 4,
      classes: ["c3", "c5", "c8", "c9"],
      performance: "excellent",
      comments: "This student is excelent",
    },
    {
      id: 5,
      firstName: "Ivan",
      lastName: "Teh",
      defaultPicture: "sdsad.jpeg",
      icNumber: 97655421,
      email: "ivanteh@gmail.com",
      dob: "1998-03-11T18:25:43.511Z",
      age: 24,
      phone: 12341234,
      grade: "Form 3",
      paymentdue: 200,
      numberOfClasses: 4,
      classes: ["c7", "c8", "c4", "c5"],
      performance: "excellent",
      comments: "This student is excelent",
    },
    {
      id: 6,
      firstName: "Janice",
      lastName: "Balan",
      defaultPicture: "sdsad.jpeg",
      icNumber: 89898989,
      email: "janice@gmail.com",
      dob: "1999-01-22T18:25:43.511Z",
      age: 23,
      phone: 12341111,
      grade: "Form 3",
      paymentdue: 180,
      numberOfClasses: 4,
      classes: ["c1", "c2", "c3", "c5"],
      performance: "average",
      comments: "Please improve your skill",
    },
    {
      id: 7,
      firstName: "Judith",
      lastName: "Mike",
      defaultPicture: "sdsad.jpeg",
      icNumber: 76524421,
      email: "judith@gmail.com",
      dob: "2000-07-13T18:25:43.511Z",
      age: 20,
      phone: 11111111,
      grade: "Form 2",
      paymentdue: 180,
      numberOfClasses: 5,
      classes: ["c1", "c2", "c3", "c4", "c5"],
      performance: "Bad",
      comments: "You are very naughty",
    },
    {
      id: 8,
      firstName: "Azmil",
      lastName: "Tarmizi",
      defaultPicture: "sdsad.jpeg",
      icNumber: 99192994,
      email: "azmil@gmail.com",
      dob: "1999-12-25T18:25:43.511Z",
      age: 23,
      phone: 11111111,
      grade: "Year 1",
      paymentdue: 200,
      numberOfClasses: 2,
      classes: ["c1", "c3"],
      performance: "excellent",
      comments: "This student is good",
    },
    {
      id: 9,
      firstName: "Ashley",
      lastName: "Young",
      defaultPicture: "sdsad.jpeg",
      icNumber: 99192997,
      email: "ashley@gmail.com",
      dob: "1999-12-25T18:25:43.511Z",
      age: 23,
      phone: 11111111,
      grade: "Year 1",
      paymentdue: 200,
      numberOfClasses: 0,
      classes: [""],
      performance: "excellent",
      comments: "This student is good",
    },
    {
      id: 10,
      firstName: "Nazirul",
      lastName: "Asyraf",
      defaultPicture: "sdsad.jpeg",
      icNumber: 99392992,
      email: "nazirul@gmail.com",
      dob: "1999-12-25T18:25:43.511Z",
      age: 23,
      phone: 11111111,
      grade: "Year 1",
      paymentdue: 200,
      numberOfClasses: 2,
      classes: ["c6", "c7"],
      performance: "excellent",
      comments: "This student is good",
    },
    {
      id: 11,
      firstName: "Ezqil",
      lastName: "Fasha",
      defaultPicture: "sdsad.jpeg",
      icNumber: 90192992,
      email: "ezqil@gmail.com",
      dob: "1999-12-25T18:25:43.511Z",
      age: 23,
      phone: 11111111,
      grade: "Year 1",
      paymentdue: 200,
      numberOfClasses: 0,
      classes: [""],
      performance: "excellent",
      comments: "This student is good",
    },
    {
      id: 12,
      firstName: "Boga",
      lastName: "Sindhu",
      defaultPicture: "sdsad.jpeg",
      icNumber: 99192952,
      email: "boga@gmail.com",
      dob: "1999-12-25T18:25:43.511Z",
      age: 23,
      phone: 11111111,
      grade: "Year 1",
      paymentdue: 200,
      numberOfClasses: 0,
      classes: [""],
      performance: "excellent",
      comments: "This student is good",
    },
    {
      id: 13,
      firstName: "Hanif",
      lastName: "Hilal",
      defaultPicture: "sdsad.jpeg",
      icNumber: 99192942,
      email: "hanif@gmail.com",
      dob: "1999-12-25T18:25:43.511Z",
      age: 23,
      phone: 11111111,
      grade: "Year 1",
      paymentdue: 200,
      numberOfClasses: 2,
      classes: ["c7", "c8"],
      performance: "excellent",
      comments: "This student is good",
    },
    {
      id: 14,
      firstName: "Kaya",
      lastName: "Coutinho",
      defaultPicture: "sdsad.jpeg",
      icNumber: 99192922,
      email: "kaya@gmail.com",
      dob: "1999-12-25T18:25:43.511Z",
      age: 23,
      phone: 11111111,
      grade: "Year 1",
      paymentdue: 200,
      numberOfClasses: 2,
      classes: ["c4", "c5"],
      performance: "excellent",
      comments: "This student is good",
    },
    {
      id: 15,
      firstName: "Wan",
      lastName: "Bisaka",
      defaultPicture: "sdsad.jpeg",
      icNumber: 99192902,
      email: "wan@gmail.com",
      dob: "1999-12-25T18:25:43.511Z",
      age: 23,
      phone: 11111111,
      grade: "Year 1",
      paymentdue: 200,
      numberOfClasses: 2,
      classes: ["c1", "c2"],
      performance: "excellent",
      comments: "This student is good",
    },
  ],
};
export default data;
