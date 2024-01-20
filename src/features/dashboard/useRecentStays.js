import { useQuery } from "@tanstack/react-query";
import { getStaysAfterDate } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";
import { subDays } from "date-fns";

export function useRecentStays() {
  const [searchParams] = useSearchParams();
  const numDays = searchParams.get("last")
    ? Number(searchParams.get("last"))
    : 7;

  const wantedDate = subDays(new Date(), numDays).toISOString();

  const { data: stays, isLoading } = useQuery({
    queryKey: ["stays", numDays],
    queryFn: () => getStaysAfterDate(wantedDate),
  });

  const confirmedStays = stays?.filter((stay) => stay.status !== "unconfirmed");

  return { stays, isLoading, confirmedStays, numDays };
}
