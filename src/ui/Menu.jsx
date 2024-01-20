import styled from "styled-components";
import { createContext, useContext, useState } from "react";
import { useOnClickOutside } from "../hooks/useOnClickOutside";
// import { createPortal } from "react-dom";

const StyledMenu = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  /* Only if we dont use createPortal */
  position: relative;
`;

const StyledToggle = styled.button`
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);
  transform: translateX(0.8rem);
  transition: all 0.2s;

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--color-grey-700);
  }
`;

const StyledList = styled.ul`
  width: max-content;
  position: absolute; /*  fixed if we use createPortal */
  /* z-index use if we dont use createPortal */
  z-index: 99;
  background-color: var(--color-grey-0);
  box-shadow: var(--shadow-md);
  border-radius: var(--border-radius-md);

  right: ${(props) => props.position.x}px;
  top: ${(props) => props.position.y}px;
`;

const StyledButton = styled.button`
  width: 100%;
  text-align: left;
  background: none;
  border: none;
  padding: 1.2rem 2.4rem;
  font-size: 1.4rem;
  transition: all 0.2s;

  display: flex;
  align-items: center;
  gap: 1.6rem;

  &:hover {
    background-color: var(--color-grey-50);
  }

  & svg {
    width: 1.6rem;
    height: 1.6rem;
    color: var(--color-grey-400);
    transition: all 0.3s;
  }
`;

const MenuContext = createContext();

function Menu({ children }) {
  const [openId, setOpenId] = useState("");
  const [position, setPosition] = useState({ x: 20, y: 20 });
  const close = () => setOpenId("");
  const open = setOpenId;

  return (
    <MenuContext.Provider
      value={{ open, close, openId, position, setPosition }}
    >
      <StyledMenu>{children}</StyledMenu>
    </MenuContext.Provider>
  );
}

function Toggle({ id, children }) {
  const { open, close, openId, setPosition } = useContext(MenuContext);

  function handleClick(e) {
    e.stopPropagation();
    const rect = e.target.closest("button").getBoundingClientRect();

    if (openId === "" || openId !== id) {
      setPosition({
        x: 0,
        y: rect.height,
        // This is if we do it with createPortal and child of document.body
        // x: window.innerWidth - rect.right,
        // y: rect.bottom,
      });
      open(id);
    } else close();
  }

  return <StyledToggle onClick={handleClick}>{children}</StyledToggle>;
}
function List({ id, children }) {
  const { close, openId, position } = useContext(MenuContext);
  const ref = useOnClickOutside(close, false);

  if (id !== openId) return null;

  return (
    <StyledList position={position} ref={ref}>
      {children}
    </StyledList>
  );
  // return createPortal(
  //   <StyledList position={position} ref={ref}>
  //     {children}
  //   </StyledList>,
  //   document.body
  // );
}
function Button({ icon, children, disabled, onClick }) {
  const { close } = useContext(MenuContext);

  function handleClick() {
    onClick?.();
    close();
  }
  return (
    <li>
      <StyledButton disabled={disabled} onClick={handleClick}>
        {icon}
        <span>{children}</span>
      </StyledButton>
    </li>
  );
}

Menu.Toggle = Toggle;
Menu.List = List;
Menu.Button = Button;

export default Menu;
