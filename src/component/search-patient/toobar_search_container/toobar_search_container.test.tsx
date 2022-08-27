import React from 'react';
import { render, screen } from '@testing-library/react';

import {SearchInput} from './toolbar_search_container';


    const setupInput = async () => {
        render(
            <SearchInput onChangeInput={undefined} onClickChangeButton={undefined} children={undefined} />
        );
        return screen.getByPlaceholderText('Search...') as HTMLInputElement;
    };
    it('should render a search', () => {
        setupInput();
        expect(screen.getByRole('searchbox-result')).toBeInTheDocument();
      });

