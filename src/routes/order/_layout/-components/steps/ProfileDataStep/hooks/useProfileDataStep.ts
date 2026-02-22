import { useForm } from '@tanstack/react-form'

import { useOrder } from '@/routes/order/_layout/-contexts/order'

import { profileDataFormSchema } from '../schemas'

export const useProfileDataStep = () => {
  const orderContext = useOrder()
  const profileForm = useForm({
    defaultValues: {
      firstName: '',
      lastName: '',
      middleName: '',
      phoneNumber: '',
    },
    validators: {
      onChange: profileDataFormSchema,
      onBlur: profileDataFormSchema,
      onSubmit: profileDataFormSchema,
    },

    onSubmit: (values) => {
      orderContext.setPerson({
        firstname: values.value.firstName,
        lastname: values.value.lastName,
        middlename: values.value.middleName,
        phone: values.value.phoneNumber,
      })
      orderContext.setStep('payment')
    },
  })

  const onBackClick = () => orderContext.setStep('choose-place')

  return {
    forms: { profileForm },
    functions: { onBackClick },
  }
}
