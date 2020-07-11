import uuid from 'uuid';
import database from '../firebase/firebase';

//including firebase
//component calls action generator
//action generator returns object
//component dispatches function
//function runs (has the ability to dispatch other actions and whatever changes it wants)



// ADD_EXPENSE
export const addExpense = (expense)=> ({
  type: 'ADD_EXPENSE',
  expense
});

export const startAddExpense=(expenseData={})=>{
  return (dispatch,getState)=> {
    const uid=getState().auth.uid;
    const {
      description = '',
    note = '',
    amount = 0,
    createdAt = 0
    }=expenseData;

    const expense ={description,note,amount,createdAt};
    return database.ref(`users/${uid}/expenses`).push(expense).then((ref)=>{
      dispatch(addExpense({
        id: ref.key,
        ...expense
      }));
    })
  };
};
//storing data in firebase such that
 // users:{
//       uid1: {
//         data
//       },
//       uid2:{
//         data
//       }
//  }
//so using in ref `users/${uid}/expenses`


// REMOVE_EXPENSE
export const removeExpense = ({ id } = {}) => ({
  type: 'REMOVE_EXPENSE',
  id
});

//Expense removal challenge

//1.create startRemoveExpense (saame call signature as remove Expense)
//2.test startRemoveExpenses with "should remove exppense from firebase"
//3.use startRemovaExpense in EditExpense page instead of removeExpense
//4.Adjust EditExpensePage tests
export const startRemoveExpense=({id} = {})=> {
  return (dispatch,getState)=>{
    const uid=getState().auth.uid;
    return  database.ref(`users/${uid}/expenses/${id}`).remove().then(()=>{
      dispatch(removeExpense({id}));
    });
  };
};

// EDIT_EXPENSE
export const editExpense = (id, updates) => ({
  type: 'EDIT_EXPENSE',
  id,
  updates
});
export const startEditExpense=(id,updates)=> {
    return (dispatch,getState)=>{
      const uid=getState().auth.uid;
      return database.ref(`users/${uid}/expenses/${id}`).update(updates).then(()=>{
          dispatch(editExpense(id,updates));
      });
  };
};

// SET_EXPENSES
export const setExpenses = (expenses) => ({
  type: 'SET_EXPENSES',
  expenses
});


//fixes the data so that after refresh it shows in the page

//1.fetch all expense data once
//2.parse that data into an array
//3.dispath 'SET_EXPENSES'
export const startSetExpenses = () => {
  return (dispatch,getState) => {
    const uid=getState().auth.uid;
    return database.ref(`users/${uid}/expenses`).once('value').then((snapshot) => {
      const expenses = [];

      snapshot.forEach((childSnapshot) => {
        expenses.push({
          id: childSnapshot.key,
          ...childSnapshot.val()
        });
      });

      dispatch(setExpenses(expenses));
    });
  };
};

//Expense removal challenge

//1.create startRemoveExpense (saame call signature as remove Expense)
//2.test startRemoveExpenses with "should remove exppense from firebase"
//3.use startRemovaExpense in EditExpense page instead of removeExpense
//4.Adjust EditExpensePage tests


 