import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";

import sprite from "../../assets/sprite.svg";
import css from "./FormLogIn.module.css";

const schema = yup
  .object({
    email: yup
      .string()
      .email("Must be a valid email!")
      .required("Email is required"),
    password: yup
      .string()
      .min(6, "Too Short! Minimum 6 symbols")
      .max(50, "Too Long! Maximum 50 symbols")
      .required("Password is required"),
  })
  .required();

const FormLogIn = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [isVisible, setIsVisible] = useState(false);

  const onSubmit = (data) => {
    console.log(data);
  };
  return (
    <form className={css.form} onSubmit={handleSubmit(onSubmit)}>
      <h3 className={css.title}>Log In</h3>
      <p>
        Welcome back! Please enter your credentials to access your account and
        continue your search for an teacher.
      </p>
      <div className={css.container}>
        <label className={css.label}>
          <input
            className={css.input}
            name="email"
            type="email"
            placeholder="Email"
            {...register("email", { required: true })}
          />
          {errors.email && (
            <div className={css.errorContainer}>
              <span className={css.errorMessage}>{errors.email.message}</span>
            </div>
          )}
        </label>
        <label className={css.label}>
          <input
            className={css.input}
            name="password"
            type={isVisible ? "text" : "password"}
            placeholder="Password"
            {...register("password", {
              required: true,
              minLength: 6,
              maxLength: 50,
            })}
          />
          {errors.password && (
            <div className={css.errorContainer}>
              <span className={css.errorMessage}>
                {errors.password.message}
              </span>
            </div>
          )}

          <button
            type="button"
            className={css.eyeBtn}
            onClick={() => setIsVisible(!isVisible)}
          >
            <svg className={css.iconEyePassword} width="20" height="20">
              <use
                href={`${sprite}#icon-${isVisible ? "eye" : "close-eye"}`}
              ></use>
            </svg>
          </button>
        </label>
      </div>
      <button className={css.logInBtn} type="submit">
        Log In
      </button>
    </form>
  );
};

export default FormLogIn;
