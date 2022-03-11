import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import Blog from '../components/Blog'

test('Check if blogpost properly displays information', () => {

    const testTitle = "test"
    const testAuthor = "j.k simmons"
    const testContent = "this is a blog"
    const testID = "5"

    render(<Blog title={testTitle} author={testAuthor} content={testContent} idStore={testID}/>)

    const updateButton = screen.getByText(/update/i)
    const deleteButton = screen.getByText(/delete/i)

    expect(updateButton).toBeVisible()
    expect(deleteButton).toBeVisible()

    const titleDiv = screen.getByTestId('title_element')
    const authorDiv = screen.getByTestId('author_element')
    const contentDiv = screen.getByTestId('content_element')

    expect(titleDiv.textContent).toEqual(testTitle)
    expect(authorDiv.textContent).toEqual(`by ${testAuthor}`)
    expect(contentDiv.textContent).toEqual(testContent)

})