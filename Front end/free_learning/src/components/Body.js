import { useEffect, useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom';

import {AboutUs} from './AboutUs'
import {Home} from './Home'
import {ContactUs} from './ContactUs'
import {Root} from './Root'
import {Error404} from './Error404'
import {Course} from './Course'
import {Profile} from './user/Profile'
import {Edit} from './user/Edit'
import {Markdown} from './user/Markdown';
import {Blog} from './user/Blog';

export function Body() {

  return(
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/aboutUs" element={<AboutUs/>}/>
      <Route path="/contactUs" element={<ContactUs/>}/>
      <Route path="/root" element={<Root/>}/>
      <Route path="/course" element={<Course/>}/>
      <Route path="/user/profile" element={<Profile/>}/>
      <Route path="/user/edit" element={<Edit/>}/>      
      <Route path="/markdown" element={<Markdown/>}/>
      <Route path="/blog" element={<Blog/>}/>
      <Route path="/:error" element={<Error404/>}/>

    </Routes>
  )
}