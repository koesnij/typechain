"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const name = "Nicolas", age = 24, gender = "male";
const sayHi = (name, age, gender /*optional*/) => {
    console.log(`Hello ${name}, you are ${age}, you are a ${gender}`);
};
// sayHi(name); // 에러! 자바스크립트에서는 문제 없었음
sayHi(name, age); // gender?로 했기 때문에 에러가 안생김
sayHi(name, age, gender);
//# sourceMappingURL=index.js.map