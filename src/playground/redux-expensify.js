import {createStore,combineReducers} from 'redux';
import uuid from 'uuid';

//Add expense
const addexpense = (
    {
        description='',
        note='',
        amount=0,
        createdAt=0
    }={}
) => ({
    type: 'ADD_EXPENSE',
    expense:{
    id: uuid(),
    description:description,
    note:note,
    amount:amount,
    createdAt:createdAt
    }
});

//edit expense
const editexpense=(id,update)=> ({
    type:'EDIT_EXPENSE',
    id,
    update
});
//remove expense
const removeexpense=({id}={}) => ({
    type:'REMOVE_EXPENSE',
    id:id

});

//set-text-file
const settext=(text="")=>({
type: 'SET_TEXT_FILTER',
text:text
});
//sort by date
const sortBydate=()=>({
   type:'SORT_BY_DATE'
});
//sort by amount
const sortByamount=()=>({
    type:"SORT_BY_AMOUNT"
 });
//set start date
const setstartdate=(startdate)=>({
   type:'SET_START_DATE',
   startdate
});

//set end date
const setenddate=(enddate)=>({
    type:'SET_END_DATE',
    enddate
 });
//to do all these stuff we need multiple reducers
//so we will use single reducer for each property i.e one is expense and other is filters

//
//spread operator
//const name=['eshap','gupta'];
//['adrew',...names,'mike] will give - adrew,eshap,gupta,mike
//so we it in place of concat


const expensesreducerdefaultstate=[];
const expensesreducer = (state=expensesreducerdefaultstate, action) =>  {
    switch(action.type){
        case 'ADD_EXPENSE':
            return [
                ...state,
                action.expense
            ];
            //adding options simply using spread operator on array
        case 'REMOVE_EXPENSE':
            return state.filter(({id}) => id!==action.id);    
            //if filter is true it will consider the value if not it wont
        case 'EDIT_EXPENSE':
            return state.map((expense)=>{
                if(expense.id===action.id){
                    return{
                    ...expense,
                    ...action.update
                    };
                }
                else{
                    return expense;
                };
            });
        default:
            return state;
    }
};

//setting the defaault state of reducersfirst
const filterreducerdefaultstate={
    text:'',
    sortBy:'date',
    startdate: undefined,
    enddate:undefined
};
//setting reducers
const filterreducer = (state=filterreducerdefaultstate,action) => {
    switch(action.type){
        case 'SET_TEXT_FILTER':
            return {
                ...state,
                text:action.text
            };
            case 'SORT_BY_DATE':
                return {
                    ...state,
                    sortBy: 'amount'
                };
            case 'SORT_BY_DATE':
               return {
                ...state,
               sortBy: 'date'
            };
            case 'SET_START_DATE':
                return {
                    ...state,
                    startdate: action.startdate
                };
            case 'SET_END_DATE':
                    return {
                        ...state,
                        enddate: action.enddate
                    };    
        default:
            return state;
    }

};

//timestamp(miliseconds)
//starts rom 1st january 1970
const getvisibleExpenses=(expenses,{text,sortBy,startdate,enddate}) => {
    return expenses.filter((expense)=> {
        const startdatematch=typeof startdate !=='number'|| expense.createdAt>=startdate;
        const enddatematch=typeof enddate !=='number' || expense.createdAt <= enddate;
        const textmatch=expense.description.toLowerCase().includes(text.toLowerCase());

        return startdatematch && enddatematch && textmatch;
    }).sort((a,b)=>{
        if(sortBy=== 'date'){
            return a.createdAt < b.createdAt ?1:-1;
        }
        else if(sortBy==='amount'){
            return a.amount < b.amount? 1:-1
        }
    });
};

//settng the createstore by using combinereducers
const store=createStore(
    combineReducers({
        expenses:expensesreducer,
        filters:filterreducer 
    })
);
store.subscribe(()=>{
    const state=store.getState();
    const visibleExpenses=getvisibleExpenses(state.expenses,state.filters);
    console.log(visibleExpenses);
});
const expenseone=store.dispatch(addexpense({description:'rent',amount:300,createdAt: 1000}));
const expensetwo=store.dispatch(addexpense({description:'aish',amount:100,createdAt:-1000}));

/*
store.dispatch(removeexpense({id:expenseone.expense.id}));
store.dispatch(editexpense(expensetwo.expense.id,{amount:500}));

store.dispatch(settext('rent'));
store.dispatch(settext());
store.dispatch(settext('ai'));
store.dispatch(setstartdate(125));
store.dispatch(setenddate(10000));
store.dispatch(sortBydate());
store.dispatch(sortBydate());
*/


store.dispatch(sortByamount());
/*
const demostate = {
    expenses: [{
        id:'sakdb',
        description:"jdsbln",
        note:"jncl",
        amount: 4500,
        createdAt: 0
    }],
    filters: {
        text: 'rent',
        sortBy: 'amount', //date or amount
        startdate:undefined,
        enddate:undefined
    }
};
/*
//spread operator in object

const user={
name:'eshap',
age:20
};

console.log({
    ...user,
    age:27,
    location:'beohari'
});
// name:'eshap,age:27,location:'beohari' 

//overwritting will happen if the age element assigned after ...user 
//it will not overwrite if we did it above ...user
//console.log({
//    age:27
//    ...user,
//    location:'beohari'
});
//o/p- age:20 name:'eshap location:'beohari
*/