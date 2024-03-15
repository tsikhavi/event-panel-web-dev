import * as ClassValidator from 'class-validator';

import { TestDto, testForm } from './__test-data__';
import { Form } from './Form';

describe('Form', () => {
  let form: Form<TestDto>;

  beforeEach(() => {
    form = new Form({ initForm: testForm, Resolver: TestDto });
  });

  it('should return init form', () => {
    expect(form.getForm()).toEqual(testForm);
  });

  it('should return value of form', () => {
    expect(form.getValue('firstName')).toEqual(testForm['firstName']);
  });

  it('should update form', () => {
    const firstName = 'Morty';
    form.setValue('firstName', firstName);

    expect(form.getForm()).toEqual({ ...testForm, firstName });
  });

  it('should return empty error object', () => {
    expect(form.hasError()).toBeFalsy();
    expect(form.getErrors()).toEqual({});
  });

  describe('validate', () => {
    it('should return an error', () => {
      form.setValue('firstName', 'F');

      expect(form.getError('firstName')).not.toBeNull();
    });

    it('should return undefined when constraints is undefined', () => {
      jest.mock('class-validator');
      jest.spyOn(ClassValidator, 'validateSync').mockReturnValue([{ property: 'firstName', constraints: undefined }]);

      form.validate();

      expect(form.getError('firstName')).toBeUndefined();
    });
  });
});
