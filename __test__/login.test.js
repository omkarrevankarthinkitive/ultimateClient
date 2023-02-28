
import {render,screen,cleanup} from "@testing-library/react"
import {BrowserRouter,Routes,Route} from "react-router-dom"

import '@testing-library/jest-dom'

import Login from "../src/Pages/Login"


const mockedUsedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
   ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUsedNavigate,
}));


const mockedUseHref = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useHref: () => mockedUseHref,
}));





test("Should Render Login component",()=>{
    render(  <BrowserRouter>
        <Routes>   
            <Route path="*" element= {<Login/>}/>
        </Routes>
    </BrowserRouter>)

    const loginElement=screen.getByTestId("login-1")
    expect(loginElement).toBeInTheDocument()
    expect(loginElement).toHaveTextContent("Welcome Back")

})         