import React, { FC, useState } from "react";
import { useForm } from "react-hook-form";
import { User } from "../../interfaces/user.interface";
import * as Yup from "yup";
import http from "../../services/api";
import { saveToken, setAuthState } from "./authSlice";
import { setUser } from "./userSlice";
import { AuthResponse } from "../../services/mirage/routes/user";
import { useAppDispatch } from "../../store";
import {
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  Button,
  Text,
} from "@chakra-ui/core";
import { useYupValidationResolver } from "../../hooks/useYupValidationResolver";

const schema = Yup.object().shape({
  username: Yup.string()
    .required("What? No username?")
    .max(16, "Username cannot be longer than 16 characters"),
  password: Yup.string().required('Without a password, "None shall pass!"'),
  email: Yup.string().email("Please provide a valid email address (abc@xy.z)"),
});

const Auth: FC = () => {
  const resolver = useYupValidationResolver(schema);
  const { handleSubmit, register, errors } = useForm<User>({
    resolver,
  });
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();

  const submitForm = (data: User) => {
    const path = isLogin ? "/auth/login" : "/auth/signup";
    http
      .post<User, AuthResponse>(path, data)
      .then((res) => {
        if (res) {
          const { user, token } = res;
          dispatch(saveToken(token));
          dispatch(setUser(user));
          dispatch(setAuthState(true));
        }
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="auth">
      <div className="card">
        <form onSubmit={handleSubmit(submitForm)}>
          <FormControl isInvalid={errors.username as any}>
            <FormLabel htmlFor="username">Username</FormLabel>
            <Input ref={register} name="username" placeholder="Username" />
            <FormErrorMessage>
              {errors.username && errors.username.message}
            </FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={errors.password as any}>
            <FormLabel htmlFor="password">Password</FormLabel>
            <Input ref={register} name="password" placeholder="Password" />
            <FormErrorMessage>
              {errors.password && errors.password.message}
            </FormErrorMessage>
          </FormControl>
          {!isLogin && (
            <FormControl isInvalid={errors.email as any}>
              <FormLabel htmlFor="name">email</FormLabel>
              <Input
                ref={register}
                name="email"
                placeholder="Email (Optional)"
              />
              <FormErrorMessage>
                {errors.email && errors.email.message}
              </FormErrorMessage>
            </FormControl>
          )}
          <Button mt={4} variantColor="teal" isLoading={loading} type="submit">
            {isLogin ? "Login" : "Create account"}
          </Button>

          <Text
            onClick={() => setIsLogin(!isLogin)}
            style={{ cursor: "pointer", opacity: 0.7 }}
          >
            {isLogin ? "No account? Create one" : "Already have an account?"}
          </Text>
        </form>
      </div>
    </div>
  );
};

export default Auth;
