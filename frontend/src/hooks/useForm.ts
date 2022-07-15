import { ChangeEvent, useCallback, useEffect, useRef, useState } from 'react';

export default function useForm<T>(
  initialFormValues: { [U in keyof T]: T[U] },
  validators: { [U in keyof T]: (inputVal: T[U]) => string | undefined }
) {

  /*
    DESCRIPTION:
    A hook that abstracts away form value states and effects, and exposes
    them for use by components.

    PARAMETERS:
    * initialFormValues: An object.
      | Note that each key in this object must correspond exactly to the name attribute of its input element.
    * validators: An object. Each key correspond to the name of the input element that the validator is used to validate.
      | Each key's corresponding value is a validator function that takes in the input value and validates it.
      | The validator must return a string (describing the reason for validation failure), or undefined if validation passes.

    RETURNS:
    * formValues: A reactive object; The reactive form values with a shape identical to initialFormValues.
      | This is for use in the value attribute of their corresponding input elements.
      | Note that the name attribute of the input element must correspond exactly to
      | the key of its corresponding formValue property.
    * formErrors: A reactive object; The form errors, whose keys correspond to those in formValues, and whose values are strings.
      | The values are messages describing the reason why the validation failed for that input.
    * setFormErrors: A state setter; Used to manually set form errors if necessary.
    * validate: A function; Used to validate formValues.
      | Before the first validate() call, validate is not called automatically. 
      | After the first manual call, it will subsequently be called everytime formValues changes.
      | Returns true if all values are valid. Returns false otherwise.
    * formInputChangeHandler: A function; Used for the onChange attribute on all input elements managed by formValues.
    * validatedAtLeastOnce: A boolean; Used for cases where you wish to change behaviors after the first validation.
  */

  type FormErrors = Partial<{ [U in keyof T]: string }>;

  const [formValues, setFormValues] = useState(initialFormValues);
  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const validatedAtLeastOnce = useRef(false);

  function formInputChangeHandler(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
    if (validatedAtLeastOnce.current) validate();
  }

  const validate = useCallback(() => {
    validatedAtLeastOnce.current = true;
    const errors: FormErrors = {};
    for (const key of Object.keys(validators)) {
      errors[key as keyof T] = validators[key as keyof T](formValues[key as keyof T]);
    }
    setFormErrors(errors);
    return (Object.values(errors).every(errorValue => errorValue === undefined));
  }, [formValues, validators]);

  useEffect(() => {
    if (validatedAtLeastOnce.current) validate();
  }, [formValues, validate]);

  return {
    formValues,
    formErrors,
    setFormErrors,
    validate,
    formInputChangeHandler,
    validatedAtLeastOnce: validatedAtLeastOnce.current
  };
}