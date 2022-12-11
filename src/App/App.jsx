import { useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  useGetContactsQuery,
  useAddContactMutation,
} from 'redux/contacts/contacts';
import { contactsSelectors, contactsSlice } from 'redux/contacts';
import { Box } from 'components/Box';
import { ContactForm } from 'components/ContactForm';
import { Filter } from 'components/Filter';
import { ContactList } from 'components/ContactList';
import { nanoid } from 'nanoid';

export const App = () => {
  const dispatch = useDispatch();
  const { data, error, isUninitialized, isFetching } = useGetContactsQuery('', {
    // skip: '' === '',
    // pollingInterval: 3000,
    // refetchOnFocus: true,
    refetchOnReconnect: true,
  });

  const [addContact, { isLoading }] = useAddContactMutation();
  const filter = useSelector(contactsSelectors.selectFilter);
  const notify = text => toast(text);

  console.log(isUninitialized);

  async function handleSubmit({ lastName, firstName, phone }) {
    try {
      const checkName = data.some(
        item =>
          item.lastName.toLowerCase().trim() ===
            lastName.toLowerCase().trim() &&
          item.firstName.toLowerCase().trim() === firstName.toLowerCase().trim()
      );
      checkName
        ? alert(`${(lastName, firstName)} is already in contacts`)
        : await addContact(
            {
              id: nanoid(),
              lastName,
              firstName,
              phone,
            },
            notify(`Contact ${lastName} ${firstName} created`)
          );
    } catch (error) {
      console.log(error.message);
    }
  }

  function onFilterChange([value]) {
    dispatch(contactsSlice.findContact(value));

    // !value
    //   ? dispatch(contactsSlice.findContact((value = '')))
    //   : dispatch(contactsSlice.findContact(value));
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
      <ToastContainer />
      {error && <p>{error}</p>}
      <h1>Phonebook</h1>
      <ContactForm onFormSubmit={handleSubmit} isLoading={isLoading} />
      <h2>Contacts</h2>
      <Filter onChange={onFilterChange} />
      {isFetching && <p>Loading contacts...</p>}
      {data && data.length > 0 && <ContactList list={filteredItems} />}
    </Box>
  );
};
