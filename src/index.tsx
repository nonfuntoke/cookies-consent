import React from 'react'
import ReactDOM from 'react-dom'
import CookiesConsentBanner from './CookiesConsentBanner'

document.addEventListener('DOMContentLoaded', function() {
    const element = document.getElementById('cookies-consent-banner')
    if (element) {
        ReactDOM.render(<CookiesConsentBanner />, element)
    }
})