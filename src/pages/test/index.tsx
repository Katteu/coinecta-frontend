import React, { useState } from 'react';
import { Box, TextField, Button, List, ListItem, Typography } from "@mui/material";
import { trpc } from '@lib/utils/trpc'; 

const Test = () => {
  const [name, setName] = useState('');
  const addTestData = trpc.test.addTestData.useMutation();
  const { data, refetch } = trpc.test.getTestData.useQuery();

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    if (name.trim()) {
      await addTestData.mutateAsync({ name });
      setName('');
      refetch();
    }
  };

  return (
    <Box sx={{ paddingTop: '30px', mx: '30%' }}>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          variant="outlined"
          fullWidth
        />
        <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
          Submit
        </Button>
      </form>
      <Typography variant='h4' sx={{ mt: 2 }}>List of Names</Typography>
      <List>
        {data?.map((item) => (
          <ListItem key={item.id}>{item.name}</ListItem>
        ))}
      </List>
    </Box>
  );
};

export default Test;
