import * as firebase from 'firebase';

const config = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.FIREBASE_DATABASE_URL,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId:process.env.FIREBASE_MESSAGING_ID
  };

firebase.initializeApp(config);

const database =firebase.database();

export {firebase,database as default};



/*
//child removed
database.ref('expenses').on('child_removed',(snapshot)=>{
    console.log(snapshot.key,snapshot.val());
});

//child changed
database.ref('expenses').on('child_changed',(snapshot)=>{
    console.log(snapshot.key,snapshot.val());
});

//child_added
database.ref('expenses').on('child_added',(snapshot)=>{
    console.log(snapshot.key,snapshot.val());
});

//gets fired to print the existing ones as wwell as the new ones

//arraay in database using once
/*database.ref('expenses')
.once('value')
.then((snapshot)=>{
    const expenses=[];

    snapshot.forEach((childSnapshot)=>{
       expenses.push({
        id:childSnapshot.key,
        ...childSnapshot.val()
       });
    });
    console.log(expenses);
});
*/

//array in database using on
/*database.ref('expenses').on('value',(snapshot)=>{
    const expenses=[];

    snapshot.forEach((childSnapshot)=>{
       expenses.push({
        id:childSnapshot.key,
        ...childSnapshot.val()
       });
    });
    console.log(expenses);
});

*/


/*database.ref('expenses')
.once('value')
.then((snapshot)=>{
    console.log(snapshot.val());
});
*/


/*database.ref('expenses').push({
    description:'rent',
    note: '',
    amount:1024,
    createdAt: 4651251
});
*/





//database.ref('notes/-MBpJT2k5VS1aPytJI3P').remove();

/*database.ref('notes').push({
    title:'To Do list',
    body:'Go for a walk'
});

*/

/*const firebaseNote={
    notes: {
        asbsk: {
            title:'first-note',
            body:'this is my note'
        },
        hbscjs:{
            title:'dbshb',
            body:'fbdjj'
        }
    }
};

database.ref().set(firebaseNote);
*/



/*

//writting calls
database.ref().set({
  name: 'Eshap Gupta',
  age:22,
  stresslevel:6,
  job:{
      title:'software developer',
      company:'Google'
    },
  location: {
  city:'Beohari',
  country:'India'
  }
}).then(()=>{
    console.log('data is saved');
}).catch((e)=>{
    console.log('this failed',e);
});


//reading database

database.ref().on('value',(snapshot)=>{
  const val=snapshot.val();
  console.log(`${val.name} is a ${val.job.title} at ${val.job.company}`);
});



// on will fire everytime data change

/*const onValueChange =database.ref().on('value', (snapshot)=>{
    console.log(snapshot.val());
},(e) => {
    console.log('Error with fetching data',e);
});

setTimeout(()=>{
 database.ref('age').set(21);
},3500);

setTimeout(()=>{
    database.ref().off(onValueChange);
   },7000);
//unsuscribing
   setTimeout(()=>{
    database.ref('age').set(29);
   },10500);

//once is used only once
*/

/*database.ref('location')
.once('value')
.then((snapshot)=>{
    const val=snapshot.val();
    console.log(val);
})
.catch((e)=> {
console.log('error fetchng data',e);
});
*/





//remove 

//one method to remove
/*database.ref('Issingle')
.remove()
.then(()=>{
    console.log('data was removed');
}).catch((e)=>{
    console.log('did not remove data',e);
});
*/

//second method
//database.ref('Issingle').set(null);
//setting set to null behaves as remove()

//update daetabase

//database.ref().update({
//    name:'MSD',
  //  age:39,
    //job:'software developer',
    //Issingle:null
//});
//previousy job column was not there
//so update can add element
//and setting Issingle to null removes the elemet from database

//so we can add remove and update using update function

/*database.ref().update({
  job:'Manager',
  'location/city':'afeemnagar'
});
//for objects it just updates only to root level 
//so we to use syntax like this
*/

/*database.ref().update({
stresslevel:9,
'job/company':'Amazon',
'location/city':'Seattle'
});
*/





//set wipes the previous value and sets the new value if ref not passed
//database.ref().set('this is my data.');

//database.ref('age').set(27);
//setting only one element of objectt using location/city
//database.ref('location/city').set('rewa');

//setting new stuff keeping old one using 'attributes' in reference


/*database.ref('attributes').set({
    height:73,
    weight:183
}).then(()=>{
    console.log('second set call worked.');
}).catch((e)=> {
    console.log('things didnt worked for the secong error',e);
});
*/

