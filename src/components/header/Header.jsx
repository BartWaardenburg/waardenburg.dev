/** @jsx jsx */
import * as React from 'react';
import { jsx } from '@emotion/core';

export const Header = () => (
	<div
		css={{
			backgroundColor: 'hotpink',
			'&:hover': {
				color: 'lightgreen',
			},
		}}
	>
		Header
	</div>
);
