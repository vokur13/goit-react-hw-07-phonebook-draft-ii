import { useMemo, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  useGetContactsQuery,
  useAddContactMutation,
  useDeleteContactMutation,
} from 'redux/contacts/contacts';
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
  const { data, error, isUninitialized, isFetching } = useGetContactsQuery('', {
    // skip: '' === '',
    // pollingInterval: 60000,
    // refetchOnFocus: true,
    // refetchOnReconnect: true,
  });
  console.log('data', data);
  const [addContact] = useAddContactMutation();
  const [deleteContact, { isLoading: isDeleting }] = useDeleteContactMutation();

  // const dispatch = useDispatch();
  // const isLoading = useSelector(contactsSelectors.selectIsLoading);
  // const error = useSelector(contactsSelectors.selectError);
  // const items = useSelector(contactsSelectors.selectContacts);
  // const filter = useSelector(contactsSelectors.selectFilter);

  // useEffect(() => {
  //   dispatch(contactsOperations.fetchContacts());
  // }, [dispatch]);

  function handleSubmit(person) {
    // const { data } = useAddContactMutation(item);
    const { one } = addContact(person);
    console.log('one', one);
    const checkName = data.some(
      item =>
        item.lastName.toLowerCase().trim() ===
          one.lastName.toLowerCase().trim() &&
        item.firstName.toLowerCase().trim() ===
          one.firstName.toLowerCase().trim()
    );
    // checkName
    // ? alert(`${(lastName, firstName)} is already in contacts`)
    // : dispatch(
    //     contactsOperations.addContact({
    //       id: nanoid(),
    //       lastName,
    //       firstName,
    //       phone,
    //     })
    //   );
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

  // function handleDelete(itemID) {
  //   dispatch(contactsOperations.deleteContact(itemID));
  // }

  return (
    <Box width={1} p={4} bg="bgBasic" as="main">
      {/* <button onClick={refetch} disabled={isUninitialized}>
        Refetch
      </button> */}
      {error && <p>{error}</p>}
      <h1>Phonebook</h1>
      <ContactForm onFormSubmit={handleSubmit} />
      {/* <ContactForm /> */}
      <h2>Contacts</h2>
      <Filter onChange={onFilterChange} />
      {isFetching && <p>Loading contacts...</p>}
      {data && data.length > 0 && (
        <ContactList
          onDelete={deleteContact}
          list={data}
          deleting={isDeleting}
        />
      )}
    </Box>
  );
};
