import { useEffect, useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom';

import {Search} from './Search'
import {Home} from './Home'
import {ContactUs} from './ContactUs'
import {Root} from './Root'
import {Error404} from './Error404'
import {Course} from './Course'
import {Profile} from './user/Profile'
import {Edit} from './user/Edit'
import {Markdown} from './user/Markdown';
import {Blog} from './user/Blog';
import {File} from './user/File';
import {Notifications} from './user/Notifications';
import { LessionEdit } from './user/LessonEdit';

import * as API from '../constants/api_config'

export function Body() {

  return(
    <Routes>
      <Route path="/" element={<Root/>}/>
      <Route path="/search" element={<Search/>}/>
      <Route path="/contactUs" element={<ContactUs/>}/>
      <Route path="/root" element={<Root/>}/>
      <Route path="/course" element={<Home/>}/>  
      <Route path="/markdown" element={<Markdown/>}/>
      <Route path="/blog" element={<Notifications/>}/>
      <Route path="/user/get-one-lession" element={<Blog api={API.GET_ONE_LESSION + window.localStorage.getItem("FREE_LEARNING_ID_FOUND")}/>}/>
      <Route path="/user/find-one" element={<Profile api={API.FIND_ONE + window.localStorage.getItem("FREE_LEARNING_ID_FOUND")}/>}/>
      <Route path="/user/edit-lession" element={<LessionEdit lession_id={window.localStorage.getItem("FREE_LEARNING_ID_EDIT")}/>}/>
      {window.localStorage.getItem("FREE_LEARNING_TOKEN") &&
        <Route path="/user/profile" element={<Profile api={API.PROFILE}/>}/>
      }
      {window.localStorage.getItem("FREE_LEARNING_TOKEN") &&
        <Route path="/user/edit" element={<Edit/>}/>   
      }
      <Route path="/file" element={<File/>}/>
      <Route path="/:error/*" element={<Error404/>}/>
 
    </Routes>
  )
}