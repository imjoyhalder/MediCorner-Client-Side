'use client'

import dynamic from 'next/dynamic'
import { Pill } from 'lucide-react'
import React, { SVGProps } from 'react'

// Dynamic import of icons
const iconComponents = {
    Pill: dynamic(() => import('lucide-react').then(mod => mod.Pill)),
    Thermometer: dynamic(() => import('lucide-react').then(mod => mod.Thermometer)),
    Stethoscope: dynamic(() => import('lucide-react').then(mod => mod.Stethoscope)),
    Heart: dynamic(() => import('lucide-react').then(mod => mod.Heart)),
    Eye: dynamic(() => import('lucide-react').then(mod => mod.Eye)),
    Smile: dynamic(() => import('lucide-react').then(mod => mod.Smile)),
    Shield: dynamic(() => import('lucide-react').then(mod => mod.Shield)),
    Dumbbell: dynamic(() => import('lucide-react').then(mod => mod.Dumbbell)),
    Droplet: dynamic(() => import('lucide-react').then(mod => mod.Droplet)),
    Bandage: dynamic(() => import('lucide-react').then(mod => mod.Bandage)),
    Syringe: dynamic(() => import('lucide-react').then(mod => mod.Syringe)),
    TestTube: dynamic(() => import('lucide-react').then(mod => mod.TestTube)),
    Brain: dynamic(() => import('lucide-react').then(mod => mod.Brain)),
    Baby: dynamic(() => import('lucide-react').then(mod => mod.Baby)),
    Apple: dynamic(() => import('lucide-react').then(mod => mod.Apple)),
    Activity: dynamic(() => import('lucide-react').then(mod => mod.Activity)),
    HeartPulse: dynamic(() => import('lucide-react').then(mod => mod.HeartPulse)),
    Sparkles: dynamic(() => import('lucide-react').then(mod => mod.Sparkles)),
}

// Dynamic Icon Component
export const DynamicIcon = ({
    iconName,
    color,
}: {
    iconName: string
    color: string
}) => {
    // TypeScript er jonno explicit cast lagbe
    const IconComponent = (iconComponents[iconName as keyof typeof iconComponents] ||
        Pill) as unknown as React.ComponentType<SVGProps<SVGSVGElement>>

    // return <IconComponent className={ `h-6 w-6 ${color}` } />
}

// Example utility functions for colors & backgrounds
export const getIconColor = (categoryName: string): string => {
    const name = categoryName.toLowerCase()
    const colors = [
        'text-green-500',
        'text-sky-500',
        'text-rose-500',
        'text-amber-500',
        'text-emerald-500',
        'text-indigo-500',
        'text-purple-500',
        'text-pink-500',
    ]
    let hash = 0
    for (let i = 0; i < name.length; i++)
        hash = name.charCodeAt(i) + ((hash << 5) - hash)
    return colors[Math.abs(hash) % colors.length]
}

export const getBackgroundColor = (categoryName: string): string => {
    const name = categoryName.toLowerCase()
    const backgrounds = [
        'bg-green-50 border-green-100',
        'bg-sky-50 border-sky-100',
        'bg-rose-50 border-rose-100',
        'bg-amber-50 border-amber-100',
        'bg-emerald-50 border-emerald-100',
        'bg-indigo-50 border-indigo-100',
        'bg-purple-50 border-purple-100',
        'bg-pink-50 border-pink-100',
    ]
    let hash = 0
    for (let i = 0; i < name.length; i++)
        hash = name.charCodeAt(i) + ((hash << 5) - hash)
    return backgrounds[Math.abs(hash) % backgrounds.length]
}
