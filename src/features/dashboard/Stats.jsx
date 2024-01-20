import { formatCurrency } from "../../utils/helpers";
import Stat from "./Stat";
import {
  HiOutlineBanknotes,
  HiOutlineBriefcase,
  HiOutlineCalendarDays,
  HiOutlineChartBar,
} from "react-icons/hi2";

function Stats({ bookings, confirmedStays, numDays, cabinsCount }) {
  const sales = bookings.reduce((acc, cur) => acc + cur.totalPrice, 0);

  const totalNights = confirmedStays.reduce(
    (acc, cur) => acc + cur.numNights,
    0
  );
  const occupation = Math.round((totalNights / (numDays * cabinsCount)) * 100);
  return (
    <>
      <Stat
        icon={<HiOutlineBriefcase />}
        title="Bookings"
        value={bookings.length}
        color="blue"
      />
      <Stat
        icon={<HiOutlineBanknotes />}
        title="Sales"
        value={formatCurrency(sales)}
        color="green"
      />
      <Stat
        icon={<HiOutlineCalendarDays />}
        title="Check ins"
        value={confirmedStays.length}
        color="indigo"
      />
      <Stat
        icon={<HiOutlineChartBar />}
        title="Occupancy"
        value={`${occupation}%`}
        color="yellow"
      />
    </>
  );
}

export default Stats;
