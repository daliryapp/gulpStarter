import Person from './person';
import $ from 'jquery';

let person = new Person('danial');

$('#content').text('ali danayee');
console.log(person.sayHello());
