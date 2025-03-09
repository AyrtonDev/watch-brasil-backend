export interface JWT {
  generate: (value: any) => string
  isValid: (toke: string) => boolean
  refresh: (token: string) => string | null
}