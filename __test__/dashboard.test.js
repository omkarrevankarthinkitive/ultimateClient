
import {render,screen,cleanup} from "@testing-library/react"
import {BrowserRouter,Routes,Route} from "react-router-dom"

import '@testing-library/jest-dom'

import DashBorad from "../src/Pages/DashBorad"


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





test("Should Render DashBoard component",()=>{
    render(  <BrowserRouter>
        <Routes>   
            <Route path="*" element= {<DashBorad/>}/>
        </Routes>
    </BrowserRouter>)

    const DashElement=screen.getByTestId("dash-1")
    expect(DashElement).toBeInTheDocument()
   

})         