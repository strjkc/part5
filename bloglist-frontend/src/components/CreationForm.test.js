import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, prettyDOM, fireEvent } from '@testing-library/react'
import CreationFrom from './CreationForm'

describe('creation form tests', () => {
    let component = null
    const appendBlog = jest.fn()
    beforeEach( () => {
        component = render(<CreationFrom appendBlog={appendBlog}/>)
    })
    test('append function is called on submission', () => {
        const form = component.container.querySelector('form')
        const title = component.container.querySelector('#title-input')
        const author = component.container.querySelector('#author-input')
        const content = component.container.querySelector('#content-input')
        const url = component.container.querySelector('#url-input')
        const inputs = [[title, 'Title'], [author, 'Author'], [content, 'Content'], [url, 'Url']]
        const blogContent = { title: 'Title', author: 'Author', content: 'Content', url: 'Url' }
        for (let i = 0; i < inputs.length; i++)
        {
            fireEvent.change(inputs[i][0], {
                target: {value: inputs[i][1] }
        })
    }
        
        fireEvent.submit(form)
        expect(appendBlog.mock.calls.length).toBe(1)
        expect(appendBlog.mock.calls[0][0]).toEqual(blogContent)
    })
})