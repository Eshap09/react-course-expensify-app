//
//Object destructuring
//

const person ={
    name:'eshap',
    age:26,
    location: {
        city:'beohari',
        temp:88
    }
};

//destructuring
const {name:firstname='gupta ',age} =person;
console.log(`${firstname} is ${age}`);
/*it is same as
const name=person.name;
const age=person.age;
we can do rename by using like- name:fala and set default by using = like - name:fala='blaa blaa blaa' 
*/
//location is also an object so also destructuring it
const {city,temp:temperature} =person.location;
if(city && temperature){
console.log(`${city} is having temperature of ${temperature}`);
}

const title ={
    book:'ego',
    author:'eshap gupta',
    publisher: {
       
    }
};
//if deafault value is not set and the object element is not defined then it will be considerd undefined

const {name:publishername ='self-published'} =title.publisher;
console.log(publishername);

//
//Array destructuring
//

const address=['moonlight medical store hospital','beohari','dist-shahdol'];
const [house, ,dist]=address;
console.log(`you r at ${house} at ${dist}`);
//can skip elements from staring fromm beginning last element places don't matters



