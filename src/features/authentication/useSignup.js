import toast from "react-hot-toast";

import { useMutation } from "@tanstack/react-query";

import { signup as signupApi } from "../../services/apiAuth";

export function useSignup() {
  const { mutate: signup, isPending } = useMutation({
    mutationFn: ({ fullName, email, password }) =>
      signupApi({ fullName, email, password }),
    onSuccess: () => toast.success("You have successfully signed up"),
    onError: (error) => {
      console.log(error);
      toast.error("Sign up failed, try again");
    },
  });

  return { signup, isPending };
}
