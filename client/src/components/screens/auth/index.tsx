import { FC, useState } from "react";
import Meta from "../../meta";
import Button from "../../ui/button";
import Heading from "../../ui/heading";
import { useAuth } from "@/src/hooks/useAuth";
import { useActions } from "@/src/hooks/useActions";
import { useForm, SubmitHandler } from "react-hook-form";
import { IEmailPassword } from "@/src/store/user/user.interface";
import InputField from "../../ui/input";
import { validEmail } from "../valid-email";
import { useAuthRedirect } from "./useAuthRedirect";

export interface IAuthProps {}

const Auth: FC<IAuthProps> = ({}) => {
  useAuthRedirect();
  const { isLoading } = useAuth();
  const { login, register } = useActions();
  const [type, setType] = useState<"login" | "register">("login");

  const {
    register: formRegister,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IEmailPassword>({
    mode: "onChange",
  });

  const onSubmit: SubmitHandler<IEmailPassword> = (data) => {
    if (type === "login") {
      login(data);
    } else {
      register(data);
    }
    reset();
  };

  return (
    <Meta title="Auth">
      <section className="flex h-screen">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="rounded-ls bg-white shadow-sm p-8 m-auto"
        >
          <Heading className="capitalize text-center mb-4">{type}</Heading>
          <InputField
            {...formRegister("email", {
              required: "Email is required",
              pattern: {
                value: validEmail,
                message: "Please enter a valid email",
              },
            })}
            placeholder="Email"
            error={errors.email?.message}
          />
          <InputField
            {...formRegister("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Min length should be more 6 symbols",
              },
            })}
            type="password"
            placeholder="Password"
            error={errors.password?.message}
          />
          <Button variant="orange">Submit</Button>

          <button
            type="button"
            className="inline-block opacity-50 mt-3"
            onClick={() => setType(type === "login" ? "register" : "login")}
          >
            {type === "login" ? "register" : "login"}
          </button>
        </form>
      </section>
    </Meta>
  );
};
export default Auth;
