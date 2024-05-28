export interface Category  {
  id: number,
  name: string,
  description: string,
  slug: string,
  parent: Parent | null,
  ancestors: Ancestor[]
}

export interface Ancestor {
  type: string,
  id: number
}
export interface Parent {
  id: number
}
