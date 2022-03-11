import Blogform from '../components/blog_stuff/Blogform'
import userEvent from '@testing-library/user-event'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'


test('try if form input works on initial page load', () => {
    render(<Blogform />)

    const sampleTitle = 'sample title'
    const sampleAuthor = 'sample author'
    const sampleContent = 'sample content'

    const titleInput = screen.getByLabelText(/title:/i)
    const authorInput = screen.getByLabelText(/author:/i)
    const contentInput = screen.getByLabelText(/content:/i)

    userEvent.type(titleInput, sampleTitle)
    userEvent.type(authorInput, sampleAuthor)
    userEvent.type(contentInput, sampleContent)

    expect(titleInput).toHaveValue(sampleTitle)
    expect(authorInput).toHaveValue(sampleAuthor)
    expect(contentInput).toHaveValue(sampleContent)
    
    const buttonCheck = screen.getByText(/make a blog/i)
    expect(buttonCheck).toBeVisible()
})