import { EmailValidatorAdapter } from '../src/utils/email-validator-adapter'
import test from 'japa'

test.group('Email Validation', () => {
  const makeSut = () => new EmailValidatorAdapter()
  test('should returns false when validator returns false', async (assert) => {
    const validator = makeSut()
    const response = await validator.isValid('invalid_mail')
    assert.equal(response, false)
  })
})
