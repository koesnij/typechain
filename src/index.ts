class Human {
  public name: string;
  public gender: string;
  public age: number;
  // private money: number; // 보호

  constructor(name: string, age: number, gender: string) {
    this.name = name;
    this.age = age;
    this.gender = gender;
  }
}

const nico = new Human("nicolas", 22, "male");

const sayHi = (person: Human): string => {
  return `Hello ${person.name}, you are ${person.age}, you are a ${person.gender}`;
};

console.log(sayHi(nico));

export {}; // 타입스크립트 룰
