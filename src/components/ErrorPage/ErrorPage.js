import React from 'react'
import errorPage from '../../images/404-page-not-found.jpg'
function ErrorPage() {
  return (
    <section className='error-page'>
        <img src={errorPage} alt="" className='img-fluid'/>
    </section>
  )
}

export default ErrorPage