import { useMemo, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useGetContactsQuery } from 'redux/contacts/contacts';
import {
  contactsOperations,
  contactsSelectors,
  contactsSlice,
} from 'redux/contacts';
import { Box } from 'components/Box';
import { ContactForm } from 'components/ContactForm';
import { Filter } from 'components/Filter';
import { ContactList } from 'components/ContactList';
import { nanoid } from 'nanoid';

export const App = () => {
  const [contactData, setContactData] = useState({});
  const { data, error, isLoading } = useGetContactsQuery();

  // const dispatch = useDispatch();
  // const isLoading = useSelector(contactsSelectors.selectIsLoading);
  // const error = useSelector(contactsSelectors.selectError);
  // const items = useSelector(contactsSelectors.selectContacts);
  // const filter = useSelector(contactsSelectors.selectFilter);

  // useEffect(() => {
  //   dispatch(contactsOperations.fetchContacts());
  // }, [dispatch]);

  function handleSubmit({ lastName, firstName, phone }) {
    setContactData({ lastName, firstName, phone });
    // const checkName = items.some(
    //   item =>
    //     item.lastName.toLowerCase().trim() === lastName.toLowerCase().trim() &&
    //     item.firstName.toLowerCase().trim() === firstName.toLowerCase().trim()
    // );
    // checkName
    //   ? alert(`${(lastName, firstName)} is already in contacts`)
    //   : dispatch(
    //       contactsOperations.addContact({
    //         id: nanoid(),
    //         lastName,
    //         firstName,
    //         phone,
    //       })
    //     );
  }

  function onFilterChange([value]) {
    // !value
    //   ? dispatch(contactsSlice.findContact((value = '')))
    //   : dispatch(contactsSlice.findContact(value));
    // skip: value===''
  }

  // const filteredItems = useMemo(() => {
  //   if (filter) {
  //     return items.filter(item => {
  //       return item.lastName
  //         .toLowerCase()
  //         .trim()
  //         .includes(filter.toLowerCase().trim());
  //     });
  //   }
  //   return items;
  // }, [filter, items]);

  function handleDelete(itemID) {
    // dispatch(contactsOperations.deleteContact(itemID));
  }

  return (
    <Box width={1} p={4} bg="bgBasic" as="main">
      {error && <p>{error}</p>}
      <h1>Phonebook</h1>
      <ContactForm onFormSubmit={handleSubmit} />
      {/* <ContactForm /> */}
      <h2>Contacts</h2>
      <Filter onChange={onFilterChange} />
      {isLoading && <p>Loading contacts...</p>}
      {data && data.length > 0 && (
        <ContactList onDelete={handleDelete} list={data} />
      )}
    </Box>
  );
};
