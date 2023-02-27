
import {render,screen,cleanup} from "@testing-library/react"
import {BrowserRouter,Routes,Route} from "react-router-dom"

import '@testing-library/jest-dom'

import ViewAppointment from "../src/Pages/ViewAppointment"



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
            <Route path="*" element= {<ViewAppointment/>}/>
        </Routes>
    </BrowserRouter>)

    const viewAptElement=screen.getByTestId("viewApt-1")
    expect(viewAptElement).toBeInTheDocument()

})         