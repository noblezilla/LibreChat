import { render, screen } from '@testing-library/react';
import CitationsBlock from '../CitationsBlock';

describe('CitationsBlock', () => {
  it('renders nothing when citations are absent', () => {
    const { container } = render(<CitationsBlock citations={[]} />);
    expect(container).toBeEmptyDOMElement();
  });

  it('renders a list of citations with metadata', () => {
    render(
	      <CitationsBlock
	        citations={[
	          {
	            id: 'OBC-3.2.2.20',
	            label: 'Fire separations between occupancies',
	            section: 'Division B, Part 3, Article 3.2.2.20',
	            snippet: 'Every dwelling unit shall be separated from the remainder of the building...',
	            page: 12,
	            url: 'https://example.test/obc/3-2-2-20',
	          },
	        ]}
	      />,
    );

    expect(screen.getByRole('heading', { name: /Citations/i })).toBeInTheDocument();
    expect(
      screen.getByText('Fire separations between occupancies', { selector: 'div' }),
    ).toBeInTheDocument();
	    expect(
	      screen.getByText('(Division B, Part 3, Article 3.2.2.20)', { selector: 'span' }),
	    ).toBeInTheDocument();
	    expect(screen.getByText('(p. 12)', { selector: 'span' })).toBeInTheDocument();
	    expect(screen.getByText(/Every dwelling unit shall/)).toBeInTheDocument();
    const link = screen.getByRole('link', { name: /View Source/i });
    expect(link).toHaveAttribute('href', 'https://example.test/obc/3-2-2-20');
  });
});
