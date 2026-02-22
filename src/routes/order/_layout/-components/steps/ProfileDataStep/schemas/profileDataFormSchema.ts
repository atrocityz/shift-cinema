import { z } from 'zod'

export const profileDataFormSchema = z.object({
  firstName: z
    .string({ error: 'Имя должно быть строкой' })
    .min(2, { message: 'Имя обязательно' }),
  lastName: z
    .string({ error: 'Фамилия должна быть строкой' })
    .min(2, { message: 'Фамилия обязательна' }),
  middleName: z
    .string({ error: 'Отчество должно быть строкой' })
    .min(2, { message: 'Отчество обязательно' }),
  phoneNumber: z
    .string({ error: 'Номер телефона должен быть строкой' })
    .regex(/^7\d{10}$/, {
      message: 'Введите номер в формате +7 999-999-99-99',
    }),
})

export type ProfileFormData = z.infer<typeof profileDataFormSchema>
