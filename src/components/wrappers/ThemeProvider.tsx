"use client"

import {useEffect,useState} from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import { ThemeProviderProps } from "next-themes/dist/types"


export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
    const [mounted, setMounted] = useState<boolean>(false)
    
    useEffect(()=>{
        setMounted(true)
    },[])

    if(!mounted) {
        return null
    }

  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}