import Login from "./Login"
import { fireEvent, render, screen, waitFor } from "@testing-library/react"

jest.mock("axios", ()=>({
    __esModule: true,

    default:{
        get: ()=> ({
            data:{id:1, name: "John"},
        }),
    },
}));


test("username should be rendered",()=> {
    render(<Login/>)
    const userInput = screen.getByPlaceholderText(/username/i)
    expect(userInput).toBeInTheDocument()
})

test("password should be rendered",()=> {
    render(<Login/>)
    const userPassword = screen.getByPlaceholderText(/password/i)
    expect(userPassword).toBeInTheDocument()
})

test("button should be rendered",()=> {
    render(<Login/>)
    const buttonElement = screen.getByRole("button")
    expect(buttonElement).toBeInTheDocument()
})

test("username input should be empty",()=> {
    render(<Login/>)
    const userInput = screen.getByPlaceholderText(/username/i)
    expect(userInput.value).toBe("")
})

test("password input should be empty",()=> {
    render(<Login/>)
    const userPassword = screen.getByPlaceholderText(/password/i)
    expect(userPassword.value).toBe("")
})

test("button should be disabled if inputs not filled",()=> {
    render(<Login/>)
    const buttonElement = screen.getByRole("button")
    expect(buttonElement).toBeDisabled()
})

test("loading... should not be rendered when opening app",()=> {
    render(<Login/>)
    const buttonElement = screen.getByRole("button")
    expect(buttonElement).not.toHaveTextContent(/loading/i)
})

test("error msg should not be visible when opening app",()=> {
    render(<Login/>)
    const errorMsg = screen.getByTestId("error")
    expect(errorMsg).not.toBeVisible()
})

test("username input should change when typed",()=> {
    render(<Login/>)
    const userName = screen.getByPlaceholderText(/username/i)
    const testValue = "test";

    fireEvent.change(userName, {target:{value:testValue}})
    expect(userName.value).toBe(testValue)
})

test("password input should change when typed",()=> {
    render(<Login/>)
    const userPassword = screen.getByPlaceholderText(/password/i)
    const testValue = "test";

    fireEvent.change(userPassword, {target:{value:testValue}})
    expect(userPassword.value).toBe(testValue)
})

test("button should not be disabled if inputs are filled",()=> {
    render(<Login/>)
    const buttonElement = screen.getByRole("button")
    const userName = screen.getByPlaceholderText(/username/i)
    const userPassword = screen.getByPlaceholderText(/password/i)
    const testValue = "test";

    fireEvent.change(userName, {target:{value:testValue}})
    fireEvent.change(userPassword, {target:{value:testValue}})
    expect(buttonElement).not.toBeDisabled()
})

test("loading should be rendered when click",()=> {
    render(<Login/>)
    const buttonElement = screen.getByRole("button")
    const userName = screen.getByPlaceholderText(/username/i)
    const userPassword = screen.getByPlaceholderText(/password/i)
    const testValue = "test";

    fireEvent.change(userName, {target:{value:testValue}})
    fireEvent.change(userPassword, {target:{value:testValue}})
    fireEvent.click(buttonElement);
    expect(buttonElement).toHaveTextContent(/loading/i)
})

test("loading should not be rendered after fetching", async ()=> {
    render(<Login/>)
    const buttonElement = screen.getByRole("button")
    const userName = screen.getByPlaceholderText(/username/i)
    const userPassword = screen.getByPlaceholderText(/password/i)
    const testValue = "test";

    fireEvent.change(userName, {target:{value:testValue}})
    fireEvent.change(userPassword, {target:{value:testValue}})
    fireEvent.click(buttonElement);

    await waitFor(()=> expect(buttonElement).not.toHaveTextContent(/loading/i))
})

test("user should be rendered after fetching", async ()=> {
    render(<Login/>)
    const buttonElement = screen.getByRole("button")
    const userName = screen.getByPlaceholderText(/username/i)
    const userPassword = screen.getByPlaceholderText(/password/i)
    const testValue = "test";

    fireEvent.change(userName, {target:{value:testValue}})
    fireEvent.change(userPassword, {target:{value:testValue}})
    fireEvent.click(buttonElement);

    const userItem = await screen.findByText("John")
    expect(userItem).toBeInTheDocument()
})