import React from "react";
import { useForm, Controller } from "react-hook-form";
// @ts-ignore
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import styles from "./Login.module.scss";
import { Navigate, useNavigate } from "react-router";
import { useAppDispatch, useAppSelector} from "../../app/hooks";
import { setUser } from "../../features/user/userSlice";

interface LoginForm {
  username: string;
  password: string;
}

const schema = yup.object().shape({
  username: yup
    .string()
    .matches(/^[A-Za-z0-9_]+$/, "Only latin letters, numbers, and _ allowed")
    .min(4, "Username must be at least 4 characters long")
    .required("Username is required"),
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters long")
    .required("Password is required"),
});
const Login = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const {user} = useAppSelector(state => state.user)

  function handleRegister() {
    navigate("/register");
  }
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<LoginForm>({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: LoginForm) => {
    dispatch(setUser({ ...data, calendar: 0, id:0 }));
  };
  if (user) {
    return <Navigate to="/" />;
  }
  return (
    <div className={styles.loginContainer}>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.loginForm}>
        <label>
          <span>Username:</span>
          <Controller
            name="username"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <input
                {...field}
                required
                id="username"
                autoComplete="username"
              />
            )}
          />
          {errors.username && (
            <div className={styles.error}>{errors.username.message}</div>
          )}
        </label>
        <label>
          <span>Password:</span>
          <Controller
            name="password"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <input
                {...field}
                required
                id="password"
                autoComplete="password"
                type="password"
              />
            )}
          />
          {errors.password && (
            <div className={styles.error}>{errors.password.message}</div>
          )}
        </label>
        <button type="submit">Login</button>
        <p className={styles.registerLink} onClick={handleRegister}>
          Don't have an account? Sign Up
        </p>
      </form>
    </div>
  );
};

export default Login;
