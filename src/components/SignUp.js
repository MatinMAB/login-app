import React, { useState, useEffect } from "react";
import { validate } from "./validate";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import style from "../assets/css/SignUp.module.css";
import { Link } from "react-router-dom";

const SignUp = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    isAccepted: false,
  });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  useEffect(() => {
    setErrors(validate(formData,'signup'));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formData, touched]);

  const changeHandler = (event) => {
    if (event.target.name === "isAccepted") {
      setFormData({ ...formData, [event.target.name]: event.target.checked });
    } else {
      setFormData({ ...formData, [event.target.name]: event.target.value });
    }
  };

  const focusHandler = (event) => {
    setTouched({ ...touched, [event.target.name]: true });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    if (!Object.keys(errors).length) {
      toast.success("ثبت نام شما با موفقیت انجام شد");
    } else {
      setTouched({
        name: true,
        email: true,
        password: true,
        confirmPassword: true,
        isAccepted: true,
      });
      toast.error("اطلاعات وارد شده صحیح نمی باشد");
    }
  };

  return (
    <div className={style.container}>
      <form onSubmit={submitHandler} className={style.formContainer}>
        <h2 className={style.header}>حساب کاربری جدید</h2>
        <div className={style.formField}>
          <label for="name">نام</label>
          <input
            className={touched.name && errors.name ? style.uncompleted : style.formInput}
            type="text"
            name="name"
            id="name"
            value={formData.name}
            onChange={changeHandler}
            onFocus={focusHandler}
          />
          {touched.name && errors.name && <span>{errors.name}</span>}
        </div>
        <div className={style.formField}>
          <label for="email">ایمیل</label>
          <input
            className={touched.email && errors.email ? style.uncompleted : style.formInput}
            type="text"
            name="email"
            id="email"
            value={formData.email}
            onChange={changeHandler}
            onFocus={focusHandler}
          />
          {touched.email && errors.email && <span>{errors.email}</span>}
        </div>
        <div className={style.formField}>
          <label for="password">رمز عبور</label>
          <input
            className={touched.password && errors.password ? style.uncompleted : style.formInput}
            type="password"
            name="password"
            id="password"
            value={formData.password}
            onChange={changeHandler}
            onFocus={focusHandler}
          />
          {touched.password && errors.password && <span>{errors.password}</span>}
        </div>
        <div className={style.formField}>
          <label for="confirmPassword">تایید رمز عبور</label>
          <input
            className={touched.confirmPassword && errors.confirmPassword ? style.uncompleted : style.formInput}
            type="password"
            name="confirmPassword"
            id="confirmPassword"
            value={formData.confirmPassword}
            onChange={changeHandler}
            onFocus={focusHandler}
          />
          {touched.confirmPassword && errors.confirmPassword && <span>{errors.confirmPassword}</span>}
        </div>
        <div className={style.formField}>
          <div className={style.formField_privacy}>
            <input type="checkbox" name="isAccepted" id="isAccepted" value={formData.isAccepted} onChange={changeHandler} onFocus={focusHandler} />
            <label>تمامی قوانین و شرایط سایت را می پذیرم.</label>
          </div>
          {touched.isAccepted && errors.isAccepted && <span>{errors.isAccepted}</span>}
        </div>
        <div className={style.formButtons}>
          <button type="submit">ثبت نام</button>
          <p>
            از قبل ثبت نام نموده‌اید ؟<Link to="/login"> ورود </Link>
          </p>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
};

export default SignUp;
