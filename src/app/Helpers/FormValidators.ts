import { AbstractControl, AsyncValidatorFn, ValidationErrors } from "@angular/forms";

export class FormValidators{
    static EqualsTo(otherField: string): AsyncValidatorFn{
        return (control: AbstractControl): Promise<ValidationErrors | null> => {
            return new Promise((resolve) => {
                const field = control.root.get(otherField);

                if(!field || control.value !== field.value){
                    resolve({ EqualsTo: otherField})
                } else {
                    resolve(null);
                }
            })
        }
    }
}