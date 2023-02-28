
import {render,screen,cleanup} from "@testing-library/react"
import {BrowserRouter,Routes,Route} from "react-router-dom"

import '@testing-library/jest-dom'

import AddDoctors from "../src/Pages/AddDoctors"


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





test("Should Render addDoctor component",()=>{
    render(  <BrowserRouter>
        <Routes>   
            <Route path="*" element= {<AddDoctors/>}/>
        </Routes>
    </BrowserRouter>)

    const addDocElement=screen.getByTestId("addDoc-1")
    expect(addDocElement).toBeInTheDocument()

})         


// data-testid="login-1"