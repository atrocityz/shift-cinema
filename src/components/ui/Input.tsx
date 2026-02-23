import type { PatternFormatProps } from 'react-number-format'

import * as React from 'react'
import { PatternFormat } from 'react-number-format'

import { cn } from '@/utils/lib'

const Input = ({
  className,
  type,
  ...props
}: React.ComponentProps<'input'>) => {
  return (
    <input
      className={cn(
        'file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input relative h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
        'focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]',
        'aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive',
        className,
      )}
      type={type}
      data-slot="input"
      {...props}
    />
  )
}

interface MaskedPhoneInputProps extends Omit<
  PatternFormatProps,
  'format' | 'onChange'
> {
  onChange?: (value: string) => void
}

const MaskedPhoneInput = ({
  onChange,
  className,
  ...props
}: MaskedPhoneInputProps) => {
  return (
    <PatternFormat
      className={className}
      mask="_"
      allowEmptyFormatting={false}
      customInput={Input}
      format="+7 (###) ###-##-##"
      onValueChange={(values) => {
        onChange?.(values.value)
      }}
      {...props}
    />
  )
}

export { Input, MaskedPhoneInput }
