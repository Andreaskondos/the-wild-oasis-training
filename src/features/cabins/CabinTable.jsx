import Spinner from "../../ui/Spinner";
import CabinRow from "./CabinRow";

import Table from "../../ui/Table";
import Empty from "../../ui/Empty";

import { useCabins } from "./useCabins";
import { useSearchParams } from "react-router-dom";

function CabinTable() {
  const { cabins, isLoading } = useCabins();
  const [searchParams] = useSearchParams();

  if (isLoading) return <Spinner />;
  if (!cabins.length) return <Empty resourceName="cabins" />;

  //FILTER
  const filterValue = searchParams.get("discount") || "all";

  let filteredCabins;
  if (filterValue === "all") filteredCabins = cabins;
  else if (filterValue === "no-discount")
    filteredCabins = cabins.filter((cabin) => !cabin.discount);
  else if (filterValue === "with-discount")
    filteredCabins = cabins.filter((cabin) => cabin.discount > 0);
  else filteredCabins = [];

  //SORT
  const [sortByValue, direction] = (
    searchParams.get("sortBy") || "startDate-asc"
  ).split("-");
  const modifier = direction === "asc" ? 1 : -1;

  const sortedCabins =
    typeof filteredCabins?.[0][sortByValue] === "string"
      ? filteredCabins?.sort(
          (a, b) =>
            a[sortByValue]
              .toLowerCase()
              .localeCompare(b[sortByValue].toLowerCase()) * modifier
        )
      : filteredCabins?.sort(
          (a, b) => (a[sortByValue] - b[sortByValue]) * modifier
        );

  return (
    <Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
      <Table.Header>
        <div></div>
        <div>Cabins</div>
        <div>Capacity</div>
        <div>Price</div>
        <div>Discount</div>
        <div></div>
      </Table.Header>
      <Table.Body
        // data={cabins}
        // data={filteredCabins}
        data={sortedCabins}
        render={(cabin) => <CabinRow key={cabin.id} cabin={cabin} />}
      />
    </Table>
  );
}

export default CabinTable;
