
import React from 'react';

export interface InvoiceDetails {
  invoiceNumber: string;
  dateMonth: string;
  dateDay: string;
  
  fromName: string;
  fromRole: string;

  clientName: string;
  clientRole: string;
  clientBrand: string;

  description: string;
  
  units: string;
  unitPrice: string;
  transport: string;

  paymentInfo: string;

  residence: string;
  phone: string;
  email: string;
}

export interface StreamingService {
  id: string;
  name: string;
  price: number;
  icon: React.ReactNode;
}

export interface InvoiceItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  icon: React.ReactNode;
}
