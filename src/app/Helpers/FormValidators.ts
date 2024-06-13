import { AbstractControl, ValidatorFn } from '@angular/forms';

export class FormValidators {
  static EqualsTo(controlName: string, matchingControlName: string): ValidatorFn {
    return (formGroup: AbstractControl): { [key: string]: boolean } | null => {
      const control = formGroup.get(controlName);
      const matchingControl = formGroup.get(matchingControlName);

      if (!control || !matchingControl) {
        return null;
      }

      if (matchingControl.errors && !matchingControl.errors['EqualsTo']) {
        return null;
      }

      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ EqualsTo: true });
        return { EqualsTo: true };
      } else {
        matchingControl.setErrors(null);
        return null;
      }
    };
  }
}
