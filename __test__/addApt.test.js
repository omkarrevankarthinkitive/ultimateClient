
import {render,screen,cleanup} from "@testing-library/react"
import {BrowserRouter,Routes,Route} from "react-router-dom"

import '@testing-library/jest-dom'

import {HorizontalNonLinearStepper} from "../src/Pages/AddAppointment"


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





test("Should Render addApt component",()=>{
    render(  <BrowserRouter>
        <Routes>   
            <Route path="*" element= {<HorizontalNonLinearStepper/>}/>
        </Routes>
    </BrowserRouter>)

    const addAptElement=screen.getByTestId("addApt-1")
    expect(addAptElement).toBeInTheDocument()

})         