import React, { useState, useEffect } from "react";

import NewExpense from "./components/NewExpense/NewExpense";
import Expenses from "./components/Expenses/Expenses";
const App = () => {
  const [expenses, setExpenses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState();
  const [addExpenseTouched, setAddExpenseTouched] = useState(false);
  useEffect(() => {
    const fetchExpenses = async () => {
      const response = await fetch(
        "https://expense-2f75d-default-rtdb.firebaseio.com/expenses.json"
      );
      if (!response.ok) {
        throw new Error("Something went wrong");
      }
      const responseData = await response.json();
      const loadedExpenses = [];
      for (const key in responseData) {
        loadedExpenses.push({
          id: key,
          title: responseData[key].title,
          price: responseData[key].price,
          amount: responseData[key].amount,
          date: new Date(responseData[key].date),
        });
      }
      setExpenses(loadedExpenses);
      setIsLoading(false);
    };
    fetchExpenses().catch((error) => {
      setIsLoading(false);
      setHttpError(error);
    });
  }, [addExpenseTouched]);
  console.log(expenses);
  const addExpenseHandler = async (expense) => {
    setAddExpenseTouched(true);
    await fetch(
      "https://expense-2f75d-default-rtdb.firebaseio.com/expenses.json",
      {
        method: "POST",
        body: JSON.stringify(expense),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    setAddExpenseTouched(false);
  };

  if (isLoading) {
    return (
      <section className="ExpensesLoading">
        <p>Loading...</p>
      </section>
    );
  }
  if (httpError) {
    return (
      <section className="ExpensesError">
        <p>{httpError}</p>
      </section>
    );
  }
  return (
    <div>
      <p>Expenses</p>
      <NewExpense onAddExpense={addExpenseHandler} />
      <Expenses items={expenses} />
    </div>
  );
};

export default App;
