import {
  Button,
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
  Input,
  MaskedPhoneInput,
} from '@/components/ui'

import { StepInfo } from '../../StepInfo'
import { useProfileDataStep } from './hooks'

export const ProfileDataStep = () => {
  const { functions, forms } = useProfileDataStep()

  return (
    <div className="flex max-w-92 flex-1 flex-col gap-6">
      <StepInfo
        step={2}
        title="Введите ваши данные"
        onBackClick={functions.onBackClick}
      />
      <form
        className="flex flex-1 flex-col justify-between gap-6 md:justify-start"
        onSubmit={(event) => {
          event.preventDefault()
          forms.profileForm.handleSubmit()
        }}
      >
        <FieldGroup className="gap-6">
          <forms.profileForm.Field name="firstName">
            {(field) => {
              const isInvalid =
                (field.state.meta.isTouched || field.state.meta.isBlurred) &&
                !field.state.meta.isValid

              return (
                <Field className="gap-1.5">
                  <FieldLabel htmlFor={field.name}>Имя</FieldLabel>
                  <Input
                    aria-invalid={isInvalid}
                    id={field.name}
                    name={field.name}
                    type="text"
                    value={field.state.value}
                    autoComplete="off"
                    onBlur={field.handleBlur}
                    onChange={(event) => field.handleChange(event.target.value)}
                    placeholder="Сергей"
                  />
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              )
            }}
          </forms.profileForm.Field>
          <forms.profileForm.Field name="lastName">
            {(field) => {
              const isInvalid =
                (field.state.meta.isTouched || field.state.meta.isBlurred) &&
                !field.state.meta.isValid

              return (
                <Field className="gap-1.5">
                  <FieldLabel htmlFor={field.name}>Фамилия</FieldLabel>
                  <Input
                    aria-invalid={isInvalid}
                    id={field.name}
                    name={field.name}
                    type="text"
                    value={field.state.value}
                    autoComplete="off"
                    onBlur={field.handleBlur}
                    onChange={(event) => field.handleChange(event.target.value)}
                    placeholder="Сергеев"
                  />
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              )
            }}
          </forms.profileForm.Field>
          <forms.profileForm.Field name="middleName">
            {(field) => {
              const isInvalid =
                (field.state.meta.isTouched || field.state.meta.isBlurred) &&
                !field.state.meta.isValid

              return (
                <Field className="gap-1.5">
                  <FieldLabel htmlFor={field.name}>Отчество</FieldLabel>
                  <Input
                    aria-invalid={isInvalid}
                    id={field.name}
                    name={field.name}
                    type="text"
                    value={field.state.value}
                    autoComplete="off"
                    onBlur={field.handleBlur}
                    onChange={(event) => field.handleChange(event.target.value)}
                    placeholder="Сергеевич"
                  />
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              )
            }}
          </forms.profileForm.Field>
          <forms.profileForm.Field name="phoneNumber">
            {(field) => {
              const isInvalid =
                (field.state.meta.isTouched || field.state.meta.isBlurred) &&
                !field.state.meta.isValid

              return (
                <Field className="gap-1.5">
                  <FieldLabel htmlFor={field.name}>Телефон</FieldLabel>
                  <MaskedPhoneInput
                    aria-invalid={isInvalid}
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(val) => field.handleChange(val)}
                    placeholder="+7 (123) 123-12-31"
                  />
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              )
            }}
          </forms.profileForm.Field>
        </FieldGroup>
        <div className="flex items-center gap-6 py-4">
          <Button
            className="hidden md:inline-flex"
            variant="outline"
            onClick={functions.onBackClick}
          >
            Назад
          </Button>
          <Button className="mt-auto w-full md:max-w-43" type="submit">
            Продолжить
          </Button>
        </div>
      </form>
    </div>
  )
}
