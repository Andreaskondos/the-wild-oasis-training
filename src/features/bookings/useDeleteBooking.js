import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteBooking as deleteBookingApi } from "../../services/apiBookings";
import toast from "react-hot-toast";

export function useDeleteBooking() {
  const queryClient = useQueryClient();

  const { mutate: deleteBooking, isPending: isDeleting } = useMutation({
    mutationFn: (id) => deleteBookingApi(id),
    onSuccess: () => {
      toast.success(`You have successfully deleted the booking`);
      queryClient.invalidateQueries({ active: true });
    },
    onError: () => toast.error("There was a error deleting the booking"),
  });

  return { deleteBooking, isDeleting };
}
