"use client"

import React, { useState, useRef } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Facebook, Github, Instagram, Linkedin } from 'lucide-react'
import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'

export default function ResumeBuilder() {
  const [personalInfo, setPersonalInfo] = useState({
    firstName: 'Jargina',
    lastName: 'Chohan',
    phone: '0336-2824083',
    email: 'jargina.chohan7@gmail.com',
    objective: 'To secure an employment opportunity with an organisation, where I can utilize my professional skills and knowledge to the maximum and value in the growth of the organisation.',
    education: 'Master MBA in HR from BBSUL\nBachelor\'s in Bio Science, University of Karachi\nIntermediate from SMB Fatima Jinnah College Karachi\nMatriculation from Alpha girls/Boys School Karachi',
    skills: 'Ms Office, HTML, CSS, Typescript, Javascript, Next.js, Tailwind CSS',
    experience: 'Currently I am working in a Govt School.',
    certification: 'Artificial Intelligence, web 3.0 & Metaverse: From Governor House Karachi (ongoing)',
    linkedin: 'https://www.linkedin.com/in/jargina-chohan-5313a71aa?',
    facebook: 'https://www.facebook.com/Jargina.chohan509',
    instagram: 'https://www.instagram.com/jargina.chohan509?igsh=Z2tvNTlhaXhsa2Zi',
    github: 'https://github.com/JarginaChohan'
  })
  const [profilePicture, setProfilePicture] = useState('/placeholder.svg?height=150&width=150')
  const [showSkills, setShowSkills] = useState(true)
  const resumeRef = useRef(null)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setPersonalInfo(prev => ({ ...prev, [name]: value }))
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setProfilePicture(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const generatePDF = () => {
    if (resumeRef.current) {
      html2canvas(resumeRef.current).then((canvas) => {
        const imgData = canvas.toDataURL('image/png')
        const pdf = new jsPDF()
        const imgProps = pdf.getImageProperties(imgData)
        const pdfWidth = pdf.internal.pageSize.getWidth()
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width
        pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight)
        pdf.save('resume.pdf')
      })
    }
  }

  return (
    <div className="container mx-auto p-4 md:p-8">
      <h1 className="text-3xl font-bold text-center mb-6">Interactive Resume Builder</h1>
      <div className="grid md:grid-cols-2 gap-8">
        <Card>
          <CardContent className="p-6">
            <h2 className="text-2xl font-semibold mb-4">Personal Information</h2>
            <div className="space-y-4">
              <div>
                <Label htmlFor="profilePicture">Profile Picture</Label>
                <Input id="profilePicture" type="file" accept="image/*" onChange={handleImageUpload} className="mt-1" />
              </div>
              <div>
                <Label htmlFor="firstName">First Name</Label>
                <Input id="firstName" name="firstName" value={personalInfo.firstName} onChange={handleInputChange} className="mt-1" />
              </div>
              <div>
                <Label htmlFor="lastName">Last Name</Label>
                <Input id="lastName" name="lastName" value={personalInfo.lastName} onChange={handleInputChange} className="mt-1" />
              </div>
              <div>
                <Label htmlFor="phone">Phone Number</Label>
                <Input id="phone" name="phone" value={personalInfo.phone} onChange={handleInputChange} className="mt-1" />
              </div>
              <div>
                <Label htmlFor="email">Email Address</Label>
                <Input id="email" name="email" type="email" value={personalInfo.email} onChange={handleInputChange} className="mt-1" />
              </div>
              <div>
                <Label htmlFor="objective">Career Objective</Label>
                <Textarea id="objective" name="objective" value={personalInfo.objective} onChange={handleInputChange} className="mt-1" />
              </div>
              <div>
                <Label htmlFor="education">Education</Label>
                <Textarea id="education" name="education" value={personalInfo.education} onChange={handleInputChange} className="mt-1" />
              </div>
              <div>
                <Label htmlFor="skills">Skills</Label>
                <Textarea id="skills" name="skills" value={personalInfo.skills} onChange={handleInputChange} className="mt-1" />
              </div>
              <div>
                <Label htmlFor="experience">Work Experience</Label>
                <Textarea id="experience" name="experience" value={personalInfo.experience} onChange={handleInputChange} className="mt-1" />
              </div>
              <div>
                <Label htmlFor="certification">Certification</Label>
                <Textarea id="certification" name="certification" value={personalInfo.certification} onChange={handleInputChange} className="mt-1" />
              </div>
              <div>
                <Label htmlFor="linkedin">LinkedIn URL</Label>
                <Input id="linkedin" name="linkedin" value={personalInfo.linkedin} onChange={handleInputChange} className="mt-1" />
              </div>
              <div>
                <Label htmlFor="facebook">Facebook URL</Label>
                <Input id="facebook" name="facebook" value={personalInfo.facebook} onChange={handleInputChange} className="mt-1" />
              </div>
              <div>
                <Label htmlFor="instagram">Instagram URL</Label>
                <Input id="instagram" name="instagram" value={personalInfo.instagram} onChange={handleInputChange} className="mt-1" />
              </div>
              <div>
                <Label htmlFor="github">GitHub URL</Label>
                <Input id="github" name="github" value={personalInfo.github} onChange={handleInputChange} className="mt-1" />
              </div>
            </div>
          </CardContent>
        </Card>

        <div>
          <Card className="mb-4">
            <CardContent className="p-6">
              <h2 className="text-2xl font-semibold mb-4">Resume Preview</h2>
              <div ref={resumeRef} className="border p-6 rounded-lg shadow-inner bg-white">
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="md:w-1/3 space-y-4">
                    <img src={profilePicture} alt="Profile" className="w-32 h-32 rounded-full mx-auto" />
                    <div>
                      <h3 className="font-semibold">Career Objective</h3>
                      <p className="text-sm">{personalInfo.objective}</p>
                    </div>
                    <div>
                      <h3 className="font-semibold">Certification</h3>
                      <p className="text-sm">{personalInfo.certification}</p>
                    </div>
                    <div>
                      <h3 className="font-semibold">Contact Us</h3>
                      <div className="flex justify-center space-x-2 mt-2">
                        <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer"><Linkedin size={20} /></a>
                        <a href={personalInfo.facebook} target="_blank" rel="noopener noreferrer"><Facebook size={20} /></a>
                        <a href={personalInfo.instagram} target="_blank" rel="noopener noreferrer"><Instagram size={20} /></a>
                        <a href={personalInfo.github} target="_blank" rel="noopener noreferrer"><Github size={20} /></a>
                      </div>
                    </div>
                  </div>
                  <div className="md:w-2/3 space-y-4">
                    <div>
                      <h2 className="text-2xl font-bold">{personalInfo.firstName} {personalInfo.lastName}</h2>
                      <p>{personalInfo.phone} | {personalInfo.email}</p>
                    </div>
                    <div>
                      <h3 className="font-semibold">Education</h3>
                      <p className="text-sm whitespace-pre-line">{personalInfo.education}</p>
                    </div>
                    {showSkills && (
                      <div>
                        <h3 className="font-semibold">Skills</h3>
                        <p className="text-sm">{personalInfo.skills}</p>
                      </div>
                    )}
                    <div>
                      <h3 className="font-semibold">Work Experience</h3>
                      <p className="text-sm">{personalInfo.experience}</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          <div className="flex justify-between">
            <Button onClick={() => setShowSkills(!showSkills)}>
              {showSkills ? 'Hide Skills' : 'Show Skills'}
            </Button>
            <Button onClick={generatePDF}>Download CV</Button>
          </div>
        </div>
      </div>
    </div>
  )
}