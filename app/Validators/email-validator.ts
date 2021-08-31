import { validator, schema, rules } from '@ioc:Adonis/Core/Validator'

export const validateMail = async (email: string) => {
  await validator.validate({
    schema: schema.create({
      email: schema.string({ trim: true }, [rules.email()]),
    }),
    data: {
      email: email,
    },
  })
}
