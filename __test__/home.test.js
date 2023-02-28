
import {render,screen,cleanup} from "@testing-library/react"
import {BrowserRouter,Routes,Route} from "react-router-dom"

import '@testing-library/jest-dom'

import Home from "../src/Pages/Home"



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





test("Should Render home component",()=>{
    render(  <BrowserRouter>
        <Routes>   
            <Route path="*" element= {<Home/>}/>
        </Routes>
    </BrowserRouter>)

    const homeElement=screen.getByTestId("home-1")
    expect(homeElement).toBeInTheDocument()

})         