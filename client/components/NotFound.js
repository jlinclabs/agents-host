import * as React from 'react'
import Stack from '@mui/material/Stack'

import Heading from '~/components/Heading'

export default function NotFound(props){
  {/* TODO: move this to an embeded SVG so we dont need to load an external asset */}
  return <Stack
    direction="column"
    alignItems="center"
    justifyContent="center"
    {...props}
  >
    <Stack direction="row" spacing={2} alignItems="center" sx={{my: 4}}>
      <Heading variant="main">Not Found</Heading>
    </Stack>
    <Heading variant="sub">The page or resource you are looking for wasn't found.</Heading>
  </Stack>
}
