
import {render,screen,cleanup} from "@testing-library/react"
import {BrowserRouter,Routes,Route} from "react-router-dom"

import '@testing-library/jest-dom'

import Appoint from "../src/Pages/Appoint"


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
            <Route path="*" element= {<Appoint/>}/>
        </Routes>
    </BrowserRouter>)

    const aptElement=screen.getByTestId("apt-1")
    expect(aptElement).toBeInTheDocument()

})         