import { createContext, useState } from "react";

export const UserContext = createContext({});

const ContextProvider = ({ children }) => {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState(null);
  const [description, setDescription] = useState("");
  const [isCompleted, setIsCompleted] = useState(false);
  const [isImportant, setIsImportant] = useState(false);
  const [update,setUpdate]=useState(false)
  const [id, setID] = useState(null);

  return (
    <UserContext.Provider
      value={{
        title,
        setTitle,
        date,
        setDate,
        description,
        setDescription,
        isCompleted,
        setIsCompleted,
        isImportant,
        setIsImportant,
        id,
        setID,
        update,
        setUpdate
      }}>
      {children}
    </UserContext.Provider>
  );
};

export default ContextProvider;
