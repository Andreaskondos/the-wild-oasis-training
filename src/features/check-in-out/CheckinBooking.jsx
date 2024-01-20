import styled from "styled-components";
import BookingDataBox from "../../features/bookings/BookingDataBox";

import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";
import Spinner from "../../ui/Spinner";
import Checkbox from "../../ui/Checkbox";

import { useMoveBack } from "../../hooks/useMoveBack";
import { useBooking } from "../bookings/useBooking";
import { formatCurrency } from "../../utils/helpers";
import { useEffect, useState } from "react";
import { useCheckin } from "./useCheckin";
import { useSettings } from "../settings/useSettings";

const Box = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 2.4rem 4rem;
`;

function CheckinBooking() {
  const [confirmPaid, setConfirmPaid] = useState(false);
  const [addBreafast, setAddBreafast] = useState(false);
  const moveBack = useMoveBack();

  const { data: booking, isLoading } = useBooking();
  const { settings, isLoadingSettings } = useSettings();
  const { checkin, isCheckingIn } = useCheckin();

  useEffect(() => setConfirmPaid(booking?.isPaid ?? false), [booking?.isPaid]);
  if (isLoading || isLoadingSettings) return <Spinner />;

  const {
    id: bookingId,
    guests,
    totalPrice,
    numGuests,
    hasBreakfast,
    numNights,
  } = booking;

  function handleCheckin() {
    if (!confirmPaid) return;
    if (addBreafast)
      checkin({
        bookingId,
        breakfast: {
          totalPrice: totalPrice + totalBreakFastPrice,
          extrasPrice: totalBreakFastPrice,
        },
      });
    else checkin({ bookingId, breakfast: {} });
  }
  const totalBreakFastPrice = settings.breakfastPrice * numGuests * numNights;
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Check in booking #{bookingId}</Heading>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />
      <Box>
        <Checkbox
          checked={addBreafast}
          disabled={hasBreakfast || isCheckingIn}
          onChange={() => {
            setAddBreafast((add) => !add);
            setConfirmPaid(false);
          }}
          id="breakfast"
        >
          You can add breackfast with the price of{" "}
          {formatCurrency(totalBreakFastPrice)}
        </Checkbox>
      </Box>
      <Box>
        <Checkbox
          checked={confirmPaid}
          disabled={confirmPaid || isCheckingIn}
          onChange={() => setConfirmPaid((confirm) => !confirm)}
          id="confirm"
        >
          I confirm that {guests.fullName} has paid the total amount of{" "}
          {addBreafast
            ? `${formatCurrency(totalPrice + totalBreakFastPrice)} (
                ${formatCurrency(totalPrice)} + ${formatCurrency(
                totalBreakFastPrice
              )}
              )`
            : formatCurrency(totalPrice)}
        </Checkbox>
      </Box>
      <ButtonGroup>
        <Button onClick={handleCheckin} disabled={!confirmPaid || isCheckingIn}>
          Check in booking #{bookingId}
        </Button>
        <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default CheckinBooking;
