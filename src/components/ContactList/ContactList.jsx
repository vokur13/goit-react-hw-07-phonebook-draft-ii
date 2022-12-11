import PropTypes from 'prop-types';
import { Box } from '../Box';
import { List, Item, Name, Number } from './ContactList.styled';
import { Button } from '../Button';

export const ContactList = ({ list, onDelete, deleting }) => {
  return (
    <Box
      display="block"
      p={2}
      bg="bgComponent"
      width="50%"
      borderRadius="normal"
      boxShadow="basic"
    >
      <List>
        {list
          .map(item => (
            <Item key={item.id}>
              <Name>{item.lastName + ', ' + item.firstName + ':'}</Name>
              <Number>{item.phone}</Number>
              <Button type="button" onClick={() => onDelete(item.id)}>
                {deleting ? 'Deleting...' : 'Delete'}
              </Button>
            </Item>
          ))
          .sort((a, b) =>
            a.props.children[0].props.children.localeCompare(
              b.props.children[0].props.children
            )
          )}
      </List>
    </Box>
  );
};

ContactList.propTypes = {
  list: PropTypes.arrayOf(
    PropTypes.exact({
      id: PropTypes.string.isRequired,
      createdAt: PropTypes.string,
      lastName: PropTypes.string.isRequired,
      firstName: PropTypes.string.isRequired,
      phone: PropTypes.string.isRequired,
    })
  ),
  onDelete: PropTypes.func.isRequired,
};
