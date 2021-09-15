import React from "react";

import ExpenseItem from "./ExpenseItem";
import "./ExpensesList.css";

const ExpensesList = (props) => {
  if (props.items.length === 0) {
    return <h2 className="expenses-list__fallback">Found no expenses.</h2>;
  }
  const addExpenseHandler = (expense) => {
    props.onAddExpenseHandler(expense);
  }
  const removeExpenseHandler = (expense) => {
    props.onRemoveExpenseHandler(expense);
  }
  return (
    <ul className="expenses-list">
      {props.items.map((expense) => (
        <ExpenseItem
          key={expense.id}
          onAddExpense={addExpenseHandler.bind(null,expense)}
          onRemoveExpense={removeExpenseHandler.bind(null,expense)}
          title={expense.title}
          price={expense.price}
          date={expense.date}
          amount={expense.amount}
        />
      ))}
    </ul>
  );
};

export default ExpensesList;
