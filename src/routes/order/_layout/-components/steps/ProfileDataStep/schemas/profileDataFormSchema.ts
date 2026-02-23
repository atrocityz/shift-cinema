import { z } from 'zod'

export const profileDataFormSchema = z.object({
  firstName: z
    .string({ error: `Имя обязательно` })
    .trim()
    .min(2, { error: `Имя должно быть не короче 2 символов` })
    .max(50, { error: `Имя слишком длинное` })
    .regex(/^[\p{L}\s-]+$/u, {
      error: `Имя может содержать только буквы и дефис`,
    }),
  lastName: z
    .string({ error: `Фамилия обязательна` })
    .trim()
    .min(2, { error: `Фамилия должно быть не короче 2 символов` })
    .max(50, { error: `Фамилия слишком длинная` })
    .regex(/^[\p{L}\s-]+$/u, {
      error: `Фамилия может содержать только буквы и дефис`,
    }),

  middleName: z
    .string({ error: `Отчество обязательно` })
    .trim()
    .min(2, { error: `Отчество должно быть не короче 2 символов` })
    .max(50, { error: `Отчество слишком длинное` })
    .regex(/^[\p{L}\s-]+$/u, {
      error: `Отчество может содержать только буквы и дефис`,
    }),
  phoneNumber: z
    .string({ error: 'Введите номер телефона' })
    .trim()
    .min(1, { error: 'Поле обязательно для заполнения' })
    .length(10, { error: 'Номер введен не полностью' }),
})

export type ProfileFormData = z.infer<typeof profileDataFormSchema>
