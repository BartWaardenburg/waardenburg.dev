import * as React from 'react';

import Head from 'next/head';

import { ThemeProvider } from 'styled-components';
import { ApolloProvider } from '@apollo/react-hooks';

import withData from '../utils/apollo';

import Nav from '../components/Nav';

const theme = {
	colors: {
		primary: '#0070f3',
	},
};

const App = ({ Component, pageProps, apollo }) => {
	return (
		<ApolloProvider client={apollo}>
			<ThemeProvider theme={theme}>
				<Head>
					<title>Waardenburg.dev</title>
					<meta
						name="viewport"
						content="initial-scale=1.0, width=device-width"
					/>
				</Head>
				<Nav />
				<Component {...pageProps} />
			</ThemeProvider>
		</ApolloProvider>
	);
};

export default withData(App);
