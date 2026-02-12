import { Controller, Get, Render, Param, ParseIntPipe } from '@nestjs/common';
import { CustomerService } from './customer.service';

@Controller()
export class CustomerViewController {
  constructor(private readonly customerService: CustomerService) {}

  @Get('customer')
  @Render('customer/list-customers')
  async listCustomers() {
    const customers = await this.customerService.findAll();
    return {
      title: 'Customer List',
      customers,
    };
  }

  @Get('customer/create')
  @Render('customer/create-customer')
  createForm() {
    return {
      title: 'Create Customer',
      identificationTypes: ['DNI', 'SSN', 'CPF', 'RUT'],
    };
  }

  @Get('customer/:id/edit')
  @Render('customer/edit-customer')
  async editForm(@Param('id', ParseIntPipe) id: number) {
    const customer = await this.customerService.findOne(id);
    return {
      title: 'Edit Customer',
      customer,
      identificationTypes: ['DNI', 'SSN', 'CPF', 'RUT'],
    };
  }
}
