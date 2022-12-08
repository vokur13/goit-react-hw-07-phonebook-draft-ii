import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { nanoid } from 'nanoid';
import { Box } from '../Box';
import { Label, Input } from './Filter.styled';

export const Filter = ({ onChange }) => {
  const filterID = nanoid();

  const { register, watch } = useForm();

  const watchFields = watch(['filter']);
  onChange(watchFields);

  useEffect(() => {
    const subscription = watch((value, { name, type }) =>
      console.log(value, name, type)
    );
    return () => subscription.unsubscribe();
  }, [watch]);

  return (
    <Box
      display="block"
      p={2}
      mb={3}
      bg="bgComponent"
      width="50%"
      borderRadius="normal"
      boxShadow="basic"
    >
      <Label htmlFor={filterID}>Find contacts by name</Label>
      <Input id={filterID} type="text" {...register('filter')} />
    </Box>
  );
};

Filter.propTypes = {
  onChange: PropTypes.func,
};
