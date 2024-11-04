import React, { useState, useEffect } from "react"
import { X } from "lucide-react"
import { Button } from "./components/ui/button"
import { Switch } from "./components/ui/switch"
import { Label } from "./components/ui/label"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./components/ui/card"

export default function CookiesConsentBanner() {
  const [showBanner, setShowBanner] = useState(false)
  const [preferences, setPreferences] = useState({
    necessary: true,
    functional: false,
    analytics: false,
    marketing: false,
  })

  useEffect(() => {
    const consentGiven = localStorage.getItem("cookieConsent")
    if (!consentGiven) {
      setShowBanner(true)
    }
  }, [])

  const handleAcceptAll = () => {
    setPreferences({
      necessary: true,
      functional: true,
      analytics: true,
      marketing: true,
    })
    saveCookiePreferences()
  }

  const handleSavePreferences = () => {
    saveCookiePreferences()
  }

  const saveCookiePreferences = () => {
    localStorage.setItem("cookieConsent", JSON.stringify(preferences))
    setShowBanner(false)
    // Here you would typically set the actual cookies based on preferences
    console.log("Saving preferences:", preferences)
  }

  const togglePreference = (key: keyof typeof preferences) => {
    setPreferences((prev) => ({ ...prev, [key]: !prev[key] }))
  }

  if (!showBanner) return null

  return (
    <div className="fixed inset-0 flex items-end justify-center p-4 sm:items-center z-50">
      <div className="fixed inset-0 bg-gray-600 bg-opacity-75 transition-opacity" />
      <Card className="relative w-full max-w-lg shadow-lg sm:rounded-xl dark:bg-gray-800">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-semibold leading-6 text-gray-900 dark:text-gray-100">Cookie Preferences</CardTitle>
            <Button
              variant="ghost"
              size="icon"
              className="text-gray-400 hover:text-gray-500 dark:text-gray-300 dark:hover:text-gray-200"
              onClick={() => setShowBanner(false)}
            >
              <X className="h-5 w-5" aria-hidden="true" />
              <span className="sr-only">Close</span>
            </Button>
          </div>
          <CardDescription className="mt-2 text-sm text-gray-500 dark:text-gray-400">
            We use cookies to enhance your browsing experience, serve personalized ads or content, and analyze our traffic. By clicking "Accept All", you consent to our use of cookies.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {Object.entries(preferences).map(([key, value]) => (
              <div key={key} className="flex items-center justify-between">
                <Label htmlFor={key} className="flex flex-col">
                  <span className="font-medium text-gray-700 dark:text-gray-200">{key.charAt(0).toUpperCase() + key.slice(1)}</span>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {key === "necessary"
                      ? "Essential for the website to function properly."
                      : `Used for ${key} purposes.`}
                  </span>
                </Label>
                <Switch
                  id={key}
                  checked={value}
                  onCheckedChange={() => togglePreference(key as keyof typeof preferences)}
                  disabled={key === "necessary"}
                />
              </div>
            ))}
          </div>
        </CardContent>
        <CardFooter className="flex justify-end space-x-2">
          <Button variant="outline" onClick={handleSavePreferences}>
            Save Preferences
          </Button>
          <Button onClick={handleAcceptAll}>Accept All</Button>
        </CardFooter>
      </Card>
    </div>
  )
}