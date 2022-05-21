import { useState } from 'react';

import {NavBar} from './Header'
import {Footer} from './Footer'
import {Body} from './Body'

export function LayoutDefault() {
  return (
    <div className="App">
      <NavBar/>
      <Body/>
      <Footer/>
    </div>
  )
}