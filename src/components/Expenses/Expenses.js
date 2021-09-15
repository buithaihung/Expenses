import React, { useState, useEffect } from "react";

import Card from "../UI/Card";
import ExpensesFilter from "./ExpensesFilter";
import ExpensesList from "./ExpensesList";
import ExpensesChart from "./ExpensesChart";
import "./Expenses.css";

const Expenses = (props) => {
  const [filteredYear, setFilteredYear] = useState("2021");
  const [filteredExpenses, setFilteredExpenses] = useState([]);
  const filterChangeHandler = (selectedYear) => {
    setFilteredYear(selectedYear);
  };
  useEffect(() => {
    const filteredArray = props.items.filter((expense) => {
      return expense.date.getFullYear().toString() === filteredYear;
    });
    setFilteredExpenses(filteredArray);
  }, [setFilteredExpenses, filteredYear, props.items]);

  const totalSpendingOfTheYear = filteredExpenses.length
    ? filteredExpenses
        .map((expense) => +expense.price * +expense.amount)
        .reduce((prev, next) => prev + next)
    : 0;
  const onAdd = (expenseData) => {
    const existingExpenseIndex = filteredExpenses.findIndex(
      (expense) => expense.id === expenseData.id
    );
    const existingExpense = filteredExpenses[existingExpenseIndex];
    let updatedExpenses;
    if (existingExpense) {
      const updatedExpense = {
        ...existingExpense,
        amount: +existingExpense.amount + 1,
      };
      updatedExpenses = [...filteredExpenses];
      updatedExpenses[existingExpenseIndex] = updatedExpense;
      setFilteredExpenses(updatedExpenses);
      const onAddExpense = async () => {
        await fetch(`https://expense-2f75d-default-rtdb.firebaseio.com/expenses/${updatedExpense.id}.json`,{
          method: "PATCH",
          body: JSON.stringify(updatedExpense),
          headers: {
            "Content-Type": "application/json",
          },
          
        });
      }
      onAddExpense();
    }
  };
  const onRemove = (expenseData) => {
    const existingExpenseIndex = filteredExpenses.findIndex(
      (expense) => expense.id === expenseData.id
    );
    const existingExpense = filteredExpenses[existingExpenseIndex];
    let updatedExpenses;
    if (+existingExpense.amount === 1) {
      updatedExpenses = filteredExpenses.filter(
        (expense) => expense.id !== expenseData.id
      );
      setFilteredExpenses(updatedExpenses);
      const onRemoveExpense = async () => {
        await fetch(`https://expense-2f75d-default-rtdb.firebaseio.com/expenses/${expenseData.id}.json`,{
          method: "DELETE",
          body: JSON.stringify(existingExpense),
          headers: {
            "Content-Type": "application/json",
          },
          
        });
      }
      onRemoveExpense();
    } else {
      const updatedExpense = {
        ...existingExpense,
        amount: +existingExpense.amount - 1,
      };
      updatedExpenses = [...filteredExpenses];
      updatedExpenses[existingExpenseIndex] = updatedExpense;
      setFilteredExpenses(updatedExpenses);
      const onAddExpense = async () => {
        await fetch(`https://expense-2f75d-default-rtdb.firebaseio.com/expenses/${updatedExpense.id}.json`,{
          method: "PATCH",
          body: JSON.stringify(updatedExpense),
          headers: {
            "Content-Type": "application/json",
          },
          
        });
      }
      onAddExpense();


    }
  };
  return (
    <div>
      <Card className="expenses">
        <ExpensesFilter
          total={totalSpendingOfTheYear}
          selected={filteredYear}
          onChangeFilter={filterChangeHandler}
        />
        <ExpensesChart expenses={filteredExpenses} />
        <ExpensesList
          onAddExpenseHandler={onAdd}
          onRemoveExpenseHandler={onRemove}
          items={filteredExpenses}
        />
      </Card>
    </div>
  );
};

export default Expenses;
