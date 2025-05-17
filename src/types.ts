import { SanityDocument } from "next-sanity"

export interface Product extends SanityDocument {
  name: string
  description: string
  price: number
  color: 'black' | 'white' | 'red' | 'blue' | 'green'
}