export interface CustomCategory {
  id: string,
  name: string,
  description: string,
  slug: string,
  parent: Parent | null,
  ancestors: Ancestor[]
}

export interface Ancestor {
  type: string,
  id: string
}
export interface Parent {
  id: string
}
