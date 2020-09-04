import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, prettyDOM, fireEvent } from '@testing-library/react'
import Blog from './Blog'

describe('test blog component', () => {
    let component = null
    const handleLikes = jest.fn()
    const removeBlog = jest.fn()
    beforeEach( () => {
        const blog = {
            title: 'Test blog',
            author: 'Test user',
            content: 'This is just a test blog',
            url: 'http://test.io',
            likes: '23',
            user: {
                username: 'testuser',
                name: 'user'
            } 
        }
        const functions = {handleLikes, removeBlog}
        const user = {username: 'testuser', name:'user'}
        component = render(<Blog blog={blog} user={user} functions={functions}/>)
    })
    test('display title only initialy', () => {
        const fullBlogComponent = component.container.querySelector('.fullBlogContainer')
        
        expect(component.container).toHaveTextContent('Test blog')
        expect(fullBlogComponent).toHaveStyle('display: none')
    })
    
    test('full blog is displayed', () => {    
        const button = component.container.querySelector('button')
        const fullBlogComponent = component.container.querySelector('.fullBlogContainer')
        fireEvent.click(button)
        expect(fullBlogComponent).toHaveStyle('display: block')
    })
    test('like button functionality', () => {
        const button = component.container.querySelector('button')
        const fullBlogComponent = component.container.querySelector('.fullBlogContainer')
        fireEvent.click(button)
        const likeButton = fullBlogComponent.querySelector('button')
        fireEvent.click(likeButton)
        fireEvent.click(likeButton)
        console.log(handleLikes.mock.calls[0])
        expect(handleLikes.mock.calls.length).toBe(2)
    })
})
