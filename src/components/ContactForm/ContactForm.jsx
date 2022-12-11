import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import PropTypes from 'prop-types';
import { nanoid } from 'nanoid';
import { Box } from '../Box';
import { Form, Label, Input } from './ContactForm.styled';
import { Button } from '../Button';

export const ContactForm = ({ onFormSubmit, isLoading }) => {
  const lastNameId = nanoid();
  const firstNameId = nanoid();
  const phoneID = nanoid();

  //   const [isActive, setIsActive] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    //     watch,
    formState,
    formState: { errors, isSubmitSuccessful },
  } = useForm({ defaultValues: { lastName: '', firstName: '', phone: '' } });

  const onSubmit = data => {
    onFormSubmit(data);
  };

  useEffect(() => {
    if (formState.isSubmitSuccessful) {
      reset({ lastName: '', firstName: '', phone: '' });
    }
  }, [formState, isSubmitSuccessful, reset]);

  return (
    <Box
      display="block"
      p={2}
      mb={4}
      bg="bgComponent"
      width="50%"
      borderRadius="normal"
      boxShadow="basic"
    >
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Label htmlFor={lastNameId}>Last name</Label>
        <Input
          id={lastNameId}
          type="text"
          title="Last name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          {...register('lastName', {
            required: true,
            pattern:
              /^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$/i,
          })}
          aria-invalid={errors.lastName ? 'true' : 'false'}
        />
        {errors.lastName?.type === 'required' && (
          <p role="alert">Last name is required</p>
        )}
        <Label htmlFor={firstNameId}>First name</Label>
        <Input
          id={firstNameId}
          type="text"
          title="First name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          {...register('firstName', {
            required: true,
            pattern:
              /^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$/i,
          })}
          aria-invalid={errors.firstName ? 'true' : 'false'}
        />
        {errors.firstName?.type === 'required' && (
          <p role="alert">First name is required</p>
        )}
        <Label htmlFor={phoneID}>Number</Label>
        <Input
          id={phoneID}
          type="tel"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          {...register('phone', {
            required: 'Phone number is required',
            pattern:
              /\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}/i,
          })}
          aria-invalid={errors.phone ? 'true' : 'false'}
        />
        {errors.phone && <p role="alert">{errors.phone?.message}</p>}
        <Button type="submit" disabled={isLoading}>
          Add contact
        </Button>
      </Form>
    </Box>
  );
};

// disabled={!data}

ContactForm.propTypes = {
  onFormSubmit: PropTypes.func.isRequired,
};
