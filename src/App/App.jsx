import { useMemo, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  fetchContacts,
  addContact,
  deleteContact,
} from 'redux/contacts/contactsOperations';
import {
  selectError,
  selectIsLoading,
  selectContacts,
} from 'redux/contacts/contactsSelectors';
import { Box } from '../components/Box';
import { ContactForm } from '../components/ContactForm';
import { Filter } from '../components/Filter';
import { ContactList } from '../components/ContactList';
import { nanoid } from 'nanoid';

import { findContact } from '../redux/contacts/contactsSlice';

export const App = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);
  const items = useSelector(selectContacts);
  const filter = useSelector(state => state.contacts.filter);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  function handleSubmit({ name, phone }) {
    const checkName = items.some(
      item => item.name.toLowerCase().trim() === name.toLowerCase().trim()
    );
    checkName
      ? alert(`${name} is already in contacts`)
      : dispatch(addContact({ id: nanoid(), name, phone }));
  }

  function onFilterChange([value]) {
    !value ? dispatch(findContact((value = ''))) : dispatch(findContact(value));
  }

  const filteredContacts = useMemo(() => {
    if (filter) {
      return items.filter(item => {
        return item.name
          .toLowerCase()
          .trim()
          .includes(filter.toLowerCase().trim());
      });
    }
    return items;
  }, [filter, items]);

  function handleDelete(itemID) {
    dispatch(deleteContact(itemID));
  }

  return (
    <Box width={1} p={4} bg="bgBasic" as="main">
      {error && <p>{error}</p>}
      <h1>Phonebook</h1>
      <ContactForm onFormSubmit={handleSubmit} />
      <h2>Contacts</h2>
      <Filter onChange={onFilterChange} />
      {isLoading && <p>Loading contacts...</p>}
      {items && items.length > 0 && (
        <ContactList onDelete={handleDelete} list={filteredContacts} />
      )}
    </Box>
  );
};
