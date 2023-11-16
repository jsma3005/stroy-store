export namespace WallpaperTypes {
  export interface Brand {
    id: number
    title: string
    image: string
    collections: Collection[]
  }

  export interface Collection {
    id: number
    brand: number
    title: string
    image: string
    wallpapers: Raw[]
  }

  export interface Raw {
    id: number
    article: number
    collection: Collection
    title: string
    price: string
    description: string
    size: string
    images: {
      id: number
      image: string
    }[]
  }
}
