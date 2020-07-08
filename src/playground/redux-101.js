import { createStore } from 'redux';  
//if no. passed the it will consider number 
//destructuring incrementBy like destructuring object
const incrementcount = ({incrementBy=1}={}) => ({
   type: 'INCREMENT',
   incrementBy:incrementBy
});

const decrementcount =({decrementBy=1}={})=> ({
   type:'DECREMENT',
   decrementBy:decrementBy
});
const resetcount=() =>({
   type:'RESET'
});
const setcount=({count})=>({
   type:'SET',
   count:count
});

const countreducer =(state={count:0},action) =>{
    switch(action.type){
   //no need of 
   //const incrementBy=typeof action.incrementBy ==='number' ? action.incrementBy :1 now insteaad of this use action.incrementBy
   case 'INCREMENT':
      return {
       count:state.count+action.incrementBy 
      };
   case 'DECREMENT':
      return {
      count:state.count-action.decrementBy
      };
   case 'SET':
      return{
         count:action.count
      };

   case 'RESET':
      return {
      count:0
      };
   
   default:
      return state;
   }
};
const store = createStore(countreducer);
      

//subscribe function runs whenever the store value is changed
//we can unsuscribe also till unsuscribe it will run after that it won't aftter defining unsubscribe if not used anwhere it will show till last
const unsubscribe =store.subscribe(()=>{
  console.log(store.getState());
});
//previous method
//store.dispatch({
//   type:'INCREMENT',
//   incrementBy:5
//});

store.dispatch(incrementcount({incrementBy:5}));
store.dispatch(incrementcount());
store.dispatch(resetcount());
store.dispatch(setcount({count:101}));
//unsubscribe();
store.dispatch(decrementcount({decrementBy:885}));
store.dispatch(decrementcount());
//if nothing passed it will consider default value i.e 1


