import toast from "react-hot-toast";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { updateUser as updateUserApi } from "../../services/apiAuth";

export function useUpdateUser() {
  const queryClient = useQueryClient();

  const { mutate: updateUser, isPending } = useMutation({
    mutationFn: ({ fullName, avatar, password }) =>
      updateUserApi({ fullName, avatar, password }),
    onSuccess: (user) => {
      toast.success("You have successfully updated your data");
      queryClient.setQueryData(["user"], user);
    },
    onError: (error) => {
      console.log(error);
      toast.error("Updating data failed. Try again");
    },
  });

  return { updateUser, isPending };
}
