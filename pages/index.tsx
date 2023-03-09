import Head from "next/head"
import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Paper from '@mui/material/Paper'

export default function HomePage() {
	return (
		<Container>
			<Head>
				<title>Create Next App</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<Box>
				<Typography variant="h1">
					Welcome to <a href="https://nextjs.org">
						Next.js!</a> integrated with{" "}
					<a href="https://mui.com/">Material-UI!</a>
				</Typography>
				<p>
					Get started by editing{" "}
					<code>
						pages/index.js</code>
				</p>

			</Box>
		</Container>
	)
}
