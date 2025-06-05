import { CardContent } from './Content'
import { CardHeader } from './Header'
import { CardRoot } from './Root'
import { CardComposition, CardProps } from './types'

export const Card = Object.assign(CardRoot, {
  Root: CardRoot,
  Header: CardHeader,
  Content: CardContent
}) as React.FC<CardProps> & CardComposition

export type * from './types'
