import { useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  useGetContactsQuery,
  useAddContactMutation,
  useDeleteContactMutation,
} from 'redux/contacts/contacts';
import { contactsSelectors, contactsSlice } from 'redux/contacts';
import { Box } from 'components/Box';
import { ContactForm } from 'components/ContactForm';
import { Filter } from 'components/Filter';
import { ContactList } from 'components/ContactList';
import { nanoid } from 'nanoid';

export const App = () => {
  const { data, error, isUninitialized, isFetching } = useGetContactsQuery('', {
    // skip: '' === '',
    // pollingInterval: 3000,
    // refetchOnFocus: true,
    // refetchOnReconnect: true,
  });
  const [addContact] = useAddContactMutation();
  const [deleteContact, { isLoading: isDeleting }] = useDeleteContactMutation();
  const dispatch = useDispatch();
  const filter = useSelector(contactsSelectors.selectFilter);

  function handleSubmit({ lastName, firstName, phone }) {
    const checkName = data.some(
      item =>
        item.lastName.toLowerCase().trim() === lastName.toLowerCase().trim() &&
        item.firstName.toLowerCase().trim() === firstName.toLowerCase().trim()
    );
    checkName
      ? alert(`${(lastName, firstName)} is already in contacts`)
      : addContact({
          id: nanoid(),
          lastName,
          firstName,
          phone,
        });
  }

  function onFilterChange([value]) {
    if (!isUninitialized) {
      !value
        ? dispatch(contactsSlice.findContact((value = '')))
        : dispatch(contactsSlice.findContact(value));
    }
  }

  const filteredItems = useMemo(() => {
    if (filter) {
      return data.filter(item => {
        return item.lastName
          .toLowerCase()
          .trim()
          .includes(filter.toLowerCase().trim());
      });
    }
    return data;
  }, [data, filter]);

  return (
    <Box width={1} p={4} bg="bgBasic" as="main">
      {/* <button onClick={refetch} disabled={isUninitialized}>
        Refetch
      </button> */}
      {error && <p>{error}</p>}
      <h1>Phonebook</h1>
      <ContactForm onFormSubmit={handleSubmit} />
      <h2>Contacts</h2>
      <Filter onChange={onFilterChange} />
      {isFetching && <p>Loading contacts...</p>}
      {data && data.length > 0 && (
        <ContactList
          onDelete={deleteContact}
          list={filteredItems}
          deleting={isDeleting}
        />
      )}
    </Box>
  );
};
