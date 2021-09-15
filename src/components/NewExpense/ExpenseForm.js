import React, { useState, useRef } from "react";

import "./ExpenseForm.css";

const ExpenseForm = (props) => {
  const titleInputRef = useRef();
  const priceInputRef = useRef();
  const [enteredTitle, setEnteredTitle] = useState("");
  const enteredTitleIsValid = enteredTitle.trim() !== "";
  const [enteredTitleTouched, setEnteredTitleTouched] = useState(false);
  const titleInputIsInvalid = !enteredTitleIsValid && enteredTitleTouched;
  const [enteredPrice, setEnteredPrice] = useState("");
  const enteredPriceIsValid = enteredPrice.trim() !== "" && +enteredPrice >= 0;
  const [enteredPriceTouched, setEnteredPriceTouched] = useState(false);
  const priceInputIsInvalid = !enteredPriceIsValid && enteredPriceTouched;
  const [enteredAmount, setEnteredAmount] = useState("1");
  const enteredAmountIsValid =
    enteredAmount.trim() !== "" && +enteredAmount >= 1;
  const [enteredAmountTouched, setEnteredAmountTouched] = useState(false);
  const amountInputIsInvalid = !enteredAmountIsValid && enteredAmountTouched;
  const [enteredDate, setEnteredDate] = useState("");
  const enteredDateIsValid = enteredDate.trim() !== "";
  const [enteredDateTouched, setEnteredDateTouched] = useState(false);
  const dateInputIsInvalid = !enteredDateIsValid && enteredDateTouched;
  let formIsValid = false;

  if (
    enteredTitleIsValid &&
    enteredPriceIsValid &&
    enteredAmountIsValid &&
    enteredDateIsValid
  ) {
    formIsValid = true;
  }

  const titleChangeHandler = (event) => {
    setEnteredTitle(event.target.value);
  };
  const titleInputBlurHandler = (event) => {
    setEnteredTitleTouched(true);
  };

  const priceChangeHandler = (event) => {
    setEnteredPrice(event.target.value);
  };
  const priceInputBlurHandler = (event) => {
    setEnteredPriceTouched(true);
  };

  const dateChangeHandler = (event) => {
    setEnteredDate(event.target.value);
  };
  const dateInputBlurHandler = (event) => {
    setEnteredDateTouched(true);
  };
  const amountChangeHandler = (event) => {
    setEnteredAmount(event.target.value);
  };
  const amountInputBlurHandler = (event) => {
    setEnteredAmountTouched(true);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    setEnteredTitleTouched(true);
    setEnteredPriceTouched(true);
    if (
      !enteredTitleIsValid ||
      !enteredPriceIsValid ||
      !enteredAmountIsValid ||
      !enteredDateIsValid
    ) {
      return;
    }
    const date = new Date(enteredDate);
    const expenseData = {
      title: enteredTitle,
      price: enteredPrice,
      date: date.toISOString().split("T")[0],
      amount: enteredAmount,
    };

    props.onSaveExpenseData(expenseData);
    setEnteredTitle("");
    setEnteredTitleTouched(false);
    setEnteredPrice("");
    setEnteredPriceTouched(false);
    setEnteredAmount("");
    setEnteredAmountTouched(false);
    setEnteredDate("");
    setEnteredDateTouched(false);
  };

  const titleInputClasses = titleInputIsInvalid
    ? "new-expense__control invalid"
    : "new-expense__control";
  const priceInputClasses = priceInputIsInvalid
    ? "new-expense__control invalid"
    : "new-expense__control";
  const amountInputClasses = amountInputIsInvalid
    ? "new-expense__control invalid"
    : "new-expense__control";
  const dateInputClasses = dateInputIsInvalid
    ? "new-expense__control invalid"
    : "new-expense__control";
  return (
    <form onSubmit={submitHandler}>
      <div className="new-expense__controls">
        <div className={titleInputClasses}>
          <label>Title</label>
          <input
            ref={titleInputRef}
            type="text"
            value={enteredTitle}
            onBlur={titleInputBlurHandler}
            onChange={titleChangeHandler}
          />
          {titleInputIsInvalid && (
            <p className="new-expense__error">Title must not be empty</p>
          )}
        </div>
        <div className={priceInputClasses}>
          <label>Price</label>
          <input
            ref={priceInputRef}
            type="number"
            min="0.01"
            step="0.01"
            onBlur={priceInputBlurHandler}
            value={enteredPrice}
            onChange={priceChangeHandler}
          />
          {priceInputIsInvalid && (
            <p className="new-expense__error">Price is invalid</p>
          )}
        </div>
        <div className={dateInputClasses}>
          <label>Date</label>
          <input
            type="date"
            min="2019-01-01"
            max="2022-12-31"
            value={enteredDate}
            onBlur={dateInputBlurHandler}
            onChange={dateChangeHandler}
          />
          {dateInputIsInvalid && (
            <p className="new-expense__error">Date must not be empty</p>
          )}
        </div>
        <div className={amountInputClasses}>
          <label>Amount</label>
          <input
            type="number"
            min="1"
            max="10"
            step="1"
            value={enteredAmount}
            onBlur={amountInputBlurHandler}
            onChange={amountChangeHandler}
          />
          {amountInputIsInvalid && (
            <p className="new-expense__error">Amount is invalid</p>
          )}
        </div>
      </div>
      <div className="new-expense__actions">
        <button type="button" onClick={props.onCancel}>
          Cancel
        </button>
        <button disabled={!formIsValid} type="submit">
          Add Expense
        </button>
      </div>
    </form>
  );
};

export default ExpenseForm;
