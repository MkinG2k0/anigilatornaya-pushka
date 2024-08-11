import * as React from 'react'

import { cn } from 'shared'

import { type VariantProps, cva } from 'class-variance-authority'
import { Slot } from '@radix-ui/react-slot'

const buttonVariants = cva(
	'inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
	{
		defaultVariants: {
			size: 'default',
			variant: 'default',
		},
		variants: {
			size: {
				default: 'h-10 px-4 py-2',
				icon: 'h-10 w-10',
				lg: 'h-11 rounded-md px-8',
				sm: 'h-9 rounded-md px-3',
			},
			variant: {
				default: 'bg-primary text-primary-foreground hover:background-primary/90 rounded-full ',
				destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
				ghost: '',
				link: 'text-primary underline-offset-4 hover:underline',
				outline: 'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
				icon: 'bg-white hover:bg-accent hover:text-accent-foreground w-10 h-10 p-3 rounded-full',
				secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80 rounded-full',
				danger: 'bg-red-700 text-red-100 hover:bg-red-500',
				wow: 'bg-primary text-primary-foreground hover:background-primary/90 rounded-full text-lg font-bold',
			},
		},
	},
)

export interface ButtonProps
	extends React.ButtonHTMLAttributes<HTMLButtonElement>,
		VariantProps<typeof buttonVariants> {
	asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
	({asChild = false, className, size, variant, ...props}, ref) => {
		const Comp = asChild ? Slot : 'button'
		return <Comp className={cn(buttonVariants({className, size, variant}))} ref={ref} {...props} />
	},
)

Button.displayName = 'Button'

export { Button, buttonVariants }
