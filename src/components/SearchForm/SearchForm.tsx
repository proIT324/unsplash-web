import React, { useState } from 'react'
import { IconButton, TextField } from '@material-ui/core';
import { SearchRounded } from '@material-ui/icons';
import { SearchFormProps } from './SearchForm.d';
import { Container } from './SearchForm.styled'

const SearchForm: React.FC<SearchFormProps> = ({ onSubmit }) => {
  const [text, setText] = useState<string>('');

  return (
    <Container>
      <TextField id="standard-basic" label="Search..." value={text} onChange={e => setText(e.target.value)} />
      <IconButton aria-label="search" onClick={() => onSubmit(text)}>
        <SearchRounded />
      </IconButton>
    </Container>
  )
}

export default SearchForm;