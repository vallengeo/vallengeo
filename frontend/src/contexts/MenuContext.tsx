import {
  createContext,
  useContext,
  useState,
} from "react";

interface IMenuContext {
  onHandleOpen: () => void;
  onHandleClosed: () => void;
  open: boolean;
}

const MenuContext = createContext<IMenuContext>({
  onHandleOpen: () => {},
  onHandleClosed: () => {},
  open: false,
});

interface IProps {
  children: React.ReactNode;
}

export function MenuProvider({ children }: IProps) {
  const [open, setOpen] = useState(false);

  function onHandleOpen() {
    setOpen(true);
  }

  function onHandleClosed() {
    setOpen(false);
  }

  return (
    <MenuContext.Provider value={{ onHandleOpen, onHandleClosed, open }}>
      {children}
    </MenuContext.Provider>
  );
}

export function useMenuState() {
  return useContext(MenuContext);
}
