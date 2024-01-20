import styled from "styled-components";
import {
  HiTrash,
  HiSquare2Stack,
  HiEllipsisVertical,
  HiPencil,
} from "react-icons/hi2";

import Spinner from "../../ui/Spinner";

import { formatCurrency } from "../../utils/helpers";
import { useDeleteCabin } from "./useDeleteCabin";
import { useCreateCabin } from "./useCreateCabin";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";
import Table from "../../ui/Table";
import Menu from "../../ui/Menu";
import CreateCabinForm from "./CreateCabinForm";

const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
`;

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Price = styled.div`
  font-family: "Sono";
  font-weight: 600;
`;

const Discount = styled.div`
  font-family: "Sono";
  font-weight: 500;
  color: var(--color-green-700);
`;

function CabinRow({ cabin }) {
  const { id, name, maxCapacity, regularPrice, discount, image, description } =
    cabin;
  const { isDeleting, deleteCabin } = useDeleteCabin();
  const { isCreating, createCabin } = useCreateCabin();
  const isWorking = isCreating || isDeleting;

  function handleDuplicate() {
    createCabin({
      name: `Copy of ${name}`,
      maxCapacity,
      regularPrice,
      discount,
      image,
      description,
    });
  }

  if (isWorking) return <Spinner />;

  return (
    <Table.Row role="row">
      <Img src={image} alt={`Cabin ${name} of The Wild Oasis`} />
      <Cabin>{name}</Cabin>
      <div>Fits up to {maxCapacity} guests</div>
      <Price>{formatCurrency(regularPrice)}</Price>
      {discount ? (
        <Discount>{formatCurrency(discount)}</Discount>
      ) : (
        <span>&mdash;</span>
      )}
      <div>
        <Modal>
          <Menu>
            <Menu.Toggle id={id}>
              <HiEllipsisVertical />
            </Menu.Toggle>
            <Menu.List id={id}>
              <Menu.Button
                disabled={isWorking}
                onClick={handleDuplicate}
                icon={<HiSquare2Stack />}
              >
                Duplicate
              </Menu.Button>

              <Modal.Open opens="cabin-edit">
                <Menu.Button disabled={isWorking} icon={<HiPencil />}>
                  Edit
                </Menu.Button>
              </Modal.Open>

              <Modal.Open opens="confirm-delete">
                <Menu.Button icon={<HiTrash />}>Delete</Menu.Button>
              </Modal.Open>
            </Menu.List>

            <Modal.Window name="cabin-edit">
              <CreateCabinForm cabinToEdit={cabin} />
            </Modal.Window>

            <Modal.Window name="confirm-delete">
              <ConfirmDelete
                resourceName={`Cabin #${name}`}
                disabled={isWorking}
                onConfirm={() => deleteCabin(id)}
              />
            </Modal.Window>
          </Menu>
        </Modal>
      </div>
    </Table.Row>
  );
}

export default CabinRow;
