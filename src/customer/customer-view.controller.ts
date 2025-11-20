import { Controller, Get, Render } from '@nestjs/common';

@Controller()
export class CustomerViewController {
  @Get('customer/create')
  @Render('customer/create-customer')
  createForm() {
    return {
      title: 'Create Customer',
      identificationTypes: ['DNI', 'SSN', 'CPF', 'RUT'],
    };
  }
}
