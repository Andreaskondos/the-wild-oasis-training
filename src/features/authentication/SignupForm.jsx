import { useForm } from "react-hook-form";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import { useSignup } from "./useSignup";

// Email regex: /\S+@\S+\.\S+/

function SignupForm() {
  const { register, reset, handleSubmit, formState, getValues } = useForm();
  const { signup, isPending } = useSignup();

  function onSubmit({ fullName, email, password }) {
    signup({ fullName, email, password }, { onSettled: () => reset() });
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow label="Full name" errors={formState.errors}>
        <Input
          disabled={isPending}
          {...register("fullName", {
            required: "This field is required",
            pattern: {
              value:
                /^(?=.{3,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/,
              message:
                "Enter a valid name (min 3 char). No special characters allowed.",
            },
          })}
          type="text"
          id="fullName"
        />
      </FormRow>

      <FormRow label="Email address" errors={formState.errors}>
        <Input
          disabled={isPending}
          {...register("email", {
            required: "This field is required",
            pattern: /\S+@\S+\.\S+/,
          })}
          type="email"
          id="email"
        />
      </FormRow>

      <FormRow label="Password (min 8 characters)" errors={formState.errors}>
        <Input
          disabled={isPending}
          {...register("password", {
            required: "This field is required",
            minLength: {
              value: 8,
              message: "Password must be at least 8 characters long",
            },
          })}
          type="password"
          id="password"
        />
      </FormRow>

      <FormRow label="Repeat password" errors={formState.errors}>
        <Input
          disabled={isPending}
          {...register("passwordConfirm", {
            validate: (value) =>
              getValues().password === value ||
              "It doesn't match ypur password",
          })}
          type="password"
          id="passwordConfirm"
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button variation="secondary" type="reset" onClick={reset}>
          Cancel
        </Button>
        <Button>Create new user</Button>
      </FormRow>
    </Form>
  );
}

export default SignupForm;
