
import {render,screen,cleanup} from "@testing-library/react"
import {BrowserRouter,Routes,Route} from "react-router-dom"

import '@testing-library/jest-dom'

import Signup from "../src/Pages/Signup"


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





test("Should Render Signup component",()=>{
    render(  <BrowserRouter>
        <Routes>   
            <Route path="*" element= {<Signup/>}/>
        </Routes>
    </BrowserRouter>)

    const signupElement=screen.getByTestId("Signup-1")
    expect(signupElement).toBeInTheDocument()
    expect(signupElement).toHaveTextContent("Create your Account")

})         