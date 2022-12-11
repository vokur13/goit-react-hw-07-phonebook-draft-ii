import { useDeleteContactMutation } from 'redux/contacts/contacts';
import PropTypes from 'prop-types';
import { Item, Name, Number } from './ContactItem.styled';
import { Button } from '../Button';

export const ContactItem = ({ id, lastName, firstName, phone }) => {
  const [deleteContact, { isLoading: isDeleting }] = useDeleteContactMutation();

  return (
    <Item>
      <Name>{lastName + ', ' + firstName + ':'}</Name>
      <Number>{phone}</Number>
      <Button
        type="button"
        onClick={() => deleteContact(id)}
        disabled={isDeleting}
      >
        {isDeleting ? 'Deleting...' : 'Delete'}
      </Button>
    </Item>
  );
};

ContactItem.propTypes = {
  id: PropTypes.string.isRequired,
  createdAt: PropTypes.string,
  lastName: PropTypes.string.isRequired,
  firstName: PropTypes.string.isRequired,
  phone: PropTypes.string.isRequired,
};
