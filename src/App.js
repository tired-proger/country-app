import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import "./App.scss"
import CardCountry from './components/Card/CardCountry'
import Content from './components/Content/Content'
import Header from './components/Header/Header'
import NotFoundPage from './components/NotFoundPage/NotFoundPage'

function App() {

  return (
    <BrowserRouter>
      <main className="main">
        <Header />
        <Routes>
          <Route path="/" element={<Content />} />
          <Route path="/country/:name" element={<CardCountry />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
