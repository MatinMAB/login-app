import React, { useState, useEffect } from "react";
import { validate } from "./validate";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import style from "../assets/css/Login.module.css";
import { Link } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  useEffect(() => {
    setErrors(validate(formData,'login'));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formData, touched]);

  const changeHandler = (event) => {

      setFormData({ ...formData, [event.target.name]: event.target.value });

  };

  const focusHandler = (event) => {
    setTouched({ ...touched, [event.target.name]: true });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    if (!Object.keys(errors).length) {
      toast.success("ورود شما با موفقیت انجام شد");
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
        <h2 className={style.header}>صفحه ورود</h2>
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
        <div className={style.formButtons}>
          <button type="submit">ورود</button>
          <p>
            کاربر جدید هستید ؟<Link to="/signup"> ثبت نام </Link>
          </p>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
};

export default Login;
