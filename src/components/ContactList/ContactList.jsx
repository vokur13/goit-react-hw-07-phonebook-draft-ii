import { Box } from '../Box';
import { List } from './ContactList.styled';
import { ContactItem } from '../ContactItem';

export const ContactList = ({ list }) => {
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
          .map(item => <ContactItem key={item.id} {...item} />)
          .sort((a, b) => a.props.lastName.localeCompare(b.props.lastName))}
      </List>
    </Box>
  );
};
