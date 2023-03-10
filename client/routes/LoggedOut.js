import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Stack from '@mui/material/Stack'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import SupportAgentIcon from '@mui/icons-material/SupportAgent'

import Link from '~/components/Link'
import QuickSignupForm from '../components/QuickSignupForm'
import AppLogo from '../components/DataPalLogo.js'
import ottoOrange from '../media/otto/orange.png'
import DataPalBanner from '~/components/DataPalBanner'

export default function HomePage() {
  return <Stack>
    <DataPalBanner/>
    <ColorBlock bg="primary.main" text="white">
      <Stack direction="column" alignItems="flex-end">
        <Stack direction="row">
          <Box sx={{whiteSpace: 'nowrap', textAlign: 'right'}}>
            <Typography variant="h1" sx={{fontSize: {xs: 60, md: 80}}} my={2}>Own Your Data</Typography>
            <Typography variant="h4" sx={{fontSize: {xs: 30, md: 40}}} my={2}>Designed to protect you.</Typography>
            <Typography variant="h4" sx={{fontSize: {xs: 30, md: 40}}} my={2}>Built for security.</Typography>
            <Typography variant="h4" sx={{fontSize: {xs: 30, md: 40}}} my={2}>Welcome to the platform.</Typography>
          </Box>
        </Stack>
      </Stack>
    </ColorBlock>
    <ColorBlock bg="secondary.dark">
      <Typography variant="h3" my={2}>Security</Typography>
      <Typography variant="body1">
        Irure labore et commodo adipisicing. Aliqua excepteur aliqua velit tempor do
        ullamco id commodo exercitation ut ipsum id enim. Pariatur labore Lorem ea eu
        est fugiat laborum commodo sunt esse ex magna. Eu enim voluptate esse irure
        reprehenderit mollit tempor fugiat anim. Nulla proident cillum deserunt magna
        veniam veniam labore tempor irure. Sunt dolore tempor nulla do enim
        consectetur in ea sunt. Aliqua nostrud occaecat laboris ipsum ullamco velit
        dolore.
      </Typography>
    </ColorBlock>
    <ColorBlock bg="primary.light" text="black">
      <Typography variant="h3" my={2}>Open</Typography>
      <Typography variant="body1">
        Irure labore et commodo adipisicing. Aliqua excepteur aliqua velit tempor do
        ullamco id commodo exercitation ut ipsum id enim. Pariatur labore Lorem ea eu
        est fugiat laborum commodo sunt esse ex magna. Eu enim voluptate esse irure
        reprehenderit mollit tempor fugiat anim. Nulla proident cillum deserunt magna
        veniam veniam labore tempor irure. Sunt dolore tempor nulla do enim
        consectetur in ea sunt. Aliqua nostrud occaecat laboris ipsum ullamco velit
        dolore.
      </Typography>
    </ColorBlock>
    <ColorBlock bg="secondary.dark">
      <Typography variant="h3" my={2}>Distributed</Typography>
      <Typography variant="body1">
        Irure labore et commodo adipisicing. Aliqua excepteur aliqua velit tempor do
        ullamco id commodo exercitation ut ipsum id enim. Pariatur labore Lorem ea eu
        est fugiat laborum commodo sunt esse ex magna. Eu enim voluptate esse irure
        reprehenderit mollit tempor fugiat anim. Nulla proident cillum deserunt magna
        veniam veniam labore tempor irure. Sunt dolore tempor nulla do enim
        consectetur in ea sunt. Aliqua nostrud occaecat laboris ipsum ullamco velit
        dolore.
      </Typography>
    </ColorBlock>
  </Stack>
}


function ColorBlock({ bg, text, children, ...props }){
  return <Box sx={{
    ...props,
    p: 4,
    backgroundColor: bg,
    color: text,
  }}>
    <Container maxWidth="lg">{children}</Container>
  </Box>
}
