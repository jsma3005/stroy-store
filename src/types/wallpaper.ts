export namespace WallpaperTypes {
  export interface Brand {
    id: number
    title: string
    image: string
    collections: Collection[]
  }

  export interface Collection {
    id: number
    title: string
    image: string
    brand: Brand
  }

  export interface Raw {
    id: number
    article: number
    collection: Collection
    title: string
    description: string
    size: string
    price: string
    images: {
      id: number
      image: string
    }[]
  }
}
