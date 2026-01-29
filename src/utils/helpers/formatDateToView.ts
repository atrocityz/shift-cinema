type FormatVariant = 'longDayMonth' | 'shortWithDay'

export const formatDateToView = (
  date: string,
  variant: FormatVariant = 'shortWithDay',
) => {
  const presets: Record<FormatVariant, Intl.DateTimeFormatOptions> = {
    shortWithDay: { weekday: 'short', day: 'numeric', month: 'short' },
    longDayMonth: { day: 'numeric', month: 'long' },
  }

  const [day, month, year] = date.split('.').map(Number)
  const dateObj = new Date(2000 + year, month - 1, day)

  const formatted = new Intl.DateTimeFormat('ru-RU', presets[variant]).format(
    dateObj,
  )

  return formatted.charAt(0).toUpperCase() + formatted.slice(1)
}
