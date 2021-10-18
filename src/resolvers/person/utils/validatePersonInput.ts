import { FieldError } from "src/resolvers/shared/Responses/FieldErrorResponse";
import { PersonInput } from "../Inputs/PersonInput";
import validator from "validator";
import { personValidation } from "../personValidation";

export const validatePersonInput = (input: PersonInput): FieldError[] => {
  const errors: FieldError[] = [];

  if (input.email && !validator.isEmail(input.email)) {
    errors.push({
      field: "email",
      message: "Email is not a valid email address.",
    });
  }

  // TODO:ENHANCEMENT: Lots of shared code here, could build a validation helper.
  if (
    input.firstName &&
    !validator.isLength(input.firstName, {
      min: personValidation.firstName.length.min,
      max: personValidation.firstName.length.max,
    })
  ) {
    errors.push({
      field: "firstName",
      message: `First name must be between ${personValidation.firstName.length.min} and ${personValidation.firstName.length.max} characters.`,
    });
  }

  if (
    input.lastName &&
    !validator.isLength(input.lastName, {
      min: personValidation.lastName.length.min,
      max: personValidation.lastName.length.max,
    })
  ) {
    errors.push({
      field: "lastName",
      message: `Last name must be between ${personValidation.lastName.length.min} and ${personValidation.lastName.length.max} characters.`,
    });
  }

  return errors;
};
